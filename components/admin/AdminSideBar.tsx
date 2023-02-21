import styles from '@/styles/SideBar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const menu = [
    { id: 'admin', name: '관리자 홈', path: '/admin/' },
    { id: 'userList', name: '회원관리', path: '/admin/userList' },
    { id: 'acctingSys', name: '전산화 시스템', path: '/admin/acctingSys' },
]

export default function AdminSideBar() {
    const router = useRouter()

    return (
        <aside className={styles.aside}>
            <Link href="/">
                <Image
                    src="/assets/img/logo.svg"
                    alt="Next.js Logo"
                    width={226}
                    height={49}
                    priority
                    className={styles.logo}
                />
            </Link>
            <h3>관리자페이지</h3>
            <ul>
                {menu.map(m => {
                    const pathname =
                        '/admin/' + (router.pathname.split('/')[2] || '')
                    return (
                        <li key={m.id} className={styles.menu}>
                            <Link
                                href={m.path}
                                className={
                                    pathname == m.path ? styles.selected : ''
                                }
                            >
                                <span>{m.name}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </aside>
    )
}
