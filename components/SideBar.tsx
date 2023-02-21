import styles from '@/styles/SideBar.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const menu = [
    { id: 'home', name: '홈', path: '/' },
    { id: 'schedule', name: '시간표', path: '/schedule' },
    { id: 'community', name: '커뮤니티', path: '/community' },
    { id: 'council', name: '학생회', path: '/council' },
    { id: 'alliance', name: '제휴업체', path: '/alliance' },
]

export default function SideBar() {
    const router = useRouter()

    return (
        <aside className={styles.aside}>
            <Link href="/" className={styles.logo}>
                <Image
                    src="/assets/img/logo.svg"
                    alt="Next.js Logo"
                    width={226}
                    height={49}
                    priority
                    className={styles.logo}
                />
            </Link>
            <ul>
                {menu.map(m => {
                    const pathname = '/' + router.pathname.split('/')[1]
                    return (
                        <li key={m.id} className={styles.menu}>
                            <Link
                                href={m.path}
                                className={pathname == m.path ? styles.selected : ''}
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
