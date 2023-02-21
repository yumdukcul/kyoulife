import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/util/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body

    const {
        department,
        docType,
        eventName,
        startDate,
        endDate,
        eventPlace,
        personnel,
        purpose,
        content,
        state,
        writer,
    } = data

    if (!writer) {
        res.status(422).json({
            message: '로그인 후 이용 가능합니다.',
            error: true,
        })
    }

    const result = await prisma.docslist.create({
        data: {
            department: department,
            docType: docType,
            eventName: eventName,
            startDate: new Date(startDate) ?? null,
            endDate: new Date(endDate) ?? null,
            eventPlace: eventPlace ?? '',
            personnel: personnel ?? '',
            purpose: purpose ?? '',
            content: content ?? '',
            state: state ?? '승인전',
            writer: writer,
        },
    })

    if (result) {
        res.status(201).json({ message: '발신문서 작성 완료', error: false })
    } else {
        res.status(422).json({
            message: '발신문서 작성 중 오류 발생',
            error: true,
        })
    }
}

export default handler
