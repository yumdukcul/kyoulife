import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/util/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(422).json({ message: '오류 발생', error: true })
    }

    const result = await prisma.user.update({
        where: { username: req.body.username },
        data: {
            asLev: req.body.asLev,
            asCat: req.body.asCat,
            asDep: req.body.asDep,
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
