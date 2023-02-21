import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/util/db'
import { isDeadline } from '@/util/functions'

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body

    const {
        idx,
        department,
        txDate,
        eventName,
        txCategory,
        receiptNum,
        bankbook,
        amount,
        paymentMethod,
        receiptDetails,
        note,
        writer,
    } = data

    if (!writer) {
        res.status(422).json({
            message: '로그인 후 이용 가능합니다.',
            error: true,
        })
    }

    var state = ''

    if (await isDeadline(new Date(), new Date(txDate), 7)) state = '기한미준수'

    const result = await prisma.ledgerlist.upsert({
        where: { idx: parseInt(idx) || 0 },
        update: {
            txDate: new Date(txDate),
            eventName: eventName,
            txCategory: txCategory,
            receiptNum: receiptNum,
            bankbook: bankbook,
            amount: parseInt(amount),
            paymentMethod: paymentMethod ?? '',
            receiptDetails: receiptDetails ?? '',
            note: note,
            state: state,
            modifyDate: new Date(),
        },
        create: {
            department: department,
            txDate: new Date(txDate),
            eventName: eventName,
            txCategory: txCategory,
            receiptNum: receiptNum,
            bankbook: bankbook,
            amount: parseInt(amount),
            paymentMethod: paymentMethod ?? '',
            receiptDetails: receiptDetails ?? '',
            note: note,
            state: state,
            writer: writer,
        },
    })

    if (result) {
        res.status(201).json({ message: '장부 작성 완료', error: false })
    } else {
        res.status(422).json({ message: '장부작성 중 오류 발생', error: true })
    }
}

export default handler
