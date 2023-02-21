import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { prisma } from '@/util/db'

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: '아이디',
                    type: 'text',
                    placeholder: '아이디를 입력하세요.',
                },
                password: {
                    label: '비밀번호',
                    type: 'password',
                    placeholder: '비밀번호를 입력하세요.',
                },
            },

            async authorize(credentials, req) {
                if (!credentials) throw new Error('잘못된 입력값으로 인한 오류가 발생했습니다.')

                const { username, password } = credentials

                const exUser = await prisma.user.findUnique({
                    where: { username },
                    select: {
                        idx: true,
                        username: true,
                        password: true,
                        name: true,
                        nickname: true,
                        email: true,
                        asLev: true,
                        asCat: true,
                        asDep: true,
                    },
                })
                if (!exUser) throw new Error('존재하지 않는 아이디입니다.')

                const result = await compare(password, exUser.password ?? '')
                if (!result) throw new Error('비밀번호가 일치하지 않습니다.')

                return {
                    id: exUser.idx.toString(),
                    username: exUser.username,
                    name: exUser.username,
                    nickname: exUser.nickname ?? '',
                    email: exUser.email ?? '',
                    asLev: exUser.asLev ?? 0,
                    asCat: exUser.asCat ?? '',
                    asDep: exUser.asDep ?? '',
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token }) {
            return token
        },
        async session({ session }) {
            const exUser = await prisma.user.findUnique({
                where: { username: session.user?.name },
                select: {
                    idx: true,
                    username: true,
                    name: true,
                    nickname: true,
                    email: true,
                    asLev: true,
                    asCat: true,
                    asDep: true,
                },
            })

            session.user = {
                id: exUser?.idx.toString() ?? '',
                username: exUser?.username ?? '',
                name: exUser?.name ?? '',
                nickname: exUser?.nickname ?? '',
                email: exUser?.email ?? '',
                asLev: exUser?.asLev ?? 0,
                asCat: exUser?.asCat ?? '',
                asDep: exUser?.asDep ?? '',
            }

            return session
        },
    },
    session: {
        maxAge: 10 * 60 * 60,
    },
    secret: process.env.SECRET,
})
