import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/util/db'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body

    const { idx, state } = data

    const result = await prisma.ledgerlist.update({
        where: { idx: parseInt(idx) || 0 },
        data: {
            state: state,
        },
    })

    if (result) {
        res.status(201).json({
            message: '장부 상태 업데이트 완료',
            error: false,
        })
    } else {
        res.status(422).json({
            message: '장부 상태 업데이트 중 오류 발생',
            error: true,
        })
    }
}

export default handler
