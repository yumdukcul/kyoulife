import Head from 'next/head'
import styles from '@/styles/council/Council.module.css'
import SideBar from '@/components/SideBar'
import Header from '@/components/Header'
import { MagnifyingGlassIcon, PencilSquareIcon, PrinterIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import LedgerCard from '@/components/council/LedgerCard'
import { useSession } from 'next-auth/react'
import dayjs from 'dayjs'
import { Fragment } from 'react'

type Props = {
    ledger: {
        departmentId: string
        departmentName: string
        category: string
        ledgers: []
    }
}

export default function Council(props: Props) {
    const { data: session, status } = useSession()
    const router = useRouter()

    return (
        <>
            <Head>
                <title>{`${props.ledger.departmentName} 전자장부 - K-you Life`}</title>
                <meta
                    name="description"
                    content={`${props.ledger.departmentName} 전자장부 - K-you Life`}
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
                        <div className={styles.menu}>
                            <div>
                                <button
                                    type="button"
                                    className="grey left-icon"
                                    onClick={() => window.print()}
                                >
                                    <PrinterIcon />
                                    프린트
                                </button>
                                {session?.user.asDep == props.ledger.departmentId && (
                                    <button
                                        type="button"
                                        className="grey left-icon"
                                        onClick={() =>
                                            router.push(
                                                'ledger/write?ledgerId=' + props.ledger.departmentId
                                            )
                                        }
                                    >
                                        <PencilSquareIcon />
                                        작성하기
                                    </button>
                                )}
                            </div>
                            <div>
                                <button
                                    type="button"
                                    className="grey"
                                    onClick={() =>
                                        router.push(
                                            '/council/ledger?id=' + props.ledger.departmentId
                                        )
                                    }
                                >
                                    전체보기
                                </button>
                                <form className={`input-box ${styles.input_box}`}>
                                    <input
                                        type="hidden"
                                        name="id"
                                        value={props.ledger.departmentId}
                                    />
                                    <select name="sfl" defaultValue={router.query.sfl}>
                                        <option value="txCategory">거래분류</option>
                                        <option value="paymentMethod">결제방식</option>
                                        <option value="eventName">행사명</option>
                                        <option value="bankbook">통장내역</option>
                                        <option value="state">상태</option>
                                    </select>
                                    <input type="text" name="stx" defaultValue={router.query.stx} />
                                    <button type="submit">
                                        <MagnifyingGlassIcon />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.council_container} noPrint`}>
                        {props.ledger.ledgers.length > 0 ? (
                            props.ledger.ledgers.map((l, i) => (
                                <LedgerCard category={props.ledger.category} ledger={l} key={i} />
                            ))
                        ) : (
                            <>게시물이 없습니다.</>
                        )}
                    </div>
                    <table className={styles.printTable}>
                        <colgroup>
                            <col width={66} />
                            <col width={70} />
                            <col width={120} />
                            <col />
                            <col width={80} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>거래분류</th>
                                <th>거래일자</th>
                                <th>행사명</th>
                                <th>통장내역</th>
                                <th>거래금액</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...props.ledger.ledgers].reverse().map((l: any, i) => {
                                var buttonText = ''
                                var color = ''

                                if (l.txCategory == '수입') {
                                    color = styles.primary
                                }
                                if (l.txCategory == '지출') {
                                    color = styles.red
                                }
                                if (l.state == '기한미준수') {
                                    buttonText = l.state
                                    color = styles.grey
                                }
                                if (l.state == '수정전') {
                                    buttonText = l.state
                                    color = styles.black
                                }

                                var arr = []

                                try {
                                    const json_obj = JSON.parse(l.receiptDetails)

                                    for (var _i in json_obj) arr.push(json_obj[_i])
                                } catch {}

                                return (
                                    <Fragment key={i}>
                                        <tr>
                                            <td className={`text-center ${color}`}>
                                                <span className={styles.buttonCat}>
                                                    {l.txCategory == '지출'
                                                        ? l.paymentMethod
                                                        : l.txCategory}
                                                </span>
                                                {buttonText && (
                                                    <span className={styles.buttonText}>
                                                        {buttonText}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="text-center">
                                                {dayjs(l.txDate).format('YY-MM-DD')}
                                            </td>
                                            <td>{l.eventName}</td>
                                            <td className="text-center">
                                                {`${l.bankbook}${
                                                    l.receiptNum && ` (${l.receiptNum})`
                                                }`}
                                                {l.note && (
                                                    <span className="color-red">{` *`}</span>
                                                )}
                                            </td>
                                            <td className="text-right">
                                                {l.amount.toLocaleString()}
                                            </td>
                                        </tr>
                                        {arr.length > 0 &&
                                            arr.map((_e, _i) => (
                                                <tr key={_i} className={styles.receipt}>
                                                    <td colSpan={3} />
                                                    <td>{`[${_e.receiptCategory || '일반'}] ${
                                                        _e.item
                                                    } (${_e.price.toLocaleString()}×${_e.quantity.toLocaleString()})`}</td>
                                                    <td className="text-right">
                                                        {(_e.receiptCategory == '할인'
                                                            ? _e.quantity * _e.price * -1
                                                            : _e.quantity * _e.price
                                                        ).toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        {l.note && (
                                            <tr className={styles.note}>
                                                <td colSpan={5}>{l.note}</td>
                                            </tr>
                                        )}
                                    </Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps({ query }: any) {
    const response = await fetch(process.env.NEXT_URL + '/api/council/ledger/getLedgerList', {
        method: 'POST',
        body: JSON.stringify({
            departmentId: query.id,
            sfl: query.sfl,
            stx: query.stx,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const result = await response.json()

    return {
        props: { ledger: result.message },
    }
}
