import nextConnect from 'next-connect'
import multer from 'multer'
import dayjs from 'dayjs'
import multerS3 from 'multer-s3'
import AWS from 'aws-sdk'
import { S3Client } from '@aws-sdk/client-s3'

// 로컬 업로드

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/uploads')
//     },
//     filename: function (req, file, cb) {
//         file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
//         const nowDate = dayjs(Date.now()).format('YYMMDDHHmmss')
//         cb(null, `${nowDate}_${file.originalname}`)
//     },
// })

// S3 업로드

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2',
})

var storage = multerS3({
    s3: new S3Client({
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
        },
        region: 'ap-northeast-2',
    }),
    bucket: process.env.S3_BUCKET_NAME as string,
    key: function (req, file, cb) {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
        const nowDate = dayjs(Date.now()).format('YYMMDDHHmmss')
        cb(null, `${nowDate}_${file.originalname}`)
    },
})

const app = nextConnect({
    onError(error, req, res: any) {
        console.log(error.message)
        res.status(501).json({
            error: `Sorry something Happened! ${error.message}`,
        })
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
    },
})

var upload = multer({ storage: storage })
app.post(upload.array('file'), function (req: any, res) {
    res.json(req.files.map((v: any) => v.key))
})

export default app

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
}
