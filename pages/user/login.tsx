import Head from 'next/head'
import styles from '@/styles/user/Login.module.css'
import SideBar from '@/components/SideBar'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Login() {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === 'authenticated') router.replace('/')

    async function handleSubmit(e: any) {
        e.preventDefault()

        const result: any = await signIn('credentials', {
            redirect: false,
            username: e.target.username.value,
            password: e.target.password.value,
        })

        if (!result.error) {
            router.replace('/')
        } else {
            alert(result.error)
        }
    }

    return (
        <>
            <Head>
                <title>로그인 - K-you Life</title>
                <meta name="description" content="로그인 - K-you Life" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <SideBar />
            <main className={styles.main}>
                <div id="container">
                    <div className={styles.login}>
                        <form onSubmit={handleSubmit}>
                            <Image
                                src="/assets/img/logo.svg"
                                alt="Next.js Logo"
                                width={226}
                                height={49}
                                priority
                                className={styles.logo}
                            />
                            <div className={`input-box ${styles.input_box}`}>
                                <div>
                                    <input
                                        type="text"
                                        id="username"
                                        placeholder="아이디"
                                        required
                                        maxLength={20}
                                    />
                                    <span id="username_err"></span>
                                </div>
                            </div>
                            <div className={`input-box ${styles.input_box}`}>
                                <div>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="비밀번호"
                                        required
                                        maxLength={20}
                                    />
                                    <span id="username_err"></span>
                                </div>
                            </div>
                            <button type="submit" className="primary">
                                로그인
                            </button>
                            <div className={styles.link_wrapper}>
                                <Link href="#">아이디 찾기</Link>
                                <Link href="#">비밀번호 찾기</Link>
                                <Link href="/user/register">회원가입</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}
