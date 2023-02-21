import { useEffect, useRef, useState } from 'react'
import modal from '@/styles/Modal.module.css'
import styles from '@/styles/admin/modal/AdminModal.module.css'
import useDetectClose from '@/hooks/useDetectClose'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

type PageProps = {
    modalClose: Function
    username: string
    acctSysCategories: Array<any>
}

const levels = [
    { level: 0, name: '준회원' },
    { level: 1, name: '일반학우' },
    { level: 2, name: '총무' },
    { level: 3, name: '회장' },
    { level: 4, name: '대의원' },
    { level: 5, name: '단과대학 상임의장' },
    { level: 6, name: '총대의원회 의장' },
]

export default function RecordModal(props: PageProps) {
    const { data: session, status } = useSession()
    const router = useRouter()

    const modalRef = useRef(null)
    const [isOpen, setIsOpen] = useDetectClose(modalRef, true)
    const [user, setUser] = useState<any>()
    const [acctSysDepartments, setAcctSysDepartments] = useState<any[]>([])

    const [asLev, setAsLev] = useState('')
    const [asCat, setAsCat] = useState('')
    const [asDep, setAsDep] = useState('')

    useEffect(() => {
        if (!isOpen) props.modalClose()
    }, [isOpen, props])

    useEffect(() => {
        getInfo(props.username)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.username])

    async function getInfo(username: string) {
        const user = await JSON.parse(
            (
                await (
                    await fetch('/api/admin/user/getUser', {
                        method: 'POST',
                        body: JSON.stringify({
                            username: username,
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                ).json()
            ).message.user
        )

        const acctSysDepartments = (await (await fetch('/api/council/getAcctingSysList')).json())
            .message

        setAcctSysDepartments(
            acctSysDepartments.filter((dep: any) => {
                if ((session?.user.asLev ?? 0) >= 6) return dep
                else return dep.category == session?.user.asCat
            })
        )
        setUser(user)

        setAsLev(user.asLev)
        setAsCat(user.asCat)
        setAsDep(user.asDep)
    }

    async function handleSubmit() {
        if (!window.confirm('수정하시겠습니까?')) return

        const level = session?.user.asLev ?? 0

        const result = await (
            await fetch('/api/admin/user/updateUser', {
                method: 'POST',
                body: JSON.stringify({
                    username: user.username,
                    asLev: parseInt(level >= 5 ? asLev : user.asLev),
                    asCat: level >= 6 ? asCat : user.asCat,
                    asDep: level >= 5 ? asDep : user.asDep,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        ).json()

        if (result.error) return alert('처리 실패')
        else {
            alert('수정이 완료되었습니다.')
            router.replace({
                pathname: router.pathname,
                query: { ...router.query, username: user.username },
            })
        }
    }

    return (
        <div className={modal.modal_wrapper}>
            <div className={`${modal.modal_container} ${styles.user_modal}`} ref={modalRef}>
                {user && (
                    <>
                        <div className={modal.user_info}>
                            <div className={modal.flex}>
                                <span>아이디</span>
                                <span>{user.username}</span>
                            </div>
                            <div className={modal.flex}>
                                <span>이름</span>
                                <span>{user.name}</span>
                            </div>
                            <div className={modal.flex}>
                                <span>학번</span>
                                <span>{user.studentId ?? '-'}</span>
                            </div>
                            <div className={modal.flex}>
                                <span>별명</span>
                                <span>{user.nickname}</span>
                            </div>
                            <div className={modal.flex}>
                                <span>가입일</span>
                                <span>{dayjs(user.regDate).format('YYYY-MM-DD HH:mm:ss')}</span>
                            </div>
                            <div className={modal.flex}>
                                <span>권한</span>
                                {(session?.user.asLev ?? 0) >= 5 ? (
                                    <select value={asLev} onChange={e => setAsLev(e.target.value)}>
                                        {levels.map((level, i) =>
                                            level.level < (session?.user.asLev ?? 0) ? (
                                                <option key={i} value={level.level}>
                                                    {level.name}
                                                </option>
                                            ) : (
                                                ''
                                            )
                                        )}
                                    </select>
                                ) : (
                                    <span>{user.asLev}</span>
                                )}
                            </div>
                            <div className={modal.flex}>
                                <span>관할 범위</span>
                                {(session?.user.asLev ?? 0) >= 6 ? (
                                    <select value={asCat} onChange={e => setAsCat(e.target.value)}>
                                        <option value="">없음</option>
                                        {props.acctSysCategories.map((cat, i) => (
                                            <option key={i} value={cat.categoryId}>
                                                {cat.categoryName}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <span>
                                        {user.asCat
                                            ? props.acctSysCategories.map(cat =>
                                                  cat.categoryId == user.asCat
                                                      ? cat.categoryName
                                                      : ''
                                              )
                                            : '-'}
                                    </span>
                                )}
                            </div>
                            <div className={modal.flex}>
                                <span>소속 기구</span>
                                {(session?.user.asLev ?? 0) >= 5 ? (
                                    <select value={asDep} onChange={e => setAsDep(e.target.value)}>
                                        <option value="">없음</option>
                                        {acctSysDepartments.map((dep, i) => (
                                            <option key={i} value={dep.departmentId}>
                                                {dep.departmentName}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <span>
                                        {acctSysDepartments.map(dep =>
                                            dep.departmentId == user.asDep ? dep.departmentName : ''
                                        )}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className={modal.button_wrapper}>
                            <button
                                type="button"
                                className={`grey ${modal.close}`}
                                onClick={() => setIsOpen(false)}
                            >
                                닫기
                            </button>
                            <button
                                type="button"
                                className={`primary ${modal.apply}`}
                                onClick={handleSubmit}
                            >
                                수정완료
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
