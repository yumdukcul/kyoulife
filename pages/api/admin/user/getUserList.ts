import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/util/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(422).json({ message: '오류 발생', error: true })
    }

    const limit = parseInt(req.body.limit)
    const page = parseInt(req.body.page) - 1

    const result = await prisma.user.findMany({
        select: {
            idx: true,
            username: true,
            name: true,
            studentId: true,
            nickname: true,
            asLev: true,
            asCat: true,
            asDep: true,
            regDate: true,
        },
        orderBy: [{ idx: 'desc' }],
        skip: page * limit,
        take: limit,
    })

    const count = await prisma.user.count()

    if (result) {
        res.status(201).json({
            message: {
                users: JSON.stringify(result),
                count: count,
            },
            error: false,
        })
    } else {
        res.status(422).json({ message: '오류 발생', error: true })
    }
}

export default handler
