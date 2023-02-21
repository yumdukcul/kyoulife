import styles from '@/styles/council/Council.module.css'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

type Props = {
    docs: {
        idx: number
        department: string
        docType: string
        eventName: string
        state: string
        datetime: Date
    }
}

export default function DocsCard(props: Props) {
    const router = useRouter()

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

    return (
        <div
            className={`box ${styles.council_wrapper}`}
            onClick={() =>
                router.push(
                    `/council/docs/view?docsId=${props.docs.department}&idx=${props.docs.idx}`
                )
            }
        >
            <div className={`box ${styles.council_button} ${color}`}>{props.docs.state}</div>
            <div className={styles.docs_content}>
                <span>{props.docs.docType}</span>
                <span>{props.docs.eventName}</span>
                <span className={styles.datetime}>
                    {dayjs(props.docs.datetime).format('YYYY년 MM월 DD일')}
                </span>
            </div>
        </div>
    )
}
