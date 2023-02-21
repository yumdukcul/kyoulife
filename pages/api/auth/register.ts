import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/util/db'
import { hash } from 'bcryptjs'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return
    }

    const data = req.body

    const { username, password, name, email, nickname } = data

    if (!name || !email || !email.includes('@') || !password || password.trim().length < 7) {
        res.status(422).json({
            message: 'password should also be at least 7 characters long.',
            error: true,
        })
        return
    }

    if (
        await prisma.user.findUnique({
            where: { username: username },
        })
    ) {
        res.status(422).json({
            message: '이미 존재하는 아이디입니다.',
            error: true,
        })
        return
    }

    if (
        await prisma.user.findUnique({
            where: { nickname: nickname },
        })
    ) {
        res.status(422).json({
            message: '이미 존재하는 닉네임입니다.',
            error: true,
        })
        return
    }

    const hashedPassword = await hash(password, 10)

    const result = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword,
            name: name,
            email: email,
            nickname: nickname,
        },
    })

    if (result) {
        res.status(201).json({ message: '회원가입 완료', error: false })
    } else {
        res.status(422).json({ message: '회원가입 중 오류 발생', error: true })
    }
}

export default handler
