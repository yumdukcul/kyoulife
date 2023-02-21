// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { isDeadline, isHoliday } from '@/util/functions'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(await isDeadline(new Date('2023-02-13'), new Date('2023-02-03'), 7))

    res.status(200).json({ message: `z` })
}
