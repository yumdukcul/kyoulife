import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/util/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    var where = {
        department: req.body.departmentId,
    }

    if (req.body.sfl) where = { ...where, [req.body.sfl]: { contains: req.body.stx } }

    const result = await prisma.ledgerlist.findMany({
        where: where,
        select: {
            idx: true,
            department: true,
            txDate: true,
            eventName: true,
            txCategory: true,
            receiptNum: true,
            bankbook: true,
            amount: true,
            paymentMethod: true,
            receiptDetails: true,
            note: true,
            state: true,
            datetime: true,
            writer: true,
            modifyDate: true,
            user: { select: { name: true } },
        },
        orderBy: [{ txDate: 'desc' }, { datetime: 'desc' }],
    })

    const department = await prisma.acctingsyslist.findFirst({
        where: {
            departmentId: req.body.departmentId,
        },
        select: {
            departmentId: true,
            departmentName: true,
            category: true,
        },
    })

    if (result) {
        res.status(201).json({
            message: {
                departmentId: department?.departmentId,
                departmentName: department?.departmentName,
                category: department?.category,
                ledgers: result,
            },
            error: false,
        })
    } else {
        res.status(422).json({ message: '오류 발생', error: true })
    }
}

export default handler
