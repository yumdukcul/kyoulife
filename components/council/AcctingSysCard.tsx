import useDetectClose from '@/hooks/useDetectClose'
import styles from '@/styles/council/AcctingSys.module.css'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

type Props = {
    id: string
    name: string
}

type Elem = {
    departmentId: string
    departmentName: string
}

export default function AcctingSysCard(props: Props) {
    const ref = useRef(null)
    const [isOpen, setIsOpen] = useDetectClose(ref, false)
    const [res, setRes] = useState([])

    async function getList() {
        const response = await fetch(
            `/api/council/getAcctingSysList?categoryId=${props.id}`
        )

        const result = await response.json()

        setRes(result.message)
    }

    useEffect(() => {
        if (isOpen) getList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    return (
        <div
            ref={ref}
            className={`${styles.card} ${isOpen ? styles.open : ''}`}
            onClick={() => setIsOpen(!isOpen)}
        >
            <h4>{props.name}</h4>
            <div className={`${styles.content} ${isOpen ? styles.open : ''}`}>
                {res.map((e: Elem, i) => (
                    <div key={i}>
                        <Link href={`/council/ledger?id=${e.departmentId}`}>
                            {e.departmentName}
                        </Link>
                    </div>
                ))}
            </div>
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
    )
}
