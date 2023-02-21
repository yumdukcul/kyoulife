import Head from 'next/head'
import styles from '@/styles/council/Council.module.css'
import SideBar from '@/components/SideBar'
import Header from '@/components/Header'
import { MagnifyingGlassIcon, PencilSquareIcon, PrinterIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import DocsCard from '@/components/council/DocsCard'
import { useSession } from 'next-auth/react'

type Props = {
    docs: {
        departmentId: string
        departmentName: string
        docs: [
            {
                idx: number
                department: string
                docType: string
                eventName: string
                state: string
                datetime: Date
            }
        ]
    }
}

export default function Council(props: Props) {
    const { data: session, status } = useSession()
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
                    </div>
                    <div className={styles.menu}>
                        <div>
                            {session?.user.asDep == props.docs.departmentId && (
                                <button
                                    type="button"
                                    className="grey left-icon"
                                    onClick={() =>
                                        router.push(
                                            '/council/docs/write?docsId=' + props.docs.departmentId
                                        )
                                    }
                                >
                                    <PencilSquareIcon />
                                    작성하기
                                </button>
                            )}
                        </div>
                        <div>
                            <button
                                type="button"
                                className="grey"
                                onClick={() =>
                                    router.push('/council/docs?id=' + props.docs.departmentId)
                                }
                            >
                                전체보기
                            </button>
                            <form className={`input-box ${styles.input_box}`}>
                                <input type="hidden" name="id" value={props.docs.departmentId} />
                                <select name="sfl" defaultValue={router.query.sfl}>
                                    <option value="docType">문서분류</option>
                                    <option value="eventName">행사명</option>
                                    <option value="state">상태</option>
                                </select>
                                <input type="text" name="stx" defaultValue={router.query.stx} />
                                <button type="submit">
                                    <MagnifyingGlassIcon />
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className={styles.council_container}>
                        {props.docs.docs.length > 0 ? (
                            props.docs.docs.map((l, i) => <DocsCard docs={l} key={i} />)
                        ) : (
                            <>게시물이 없습니다.</>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps({ query }: any) {
    const response = await fetch(process.env.NEXT_URL + '/api/council/docs/getDocsList', {
        method: 'POST',
        body: JSON.stringify({
            departmentId: query.id,
            sfl: query.sfl,
            stx: query.stx,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const result = await response.json()

    return {
        props: { docs: result.message },
    }
}
