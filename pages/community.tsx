import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import SideBar from '@/components/SideBar'
import Header from '@/components/Header'
import Ready from '@/components/Ready'

export default function Home() {
    return (
        <>
            <Head>
                <title>커뮤니티 - K-you Life</title>
                <meta name="description" content="커뮤니티 - K-you Life" />
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
