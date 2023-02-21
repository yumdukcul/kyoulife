import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/util/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const result = await prisma.acctingsyslist.findMany({
        where: {
            category: req.query.categoryId?.toString(),
        },
        select: {
            departmentId: true,
            departmentName: true,
            category: true,
        },
        orderBy: { orderNum: 'asc' },
    })

    if (result) {
        res.status(201).json({ message: result, error: false })
    } else {
        res.status(422).json({ message: '오류 발생', error: true })
    }
}

export default handler
