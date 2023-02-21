import dayjs from 'dayjs'
import { xml2json } from 'xml-js'

const serviceKey =
    'AynmGNglSFYe1pzvGJfIZNEXIgDv4ZO5mKf7cXeNxvcIXmTBCg7M1HQawYKsY1A1eBVwGGrNRK9UKv0Unewb7A=='

export async function isHoliday(date: Date) {
    const weekday = date.getDay()
    if (weekday == 0 || weekday == 6) return true

    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')

    const result = JSON.parse(
        xml2json(
            await (
                await fetch(
                    'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?' +
                        new URLSearchParams({
                            ServiceKey: serviceKey,
                            solYear: year.toString(),
                            solMonth: month.toString(),
                        })
                )
            ).text(),
            { compact: false, spaces: 4 }
        )
    )

    const dates = result.elements[0].elements[1].elements[0].elements

    const dateArr = []

    dates?.forEach((element: any) => {
        if (element.elements[3].elements[0].text == dayjs(date).format('YYYYMMDD')) return true
    })

    return false
}

export async function isDeadline(nowDate: Date, limitDate: Date, l: number) {
    var limit = l
    nowDate = new Date(dayjs(nowDate).format('YYYY-MM-DD'))
    if (l > 0) {
        limit -= 1

        for (var i = 0; i <= limit; i++) {
            const tempDate = addDays(limitDate, i)
            if (await isHoliday(tempDate)) limit++
        }
    } else {
        limit += 1

        for (var i = 0; i >= limit; i--) {
            const tempDate = addDays(limitDate, i)
            if (await isHoliday(tempDate)) limit--
        }
    }

    const tempDate = addDays(limitDate, limit)

    console.log(nowDate)
    console.log(tempDate)

    if (nowDate > tempDate) return true
    return false
}

function addDays(date: Date, days: number) {
    const clone = new Date(date)
    clone.setDate(date.getDate() + days)
    return clone
}
