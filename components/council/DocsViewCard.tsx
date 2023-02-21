import styles from '@/styles/council/Council.module.css'
import { user } from '@prisma/client'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

dayjs.locale('ko')

type Props = {
    category: string
    docs: {
        idx: number
        department: string
        docType: string
        eventName: string
        startDate: Date
        endDate: Date
        eventPlace: string
        personnel: string
        purpose: string
        content: string
        state: string
        datetime: Date
        writer: string
        submitDate: Date
        manager: string
        user_docslist_writerTouser: user
        user_docslist_managerTouser: user
    }
}

type Income = {
    content: string
    total: number
    receipts: Receipt[]
}

type Spend = {
    content: string
    place: string
    total: number
    receipts: Receipt[]
}

type Receipt = {
    orderNum: number
    receiptCategory: string
    item: string
    quantity: number
    price: number
}

export default function DocsViewCard(props: Props) {
    const { data: session, status } = useSession()
    const router = useRouter()

    const [incomeDetails, setIncomeDetails] = useState<Income[]>([])
    const [spendDetails, setSpendDetails] = useState<Spend[]>([])

    var color = ''

    if (props.docs.state == '승인') {
        color = styles.primary
    }
    if (props.docs.state == '취소') {
        color = styles.white
    }
    if (props.docs.state == '기한미준수' || props.docs.state == '미제출') {
        color = styles.grey
    }
    if (props.docs.state == '승인전') {
        color = styles.black
    }

    useEffect(() => {
        try {
            const json_obj = JSON.parse(props.docs.content)
            var incomeArr = []
            var spendArr = []

            console.log(json_obj.income.incomeDetails[0])

            for (var i in json_obj.income.incomeDetails)
                incomeArr.push(json_obj.income.incomeDetails[i])
            for (var i in json_obj.spend.spendDetails) spendArr.push(json_obj.spend.spendDetails[i])
            console.log(incomeArr)

            setIncomeDetails(incomeArr)
            setSpendDetails(spendArr)
        } catch {}
    }, [props.docs.content])

    async function cancel() {
        if (window.confirm('해당 문서를 취소 처리하시겠습니까?')) {
            const result = await (
                await fetch('/api/council/docs/updateDocState', {
                    method: 'POST',
                    body: JSON.stringify({
                        idx: props.docs.idx,
                        state: '취소',
                        manager: session?.user.username,
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

    async function apply() {
        if (window.confirm('해당 문서를 승인 처리하시겠습니까?')) {
            const result = await (
                await fetch('/api/council/docs/updateDocState', {
                    method: 'POST',
                    body: JSON.stringify({
                        idx: props.docs.idx,
                        state: '승인',
                        manager: session?.user.username,
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
        <div className={`box ${styles.council_wrapper} cursor-default`}>
            <div className={`box ${styles.council_button} ${color}`}>{props.docs.state}</div>
            <div className={`${styles.docs_content} ${styles.view}`}>
                <span>{props.docs.docType}</span>
                <span>{props.docs.eventName}</span>
            </div>
            <div className={`${styles.more_wrapper}`}>
                <div className="flex">
                    <span className={styles.subj}>작성자</span>
                    <span className={styles.con}>
                        {props.docs.user_docslist_writerTouser.name ?? '-'}
                    </span>
                </div>
                <div className="flex">
                    <span className={styles.subj}>작성일</span>
                    <span className={styles.con}>
                        {dayjs(props.docs.datetime).format('YYYY년 MM월 DD일 A hh:mm:ss')}
                    </span>
                </div>
                <div className="flex">
                    <span className={styles.subj}>처리담당자</span>
                    <span className={styles.con}>
                        {props.docs?.user_docslist_managerTouser?.name ?? '-'}
                    </span>
                </div>
                <div className="flex">
                    <span className={styles.subj}>최종처리일</span>
                    <span className={styles.con}>
                        {props.docs.submitDate
                            ? dayjs(props.docs.submitDate).format('YYYY년 MM월 DD일 A hh:mm:ss')
                            : '-'}
                    </span>
                </div>
                <div className="flex">
                    <span className={styles.subj}>시작일자</span>
                    <span className={styles.con}>
                        {dayjs(props.docs.startDate).format('YYYY년 MM월 DD일')}
                    </span>
                </div>
                <div className="flex">
                    <span className={styles.subj}>종료일자</span>
                    <span className={styles.con}>
                        {dayjs(props.docs.endDate).format('YYYY년 MM월 DD일')}
                    </span>
                </div>
                {(props.docs.docType == '기획안' || props.docs.docType == '결과보고서') && (
                    <>
                        <div className="flex">
                            <span className={styles.subj}>행사장소</span>
                            <span className={styles.con}>{props.docs.eventPlace}</span>
                        </div>
                        <div className="flex">
                            <span className={styles.subj}>대상인원</span>
                            <span className={styles.con}>{props.docs.personnel}</span>
                        </div>
                    </>
                )}
            </div>
            {props.docs.docType == '기획안' && (
                <div className={`${styles.more_wrapper} ${styles.border_none} block`}>
                    <div className="flex">
                        <span className={styles.subj}>목적 및 취지</span>
                        <span className={styles.con}>{props.docs.purpose}</span>
                    </div>
                </div>
            )}
            {props.docs.docType == '결과보고서' && (
                <div className={`${styles.more_wrapper} ${styles.border_none} block`}>
                    <div className={styles.image_div}>
                        <span className={styles.subj}>행사사진</span>
                        <div className={styles.image_wrapper}>
                            {JSON.parse(props.docs.content).eventImage.error ||
                                JSON.parse(props.docs.content).eventImage.map(
                                    (img: any, i: number) => (
                                        <div key={i} className={`box ${styles.image_container}`}>
                                            <Image
                                                className={styles.image}
                                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${img}`}
                                                alt={img}
                                                layout="fill"
                                                loading="lazy"
                                            />
                                        </div>
                                    )
                                )}
                        </div>
                    </div>
                    <div className={styles.image_div}>
                        <span className={styles.subj}>물품사진</span>
                        <div className={styles.image_wrapper}>
                            {JSON.parse(props.docs.content).eventImage.error ||
                                JSON.parse(props.docs.content).itemImage.map(
                                    (img: any, i: number) => (
                                        <div key={i} className={`box ${styles.image_container}`}>
                                            <Image
                                                className={styles.image}
                                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${img}`}
                                                alt={img}
                                                layout="fill"
                                                loading="lazy"
                                            />
                                        </div>
                                    )
                                )}
                        </div>
                    </div>
                </div>
            )}
            {incomeDetails.length > 0 &&
                incomeDetails.map((e, i) => (
                    <div
                        key={i}
                        className={`${styles.more_wrapper} ${styles.border_none} ${styles.viewDetails} block box`}
                    >
                        <div className={`${styles.more_wrapper} ${styles.border_none}`}>
                            <div className="flex">
                                <span className={styles.subj}>내용</span>
                                <span className={styles.con}>{e.content}</span>
                            </div>
                            <div className="flex">
                                <span className={`${styles.subj} color-primary`}>수입총액</span>
                                <span className={styles.con}>{e.total.toLocaleString()}원</span>
                            </div>
                        </div>
                        <div className={styles.receipt_wrapper}>
                            {e.receipts.map((_e, _i) => (
                                <div key={i}>
                                    <span>{_e.item}</span>
                                    <span>{_e.price.toLocaleString()} 원</span>
                                    <span>{_e.quantity.toLocaleString()} 개</span>
                                    <span>
                                        {(_e.receiptCategory == '할인'
                                            ? _e.quantity * _e.price * -1
                                            : _e.quantity * _e.price
                                        ).toLocaleString()}{' '}
                                        원
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            {spendDetails.length > 0 &&
                spendDetails.map((e, i) => (
                    <div
                        key={i}
                        className={`${styles.more_wrapper} ${styles.border_none} ${styles.viewDetails} block box`}
                    >
                        <div className={`${styles.more_wrapper} ${styles.border_none}`}>
                            <div className="flex">
                                <span className={styles.subj}>내용</span>
                                <span className={styles.con}>{e.content}</span>
                            </div>
                            <div className="flex">
                                <span className={styles.subj}>구매처</span>
                                <span className={styles.con}>{e.place}</span>
                            </div>
                            <div className="flex">
                                <span className={`${styles.subj} color-red`}>지출총액</span>
                                <span className={styles.con}>{e.total.toLocaleString()}원</span>
                            </div>
                        </div>
                        <div className={styles.receipt_wrapper}>
                            {e.receipts.map((_e, _i) => (
                                <div key={i}>
                                    <span>{_e.item}</span>
                                    <span>{_e.price.toLocaleString()} 원</span>
                                    <span>{_e.quantity.toLocaleString()} 개</span>
                                    <span>
                                        {(_e.receiptCategory == '할인'
                                            ? _e.quantity * _e.price * -1
                                            : _e.quantity * _e.price
                                        ).toLocaleString()}{' '}
                                        원
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            <div className={styles.button_wrapper}>
                <div>
                    {session?.user.asCat == props.category && (
                        <>
                            {props.docs.state !== '취소' && (
                                <button
                                    type="button"
                                    className={`red ${styles.cancel}`}
                                    onClick={e => {
                                        e.stopPropagation()
                                        cancel()
                                    }}
                                >
                                    취소
                                </button>
                            )}
                            {props.docs.state !== '승인' && props.docs.state !== '기한미준수' && (
                                <button
                                    type="button"
                                    className={`primary ${styles.apply}`}
                                    onClick={e => {
                                        e.stopPropagation()
                                        apply()
                                    }}
                                >
                                    승인
                                </button>
                            )}
                        </>
                    )}
                </div>
                <button
                    type="button"
                    className={`grey ${styles.cancel}`}
                    onClick={e => {
                        e.stopPropagation()
                        router.push(`/council/docs/?id=${props.docs.department}`)
                    }}
                >
                    목록
                </button>
            </div>
        </div>
    )
}
