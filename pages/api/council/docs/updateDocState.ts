import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/util/db'
import { isDeadline } from '@/util/functions'
import dayjs from 'dayjs'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body

    const { idx, state, manager } = data

    if (!manager) {
        res.status(422).json({
            message: '로그인 후 이용 가능합니다.',
            error: true,
        })
    }

    var state_ = state

    const doc = await prisma.docslist.findUnique({
        where: { idx: idx },
        select: {
            docType: true,
            datetime: true,
            startDate: true,
            endDate: true,
        },
    })

    if (!doc) res.status(422).json({ message: '발신문서 상태 업데이트 중 오류 발생' })
    else if (state == '승인') {
        if (doc.docType == '기획안' || doc.docType == '예산안') {
            if (doc.datetime >= new Date(dayjs(doc.startDate).format('YYYY-MM-DD 00:00:00')))
                state_ = '미제출'
            else if (await isDeadline(doc.datetime, doc.startDate, -4)) state_ = '기한미준수'
        } else if (doc.docType == '결산안' || doc.docType == '결과보고서') {
            if (await isDeadline(doc.datetime, doc.endDate, 7)) state_ = '기한미준수'
        }
    }

    const result = await prisma.docslist.update({
        where: { idx: parseInt(idx) || 0 },
        data: {
            state: state_,
            submitDate: new Date(),
            manager: manager,
        },
    })

    if (result) {
        res.status(201).json({
            message: '발신문서 상태 업데이트 완료',
            error: false,
        })
    } else {
        res.status(422).json({
            message: '발신문서 상태 업데이트 중 오류 발생',
            error: true,
        })
    }
}

export default handler
