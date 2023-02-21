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

        const result = await prisma.docslist.findFirstOrThrow({
            where: {
                idx: parseInt(req.body.idx),
                department: req.body.departmentId,
            },
            select: {
                idx: true,
                department: true,
                docType: true,
                eventName: true,
                startDate: true,
                endDate: true,
                eventPlace: true,
                personnel: true,
                purpose: true,
                content: true,
                state: true,
                datetime: true,
                writer: true,
                submitDate: true,
                manager: true,
                user_docslist_writerTouser: { select: { name: true } },
                user_docslist_managerTouser: { select: { name: true } },
            },
        })

        res.status(201).json({
            message: {
                departmentId: department?.departmentId,
                departmentName: department?.departmentName,
                category: department.category,
                docs: result,
            },
            error: false,
        })
    } catch {
        if (department)
            res.status(201).json({
                message: {
                    departmentId: department?.departmentId,
                    departmentName: department?.departmentName,
                    category: department.category,
                },
                error: false,
            })
        else res.status(422).json({ message: '오류 발생', error: true })
    }
}

export default handler
