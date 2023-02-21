import styles from '@/styles/user/Register.module.css'
import { useRouter } from 'next/router'

type Props = {
    name: string
}

export default function RegisterComplete(props: Props) {
    const router = useRouter()

    return (
        <>
            <div className={`box ${styles.complete}`}>
                <div className={styles.main_text}>
                    <span className={styles.name}>{props.name}</span>님
                    회원가입이 완료되었습니다 !
                </div>
                <span className={styles.text}>
                    로그인후 K-you Life의 다양한 서비스를 이용해보세요 !
                </span>
            </div>
            <div className={styles.button_wrapper}>
                <button
                    type="button"
                    className="grey"
                    onClick={e => router.push('/')}
                >
                    메인으로
                </button>
                <button
                    type="button"
                    className="primary"
                    onClick={e => router.push('/user/login')}
                >
                    로그인
                </button>
            </div>
        </>
    )
}
