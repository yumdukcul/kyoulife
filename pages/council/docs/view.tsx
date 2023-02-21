import Head from 'next/head'
import styles from '@/styles/council/Council.module.css'
import SideBar from '@/components/SideBar'
import Header from '@/components/Header'
import { PrinterIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import DocsViewCard from '@/components/council/DocsViewCard'
import { user } from '@prisma/client'

type Props = {
    docs: {
        departmentId: string
        departmentName: string
        category: string
        docs: {
            idx: number
            department: string
            docType: string
            eventName: string
            startDate: Date
            endDate: Date
            eventPlace: string
            personnel: string
            purpose: string
            content: string
            state: string
            datetime: Date
            writer: string
            submitDate: Date
            manager: string
            user_docslist_writerTouser: user
            user_docslist_managerTouser: user
        }
    }
}

export default function Council(props: Props) {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>{`${props.docs.departmentName} 발신문서 - K-you Life`}</title>
                <meta
                    name="description"
                    content={`${props.docs.departmentName} 발신문서 - K-you Life`}
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <SideBar />
            <main className={styles.main}>
                <Header />
                <div className={styles.container}>
                    <div className={styles.docs_header}>
                        <div className={styles.docs_title}>
                            <h3>{props.docs.departmentName}</h3>
                            <div className={styles.button_wrapper}>
                                <button
                                    type="button"
                                    className={`grey`}
                                    onClick={() =>
                                        router.push('/council/ledger?id=' + props.docs.departmentId)
                                    }
                                >
                                    전자장부
                                </button>
                                <button type="button" className={`primary`}>
                                    발신문서
                                </button>
                            </div>
                        </div>
                        <div className={styles.menu}>
                            <button
                                type="button"
                                className="grey left-icon"
                                onClick={() => window.print()}
                            >
                                <PrinterIcon />
                                프린트
                            </button>
                        </div>
                    </div>
                    <div className={styles.council_container}>
                        {<DocsViewCard category={props.docs.category} docs={props.docs.docs} />}
                    </div>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps({ query }: any) {
    const response = await fetch(process.env.NEXT_URL + '/api/council/docs/getDocs', {
        method: 'POST',
        body: JSON.stringify({
            idx: query.idx,
            departmentId: query.docsId,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const result = await response.json()

    if ((query.idx && !result.message.docs) || result.error) {
        return {
            redirect: {
                permanent: false,
                destination: `/council/docs?id=${query.docsId}`,
            },
            props: {},
        }
    }

    return {
        props: { docs: result.message },
    }
}
