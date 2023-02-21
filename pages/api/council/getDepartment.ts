import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/util/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const result = await prisma.acctingsyslist.findFirst({
        where: {
            departmentId: req.body.departmentId,
        },
        select: {
            departmentId: true,
            departmentName: true,
        },
    })

    if (result) {
        res.status(201).json({
            message: {
                result,
            },
            error: false,
        })
    } else {
        res.status(422).json({ message: '오류 발생', error: true })
    }
}

export default handler
