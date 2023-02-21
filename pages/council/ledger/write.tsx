import Head from 'next/head'
import styles from '@/styles/council/Council.module.css'
import SideBar from '@/components/SideBar'
import Header from '@/components/Header'
import { MinusIcon, PencilSquareIcon, PlusIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getSession, useSession } from 'next-auth/react'
import dayjs from 'dayjs'

type Props = {
    ledger: {
        departmentId: string
        departmentName: string
        ledgers: {
            department: string
            txDate: Date
            eventName: string
            txCategory: string
            receiptNum: string
            bankbook: string
            amount: number
            paymentMethod: string
            receiptDetails: string
            note: number
            state: string
            datetime: Date
        }
    }
}

type Receipt = {
    orderNum: number
    receiptCategory: string
    item: string
    quantity: number
    price: number
}

export default function Council(props: Props) {
    const { data: session, status } = useSession()
    const router = useRouter()

    const paymentMethods = ['카드결제', '계좌이체', '현금결제']

    const [txCategory, setTxCategory] = useState(
        (router.query.idx && props.ledger.ledgers.txCategory) || '수입'
    )
    const [amount, setAmount] = useState(0)
    const [paymentMethod, setPaymentMethod] = useState(
        (router.query.idx && props.ledger.ledgers.paymentMethod) || '카드결제'
    )
    const [receiptDetails, setReceiptDetails] = useState<Receipt[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        try {
            const json_obj = JSON.parse(props.ledger.ledgers.receiptDetails)
            var arr = []

            for (var i in json_obj) arr.push(json_obj[i])

            setReceiptDetails(arr)
        } catch {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function addField() {
        setReceiptDetails([
            ...receiptDetails,
            {
                orderNum: receiptDetails.length + 1,
                receiptCategory: '일반',
                item: '',
                quantity: 0,
                price: 0,
            },
        ])
    }

    function removeField(i: number) {
        setReceiptDetails(receiptDetails.filter((r, _i) => _i !== i))
    }

    async function handleSubmit(e: any) {
        e.preventDefault()

        const regReceipt = /\d{2}-\d{2}-\d{2}/g

        if (e.target.receiptNum.value && !regReceipt.test(e.target.receiptNum.value)) {
            e.target.receiptNum.focus()
            return alert('영수증번호가 잘못되었습니다.')
        }

        var ledger: any = {
            idx: router.query.idx,
            department: props.ledger.departmentId,
            txDate: e.target.txDate.value,
            eventName: e.target.eventName.value,
            txCategory: e.target.txCategory.value,
            receiptNum: e.target.receiptNum.value,
            bankbook: e.target.bankbook.value,
            amount: parseInt(e.target.amount.value.replaceAll(',', '')) || 0,
            note: e.target.note.value,
            writer: session?.user.username,
        }

        if (e.target.txCategory.value == '지출') {
            if (receiptDetails.length < 1) {
                return alert('지출내역을 입력하지 않았습니다.')
            }
            ledger = {
                ...ledger,
                paymentMethod: e.target.paymentMethod.value,
                receiptDetails: JSON.stringify(
                    receiptDetails.map(r => ({
                        ...r,
                        total: r.quantity * r.price,
                    }))
                ),
            }
        }

        try {
            setIsLoading(true)

            const response = await fetch('/api/council/ledger/upsertLedger', {
                method: 'POST',
                body: JSON.stringify(ledger),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!')
            }
        } catch (e) {
            setIsLoading(false)
            return alert(e)
        }

        router.push(`/council/ledger?id=${props.ledger.departmentId}`)
    }

    useEffect(() => {
        if (txCategory !== '지출') return

        var amount = 0

        receiptDetails.map(r => {
            if (r.receiptCategory == '할인') amount -= r.price * r.quantity
            else amount += r.price * r.quantity
        })

        setAmount(amount)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receiptDetails])

    return (
        <>
            <Head>
                <title>
                    {`${props.ledger.departmentName} 전자장부 ${
                        router.query.idx ? '수정' : '작성'
                    } - K-you Life`}
                </title>
                <meta
                    name="description"
                    content={`${props.ledger.departmentName} 전자장부 ${
                        router.query.idx ? '수정' : '작성'
                    } - K-you Life`}
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <SideBar />
            <main className={styles.main}>
                <Header />
                <div className={styles.container}>
                    <div className={styles.ledger_header}>
                        <div className={styles.ledger_title}>
                            <h3>{props.ledger.departmentName}</h3>
                            <div className={styles.button_wrapper}>
                                <button type="button" className={`primary`}>
                                    전자장부
                                </button>
                                <button
                                    type="button"
                                    className={`grey`}
                                    onClick={() =>
                                        router.push('/council/docs?id=' + props.ledger.departmentId)
                                    }
                                >
                                    발신문서
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.council_container}>
                        <div className={`box ${styles.write_content}`}>
                            <h3>{`전자장부 ${router.query.idx ? '수정' : '작성'}`}</h3>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.input_fields}>
                                    <div className="input-line">
                                        <input
                                            type="date"
                                            name="txDate"
                                            id="txDate"
                                            defaultValue={
                                                router.query.idx &&
                                                dayjs(props.ledger.ledgers.txDate).format(
                                                    'YYYY-MM-DD'
                                                )
                                            }
                                            placeholder=" "
                                            required
                                            max={dayjs(new Date()).format('YYYY-MM-DD')}
                                        />
                                        <label>거래일자</label>
                                    </div>
                                    <div className="input-line">
                                        <input
                                            type="text"
                                            name="eventName"
                                            id="eventName"
                                            defaultValue={
                                                router.query.idx && props.ledger.ledgers.eventName
                                            }
                                            placeholder=" "
                                            required
                                        />
                                        <label>행사명</label>
                                    </div>
                                    <div className="input-line">
                                        <select
                                            name="txCategory"
                                            id="txCategory"
                                            value={txCategory}
                                            onChange={e => setTxCategory(e.target.value)}
                                            required
                                        >
                                            <option value="수입">수입</option>
                                            <option value="지출">지출</option>
                                        </select>
                                        <label>거래분류</label>
                                    </div>
                                    <div className="input-line">
                                        <input
                                            type="text"
                                            name="receiptNum"
                                            id="receiptNum"
                                            defaultValue={
                                                router.query.idx && props.ledger.ledgers.receiptNum
                                            }
                                            placeholder=" "
                                            required={txCategory == '지출'}
                                        />
                                        <label>영수증번호</label>
                                    </div>
                                    <div className="input-line">
                                        <input
                                            type="text"
                                            name="bankbook"
                                            id="bankbook"
                                            defaultValue={
                                                router.query.idx && props.ledger.ledgers.bankbook
                                            }
                                            placeholder=" "
                                            required
                                        />
                                        <label>통장내역</label>
                                    </div>
                                    <div className="input-line">
                                        <input
                                            type="text"
                                            name="amount"
                                            id="amount"
                                            value={amount.toLocaleString()}
                                            onChange={e =>
                                                setAmount(
                                                    parseInt(e.target.value.replaceAll(',', '')) ||
                                                        0
                                                )
                                            }
                                            placeholder=" "
                                            required
                                            readOnly={txCategory == '지출'}
                                            min={0}
                                        />
                                        <label>거래금액</label>
                                    </div>
                                </div>
                                {txCategory == '지출' && (
                                    <>
                                        <div className={styles.dynamic_fields}>
                                            <div className={styles.check_wrapper}>
                                                {paymentMethods.map((p, i) => (
                                                    <div key={i} className="check-wrap">
                                                        <input
                                                            type="radio"
                                                            name="paymentMethod"
                                                            id={`paymentMethod_${i}`}
                                                            value={p}
                                                            checked={paymentMethod == p}
                                                            onChange={() => setPaymentMethod(p)}
                                                        />
                                                        <label htmlFor={`paymentMethod_${i}`}>
                                                            {p}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={styles.dynamic_fields}>
                                            {receiptDetails.map((r, i) => (
                                                <div key={i} className={styles.receipt_container}>
                                                    <div
                                                        className={`box ${styles.receipt_wrapper}`}
                                                    >
                                                        <div className="input-line">
                                                            <select
                                                                name={`receiptCategory${i}`}
                                                                id={`receiptCategory${i}`}
                                                                value={r.receiptCategory}
                                                                onChange={e =>
                                                                    setReceiptDetails(
                                                                        receiptDetails.map(
                                                                            (_r, _i) =>
                                                                                _i === i
                                                                                    ? {
                                                                                          ..._r,
                                                                                          receiptCategory:
                                                                                              e
                                                                                                  .target
                                                                                                  .value,
                                                                                      }
                                                                                    : _r
                                                                        )
                                                                    )
                                                                }
                                                                required
                                                            >
                                                                <option value="일반">일반</option>
                                                                <option value="할인">할인</option>
                                                                <option value="수수료">
                                                                    수수료
                                                                </option>
                                                            </select>
                                                            <label>영수종류</label>
                                                        </div>
                                                        <div className="input-line">
                                                            <input
                                                                type="text"
                                                                name={`item${i}`}
                                                                id={`item${i}`}
                                                                value={r.item}
                                                                onChange={e =>
                                                                    setReceiptDetails(
                                                                        receiptDetails.map(
                                                                            (_r, _i) =>
                                                                                _i === i
                                                                                    ? {
                                                                                          ..._r,
                                                                                          item: e
                                                                                              .target
                                                                                              .value,
                                                                                      }
                                                                                    : _r
                                                                        )
                                                                    )
                                                                }
                                                                placeholder=" "
                                                                required
                                                            />
                                                            <label>품목</label>
                                                        </div>
                                                        <div className="input-line">
                                                            <input
                                                                type="text"
                                                                name={`quantity${i}`}
                                                                id={`quantity${i}`}
                                                                value={r.quantity.toLocaleString()}
                                                                onChange={e =>
                                                                    setReceiptDetails(
                                                                        receiptDetails.map(
                                                                            (_r, _i) =>
                                                                                _i === i
                                                                                    ? {
                                                                                          ..._r,
                                                                                          quantity:
                                                                                              parseInt(
                                                                                                  e.target.value.replaceAll(
                                                                                                      ',',
                                                                                                      ''
                                                                                                  )
                                                                                              ) ||
                                                                                              0,
                                                                                      }
                                                                                    : _r
                                                                        )
                                                                    )
                                                                }
                                                                placeholder=" "
                                                                required
                                                                min={0}
                                                            />
                                                            <label>수량</label>
                                                        </div>
                                                        <div className="input-line">
                                                            <input
                                                                type="text"
                                                                name={`price${i}`}
                                                                id={`price${i}`}
                                                                value={r.price.toLocaleString()}
                                                                onChange={e =>
                                                                    setReceiptDetails(
                                                                        receiptDetails.map(
                                                                            (_r, _i) =>
                                                                                _i === i
                                                                                    ? {
                                                                                          ..._r,
                                                                                          price:
                                                                                              parseInt(
                                                                                                  e.target.value.replaceAll(
                                                                                                      ',',
                                                                                                      ''
                                                                                                  )
                                                                                              ) ||
                                                                                              0,
                                                                                      }
                                                                                    : _r
                                                                        )
                                                                    )
                                                                }
                                                                placeholder=" "
                                                                required
                                                                min={0}
                                                            />
                                                            <label>단가</label>
                                                        </div>
                                                        <div className="input-line">
                                                            <input
                                                                type="text"
                                                                name={`total${i}`}
                                                                id={`total${i}`}
                                                                value={(
                                                                    r.price * r.quantity
                                                                ).toLocaleString()}
                                                                placeholder=" "
                                                                readOnly
                                                                required
                                                                min={0}
                                                            />
                                                            <label>총액</label>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className={`red ${styles.remove_button}`}
                                                        onClick={() => removeField(i)}
                                                    >
                                                        <MinusIcon />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                className={`primary ${styles.add_button}`}
                                                onClick={() => addField()}
                                            >
                                                <PlusIcon />
                                            </button>
                                        </div>
                                    </>
                                )}
                                <div className={`box ${styles.textarea_wrapper}`}>
                                    <label htmlFor="note">특이사항</label>
                                    <textarea
                                        name="note"
                                        id="note"
                                        defaultValue={router.query.idx && props.ledger.ledgers.note}
                                    />
                                </div>
                                <div className={styles.button_wrapper}>
                                    <button
                                        type="button"
                                        className="grey"
                                        onClick={() =>
                                            router.push(
                                                `/council/ledger?id=${props.ledger.departmentId}`
                                            )
                                        }
                                        disabled={isLoading}
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="submit"
                                        className="primary left-icon"
                                        disabled={isLoading}
                                    >
                                        <PencilSquareIcon />
                                        {isLoading ? '작성중' : '작성완료'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context)
    const query = context.query

    if (!session)
        return {
            redirect: {
                permanent: false,
                destination: `/user/login`,
            },
            props: {},
        }
    else if (session.user.asDep !== query.ledgerId)
        return {
            redirect: {
                permanent: false,
                destination: `/council/ledger?id=${query.ledgerId}`,
            },
            props: {},
        }

    const response = await fetch(process.env.NEXT_URL + '/api/council/ledger/getLedger', {
        method: 'POST',
        body: JSON.stringify({
            idx: query.idx,
            departmentId: query.ledgerId,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const result = await response.json()

    if (
        (query.idx &&
            (!result.message.ledgers ||
                session.user.username !== result.message.ledgers.writer ||
                (result.message.ledgers.state !== '수정전' &&
                    session.user.asCat !== result.message.category))) ||
        result.error
    ) {
        return {
            redirect: {
                permanent: false,
                destination: `/council/ledger?id=${query.ledgerId}`,
            },
            props: {},
        }
    }

    return {
        props: { ledger: result.message },
    }
}
