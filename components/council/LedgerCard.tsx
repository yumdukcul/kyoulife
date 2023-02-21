import styles from '@/styles/council/Council.module.css'
import { user } from '@prisma/client'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

dayjs.locale('ko')

type Props = {
    category: string
    ledger: {
        idx: number
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
        writer: string
        modifyDate: Date
        user: user
    }
}

type Receipt = {
    orderNum: number
    receiptCategory: string
    item: string
    quantity: number
    price: number
}

export default function LedgerCard(props: Props) {
    const { data: session, status } = useSession()
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [receiptDetails, setReceiptDetails] = useState<Receipt[]>([])

    var buttonText = ''
    var color = ''

    if (props.ledger.txCategory == '수입') {
        buttonText = props.ledger.txCategory
        color = styles.primary
    }
    if (props.ledger.txCategory == '지출') {
        buttonText = props.ledger.txCategory
        color = styles.red
    }
    if (props.ledger.state == '기한미준수') {
        buttonText = props.ledger.state
        color = styles.grey
    }
    if (props.ledger.state == '수정전') {
        buttonText = props.ledger.state
        color = styles.black
    }

    useEffect(() => {
        try {
            const json_obj = JSON.parse(props.ledger.receiptDetails)
            var arr = []

            for (var i in json_obj) arr.push(json_obj[i])

            setReceiptDetails(arr)
        } catch {}
    }, [props.ledger.receiptDetails])

    async function submitModify() {
        if (window.confirm('해당 내역에 수정 권한을 부여합니다.')) {
            const result = await (
                await fetch('/api/council/ledger/updateLedgerState', {
                    method: 'POST',
                    body: JSON.stringify({
                        idx: props.ledger.idx,
                        state: '수정전',
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            ).json()

            if (!result.error)
                router.replace({
                    pathname: router.pathname,
                    query: router.query,
                })
            else alert(`처리실패 : ${result.message}`)
        }
    }

    return (
        <div className={`box ${styles.council_wrapper}`} onClick={() => setIsOpen(!isOpen)}>
            <div className={`box ${styles.council_button} ${color}`}>{buttonText}</div>
            <div className={styles.ledger_content}>
                <span className={styles.subj}>거래일자</span>
                <span className={styles.datetime}>
                    {dayjs(props.ledger.txDate).format('YYYY-MM-DD')}
                </span>
                <span className={styles.subj}>행사명</span>
                <span>{props.ledger.eventName}</span>
                <span className={styles.subj}>통장내역</span>
                <span>
                    {`${props.ledger.bankbook}${
                        props.ledger.receiptNum && ` (${props.ledger.receiptNum})`
                    }`}
                    {props.ledger.note && <span className="color-red"> *</span>}
                </span>
                <span className={styles.subj}>거래금액</span>
                <span>{props.ledger.amount.toLocaleString()} 원</span>
            </div>
            <div className={`${styles.more_container} ${isOpen ? styles.open : ''}`}>
                <div className={styles.more_wrapper}>
                    <div className="flex">
                        <span className={styles.subj}>작성자</span>
                        <span className={styles.con}>{props.ledger.user.name ?? '-'}</span>
                    </div>
                    <div className="flex">
                        <span className={styles.subj}>상태</span>
                        <span className={styles.con}>
                            {props.ledger.state ? props.ledger.state : '일반'}
                        </span>
                    </div>
                    <div className="flex">
                        <span className={styles.subj}>작성일</span>
                        <span className={styles.con}>
                            {dayjs(props.ledger.datetime).format('YYYY년 MM월 DD일 A hh:mm:ss')}
                        </span>
                    </div>
                    <div className="flex">
                        <span className={styles.subj}>최종수정일</span>
                        <span className={styles.con}>
                            {props.ledger.modifyDate
                                ? dayjs(props.ledger.modifyDate).format(
                                      'YYYY년 MM월 DD일 A hh:mm:ss'
                                  )
                                : '-'}
                        </span>
                    </div>
                    <div className="flex">
                        <span className={styles.subj}>거래분류</span>
                        <span className={styles.con}>
                            {`${props.ledger.txCategory}${
                                props.ledger.paymentMethod ? `(${props.ledger.paymentMethod})` : ''
                            }`}
                        </span>
                    </div>
                    <div className="flex">
                        <span className={styles.subj}>영수증번호</span>
                        <span className={styles.con}>
                            {props.ledger.receiptNum ? props.ledger.receiptNum : '-'}
                        </span>
                    </div>
                </div>
                {receiptDetails.length > 0 && (
                    <div className={styles.receipt_wrapper}>
                        {receiptDetails.map((e, i) => (
                            <div key={i}>
                                <span>{e.item}</span>
                                <span>{e.price.toLocaleString()} 원</span>
                                <span>{e.quantity.toLocaleString()} 개</span>
                                <span>
                                    {(e.receiptCategory == '할인'
                                        ? e.quantity * e.price * -1
                                        : e.quantity * e.price
                                    ).toLocaleString()}{' '}
                                    원
                                </span>
                            </div>
                        ))}
                    </div>
                )}
                {props.ledger.note && (
                    <div className={`${styles.more_wrapper} ${styles.border_none} block`}>
                        <div className="flex">
                            <span className={styles.subj}>특이사항</span>
                            <span className={styles.con}>{props.ledger.note}</span>
                        </div>
                    </div>
                )}
                {((session?.user.asDep == props.ledger.department &&
                    session?.user.username == props.ledger.writer &&
                    props.ledger.state == '수정전') || // 나의 소속기구이면서, 내가 쓴 글이면서, 수정전 상태 일 때
                    session?.user.asCat == props.category) && ( // 나의 관할 범위일 때
                    <div className={styles.button_wrapper}>
                        <button
                            type="button"
                            className={`grey ${styles.modify}`}
                            onClick={e => {
                                e.stopPropagation()

                                if (session?.user.asDep == props.ledger.department)
                                    router.push(
                                        `/council/ledger/write?ledgerId=${props.ledger.department}&idx=${props.ledger.idx}`
                                    )
                                else submitModify()
                            }}
                        >
                            수정
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
