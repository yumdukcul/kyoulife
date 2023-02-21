import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/util/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    var where = { department: req.body.departmentId }

    if (req.body.department) where = { ...where, [req.body.department]: req.body.department }

    if (req.body.sfl) where = { ...where, [req.body.sfl]: { contains: req.body.stx } }

    const result = await prisma.docslist.findMany({
        where: where,
        select: {
            idx: true,
            department: true,
            docType: true,
            eventName: true,
            state: true,
            datetime: true,
        },
        orderBy: { datetime: 'desc' },
    })

    const department = await prisma.acctingsyslist.findFirst({
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
                departmentId: department?.departmentId,
                departmentName: department?.departmentName,
                docs: result,
            },
            error: false,
        })
    } else {
        res.status(422).json({ message: '오류 발생', error: true })
    }
}

export default handler
