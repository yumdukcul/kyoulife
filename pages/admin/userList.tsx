import Head from 'next/head'
import styles from '@/styles/admin/Admin.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { getSession, useSession } from 'next-auth/react'
import Header from '@/components/Header'
import UserModal from '@/components/admin/modal/UserModal'
import AdminSideBar from '@/components/admin/AdminSideBar'
import dayjs from 'dayjs'
import { prisma } from '@/util/db'

type PageProps = {
    users: Array<any>
    acctSysDepartments: Array<any>
    acctSysCategories: Array<any>
    count: number
}

const levels = [
    { level: 0, name: '준회원' },
    { level: 1, name: '일반학우' },
    { level: 2, name: '총무' },
    { level: 3, name: '회장' },
    { level: 4, name: '대의원' },
    { level: 5, name: '단과대학 상임의장' },
    { level: 6, name: '총대의원회 의장' },
    { level: 7, name: '관리자' },
    { level: 8, name: '관리자' },
    { level: 9, name: '관리자' },
    { level: 10, name: '최고관리자' },
]

export default function Home(props: PageProps) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const query = router.query

    const [modal, setModal] = useState('')

    useEffect(() => {
        setModal(query.username as string)
    }, [query.username])

    const page: number = parseInt(query.page?.toString() ?? '1')
    const limit: number = parseInt(query.limit?.toString() ?? '10')

    const view = 5

    const start = 1
    const end = Math.ceil(props.count / limit)
    const prev =
        Math.floor((page - 1) / view) * view > start ? Math.floor((page - 1) / view) * view : start
    const next =
        (Math.floor((page - 1) / view) + 1) * view + 1 < end
            ? (Math.floor((page - 1) / view) + 1) * view + 1
            : end

    function pagination() {
        var arr = []
        arr.push(
            <Link
                key="start"
                href={`?page=${start}`}
                className={
                    page < (Math.floor((start - 1) / view) + 1) * view + 1 ? styles.disabled : ''
                }
                onClick={e => {
                    if (page < (Math.floor((start - 1) / view) + 1) * view + 1) e.preventDefault()
                }}
            >
                <ChevronDoubleLeftIcon />
            </Link>
        )
        arr.push(
            <Link
                key="prev"
                href={`?page=${prev}`}
                className={page == start ? styles.disabled : ''}
                onClick={e => {
                    if (page == start) e.preventDefault()
                }}
            >
                <ChevronLeftIcon />
            </Link>
        )
        for (
            var i = Math.floor((page - 1) / view) * view + 1;
            i <
            ((Math.floor((page - 1) / view) + 1) * view + 1 < end
                ? (Math.floor((page - 1) / view) + 1) * view + 1
                : end + 1);
            i++
        ) {
            arr.push(
                <Link key={i} href={`?page=${i}`} className={page == i ? styles.selected : ''}>
                    {i}
                </Link>
            )
        }
        arr.push(
            <Link
                key="next"
                href={`?page=${next}`}
                className={page == end ? styles.disabled : ''}
                onClick={e => {
                    if (page == end) e.preventDefault()
                }}
            >
                <ChevronRightIcon />
            </Link>
        )
        arr.push(
            <Link
                key="end"
                href={`?page=${end}`}
                className={page > Math.floor((end - 1) / view) * view ? styles.disabled : ''}
                onClick={e => {
                    if (page > Math.floor((end - 1) / view) * view) e.preventDefault()
                }}
            >
                <ChevronDoubleRightIcon />
            </Link>
        )
        return arr
    }

    return (
        <>
            <Head>
                <title>관리자 페이지 - K-you Life</title>
                <meta name="description" content="관리자 페이지 - K-you Life" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AdminSideBar />
            <div className={styles.main_wrapper}>
                <Header />
                <main className={styles.main}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>아이디</th>
                                <th>이름</th>
                                <th>학번</th>
                                <th>별명</th>
                                <th>가입일</th>
                                <th>권한</th>
                                <th>관할 범위</th>
                                <th>소속 기구</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.users.map((data, id) => (
                                <tr
                                    key={id}
                                    onClick={() => {
                                        if (session?.user.username == data.username)
                                            return alert('본인 정보는 수정할 수 없습니다.')

                                        if ((session?.user.asLev ?? 0) <= data.asLev)
                                            return alert(
                                                '본인보다 권한이 낮은 회원의 정보만 수정할 수 있습니다.'
                                            )
                                        setModal(data.username)
                                    }}
                                >
                                    <td>{data.username}</td>
                                    <td>{data.name}</td>
                                    <td>{data.studentId ?? '-'}</td>
                                    <td>{data.nickname}</td>
                                    <td>{dayjs(data.regDate).format('YYYY-MM-DD')}</td>
                                    <td>{levels[data.asLev ?? 0].name}</td>
                                    <td>
                                        {data.asCat
                                            ? props.acctSysCategories.find(
                                                  cat => cat.categoryId == data.asCat
                                              ).categoryName
                                            : '-'}
                                    </td>
                                    <td>
                                        {data.asDep
                                            ? props.acctSysDepartments.find(
                                                  dep => dep.departmentId == data.asDep
                                              ).departmentName
                                            : '-'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={styles.page_group}>{pagination()}</div>
                    {modal && (
                        <UserModal
                            username={modal}
                            modalClose={() => setModal('')}
                            acctSysCategories={props.acctSysCategories}
                        />
                    )}
                </main>
            </div>
        </>
    )
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context)

    if (!session)
        return {
            redirect: {
                permanent: false,
                destination: `/user/login`,
            },
            props: {},
        }
    else if (session.user.asLev < 5)
        return {
            redirect: {
                permanent: false,
                destination: '/',
            },
            props: {},
        }

    const { page, limit } = context.query

    const endpoint = process.env.NEXT_URL + '/api/admin/user/getUserList'

    const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({
            page: page ?? 1,
            limit: limit ?? 10,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const result = await response.json()

    if (result.error) {
        return { props: {} }
    }

    const users = JSON.parse(result.message.users)

    const acctSysCategories = await prisma.acctingsyscategory.findMany({
        select: {
            categoryId: true,
            categoryName: true,
        },
        orderBy: { orderNum: 'asc' },
    })

    const acctSysDepartments = (
        await (await fetch(process.env.NEXT_URL + '/api/council/getAcctingSysList')).json()
    ).message

    return {
        props: {
            users: users,
            count: result.message.count,
            acctSysCategories: acctSysCategories,
            acctSysDepartments: acctSysDepartments,
        },
    }
}
