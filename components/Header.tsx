import styles from '@/styles/Header.module.css'
import { ChevronDownIcon, UserIcon } from '@heroicons/react/24/solid'
import { useRef } from 'react'
import useDetectClose from '@/hooks/useDetectClose'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
    const router = useRouter()
    const { data: session, status } = useSession()

    const dropDownRef = useRef(null)
    const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false)

    return (
        <header className={styles.header}>
            {status === 'authenticated' ? (
                <div ref={dropDownRef} className={styles.userWrapper}>
                    <button
                        className={styles.user}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className={styles.userIconWrapper}>
                            <UserIcon className={styles.userIcon} />
                        </div>
                        {session.user.name}님
                        <ChevronDownIcon className={styles.dropdownIcon} />
                    </button>
                    <ul
                        className={
                            (isOpen ? styles.open : styles.close) +
                            ' ' +
                            styles.userMenu
                        }
                    >
                        {session.user.asLev >= 5 && (
                            <li>
                                {router.pathname.split('/')[1] == 'admin' ? (
                                    <Link href="/">홈페이지</Link>
                                ) : (
                                    <Link href="/admin">관리자페이지</Link>
                                )}
                            </li>
                        )}
                        <li onClick={() => signOut()}>로그아웃</li>
                    </ul>
                </div>
            ) : (
                <Link href="/user/login">로그인</Link>
            )}
        </header>
    )
}
