import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/util/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    var department

    try {
        department = await prisma.acctingsyslist.findFirstOrThrow({
            where: {
                departmentId: req.body.departmentId,
            },
            select: {
                departmentId: true,
                departmentName: true,
                category: true,
            },
        })

        const result = await prisma.ledgerlist.findFirstOrThrow({
            where: {
                idx: parseInt(req.body.idx),
                department: req.body.departmentId,
            },
            select: {
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
            },
        })

        res.status(201).json({
            message: {
                departmentId: department?.departmentId,
                departmentName: department?.departmentName,
                category: department?.category,
                ledgers: result,
            },
            error: false,
        })
    } catch {
        if (department)
            res.status(201).json({
                message: {
                    departmentId: department?.departmentId,
                    departmentName: department?.departmentName,
                    category: department?.category,
                },
                error: false,
            })
        else res.status(422).json({ message: '오류 발생', error: true })
    }
}

export default handler
