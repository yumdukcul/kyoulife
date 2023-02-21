import Head from 'next/head'
import styles from '@/styles/council/Council.module.css'
import SideBar from '@/components/SideBar'
import Header from '@/components/Header'
import Ready from '@/components/Ready'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Council() {
    const router = useRouter()

    useEffect(() => {
        router.replace('/council/acctingSys')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Head>
                <title>전산화시스템 - K-you Life</title>
                <meta name="description" content="전산화시스템 - K-you Life" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <SideBar />
            <main className={styles.main}>
                <Header />
                <div id="container">
                    <Ready />
                </div>
            </main>
        </>
    )
}
