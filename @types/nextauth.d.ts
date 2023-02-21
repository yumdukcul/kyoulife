import 'next-auth'

declare module 'next-auth' {
    interface User {
        id: string
        username: string
        name: string
        nickname: string
        email: string
        asLev: number
        asCat: string
        asDep: string
    }

    interface Session {
        user: User
    }
}
