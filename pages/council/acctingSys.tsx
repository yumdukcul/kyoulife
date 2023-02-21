import Head from 'next/head'
import styles from '@/styles/council/AcctingSys.module.css'
import SideBar from '@/components/SideBar'
import Header from '@/components/Header'
import AcctingSysCard from '@/components/council/AcctingSysCard'
import { prisma } from '@/util/db'

type Props = {
    categoryArray: [
        {
            categoryId: string
            categoryName: string
        }
    ]
}

export default function Council(props: Props) {
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
                <div className={styles.container}>
                    <h3>전산화시스템</h3>
                    <div className={styles.card_wrapper}>
                        {props.categoryArray.map((e, i) => (
                            <AcctingSysCard id={e.categoryId} name={e.categoryName} key={i} />
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(context: any) {
    const result = await prisma.acctingsyscategory.findMany({
        select: {
            categoryId: true,
            categoryName: true,
        },
        orderBy: { orderNum: 'asc' },
    })

    return {
        props: { categoryArray: result },
    }
}
