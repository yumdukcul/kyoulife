import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/util/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(422).json({ message: '오류 발생', error: true })
    }

    const result = await prisma.user.findUnique({
        where: { username: req.body.username },
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
    })

    if (result) {
        res.status(201).json({
            message: {
                user: JSON.stringify(result),
            },
            error: false,
        })
    } else {
        res.status(422).json({ message: '오류 발생', error: true })
    }
}

export default handler
