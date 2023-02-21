import Head from 'next/head'
import styles from '@/styles/council/Council.module.css'
import SideBar from '@/components/SideBar'
import Header from '@/components/Header'
import {
    MinusIcon,
    PencilSquareIcon,
    PlusIcon,
    PrinterIcon,
    XMarkIcon,
} from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import Dropzone, { useDropzone } from 'react-dropzone'
import { getSession, useSession } from 'next-auth/react'

type Props = {
    result: {
        departmentId: string
        departmentName: string
    }
}

type Income = {
    content: string
    receipts: Receipt[]
}

type Spend = {
    content: string
    place: string
    receipts: Receipt[]
}

type Receipt = {
    orderNum: number
    receiptCategory: string
    item: string
    quantity: number
    price: number
}

export default function Council(props: Props) {
    const { data: session, status } = useSession()

    const [docType, setDocType] = useState('기획안')
    const [incomeAmount, setIncomeAmount] = useState(0)
    const [incomeDetails, setIncomeDetails] = useState<Income[]>([])
    const [spendAmount, setSpendAmount] = useState(0)
    const [spendDetails, setSpendDetails] = useState<Spend[]>([])
    const [eventImage, setEventImage] = useState<File[]>([])
    const [itemImage, setItemImage] = useState<File[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isEventLoading, setIsEventLoading] = useState(false)
    const [isItemLoading, setIsItemLoading] = useState(false)
    const router = useRouter()

    const onEventImageDrop = useCallback(
        (acceptedFiles: any) => {
            if (eventImage.length + acceptedFiles.length > 4)
                alert('행사사진은 최대 4장까지 업로드 가능합니다.')
            else {
                var arr = eventImage
                acceptedFiles.map((file: File) => arr.push(file))

                setEventImage(arr)
            }
        },
        [eventImage]
    )

    const onItemImageDrop = useCallback(
        (acceptedFiles: any) => {
            var arr = itemImage
            acceptedFiles.map((file: File) => arr.push(file))

            setItemImage(arr)
        },
        [itemImage]
    )

    const {
        getRootProps: getEventImageRootProps,
        getInputProps: getEventImageInputProps,
        isDragActive: isEventImageDragActive,
    } = useDropzone({
        onDrop: onEventImageDrop,
        accept: { 'image/jpeg': [], 'image/png': [] },
    })

    const {
        getRootProps: getItemImageRootProps,
        getInputProps: getItemImageInputProps,
        isDragActive: isItemImageDragActive,
    } = useDropzone({
        onDrop: onItemImageDrop,
        accept: { 'image/jpeg': [], 'image/png': [] },
    })

    function addIncomeReceipt() {
        setIncomeDetails([
            ...incomeDetails,
            {
                content: '',
                receipts: [],
            },
        ])
    }

    function addIncomeField(i: number) {
        setIncomeDetails(
            incomeDetails.map((e, _i) =>
                _i == i
                    ? {
                          ...e,
                          receipts: [
                              ...e.receipts,
                              {
                                  orderNum: 0,
                                  receiptCategory: '',
                                  item: '',
                                  quantity: 0,
                                  price: 0,
                              },
                          ],
                      }
                    : e
            )
        )
    }

    function removeIncomeReceipt(i: number) {
        setIncomeDetails(incomeDetails.filter((r, _i) => _i !== i))
    }

    function removeIncomeField(i: number, j: number) {
        setIncomeDetails(
            incomeDetails.map((e, _i) =>
                _i == i
                    ? {
                          ...e,
                          receipts: e.receipts.filter((_e, _j) => _j !== j),
                      }
                    : e
            )
        )
    }

    function addSpendReceipt() {
        setSpendDetails([
            ...spendDetails,
            {
                content: '',
                place: '',
                receipts: [],
            },
        ])
    }

    function addSpendField(i: number) {
        setSpendDetails(
            spendDetails.map((e, _i) =>
                _i == i
                    ? {
                          ...e,
                          receipts: [
                              ...e.receipts,
                              {
                                  orderNum: 0,
                                  receiptCategory: '',
                                  item: '',
                                  quantity: 0,
                                  price: 0,
                              },
                          ],
                      }
                    : e
            )
        )
    }

    function removeSpendReceipt(i: number) {
        setSpendDetails(spendDetails.filter((r, _i) => _i !== i))
    }

    function removeSpendField(i: number, j: number) {
        setSpendDetails(
            spendDetails.map((e, _i) =>
                _i == i
                    ? {
                          ...e,
                          receipts: e.receipts.filter((_e, _j) => _j !== j),
                      }
                    : e
            )
        )
    }

    async function handleSubmit(e: any) {
        e.preventDefault()
        if (isLoading) return

        if (e.target.endDate.value < e.target.startDate.value)
            return alert('종료일자가 시작일자보다 빠를 수 없습니다.')

        var docs: any = {
            department: props.result.departmentId,
            docType: e.target.docType.value,
            eventName: e.target.eventName.value,
            startDate: e.target.startDate.value,
            endDate: e.target.endDate.value,
            writer: session?.user.username,
        }

        if (e.target.docType.value == '기획안' || e.target.docType.value == '결과보고서')
            docs = {
                ...docs,
                eventPlace: e.target.eventPlace.value,
                personnel: e.target.personnel.value,
            }

        if (e.target.docType.value == '기획안') docs = { ...docs, purpose: e.target.purpose.value }

        if (e.target.docType.value == '결과보고서') {
            if (eventImage.length < 1) return alert('행사사진을 업로드하지 않았습니다.')

            var eventImageData = new FormData()
            eventImage.map(file => {
                eventImageData.append('file', file)
            })

            setIsLoading(true)
            setIsEventLoading(true)
            const eventImg = await (
                await fetch('/api/util/upload', {
                    method: 'POST',
                    body: eventImageData,
                })
            ).json()
            setIsEventLoading(false)

            var itemImageData = new FormData()
            itemImage.map(file => {
                itemImageData.append('file', file)
            })

            setIsLoading(true)
            setIsItemLoading(true)
            const itemImg = await (
                await fetch('/api/util/upload', {
                    method: 'POST',
                    body: itemImageData,
                })
            ).json()
            setIsItemLoading(false)

            docs = {
                ...docs,
                content: JSON.stringify({
                    eventImage: eventImg,
                    itemImage: itemImg,
                }),
            }
        }
        if (e.target.docType.value == '예산안' || e.target.docType.value == '결산안') {
            if (incomeDetails.length < 1) return alert('수입내역을 입력하지 않았습니다.')
            else {
                var result = true
                incomeDetails.map(r => {
                    if (r.receipts.length < 1) {
                        result = false
                    }
                })
                if (!result) return alert('상세내역이 작성되지 않은 수입내역이 있습니다.')
            }

            if (spendDetails.length < 1) return alert('지출내역을 입력하지 않았습니다.')
            else {
                var result = true
                spendDetails.map(r => {
                    if (r.receipts.length < 1) {
                        result = false
                    }
                })
                if (!result) return alert('상세내역이 작성되지 않은 지출내역이 있습니다.')
            }

            var incomeAmount = 0
            var sendAmount = 0

            var income = {
                total: incomeAmount,
                incomeDetails: incomeDetails.map(r => {
                    var total = 0

                    r.receipts.map(_r => {
                        if (_r.receiptCategory == '할인') total -= _r.price * _r.quantity
                        else total += _r.price * _r.quantity

                        return { ..._r, total: _r.price * _r.quantity }
                    })

                    incomeAmount += total

                    return { ...r, total: total }
                }),
            }

            var spend = {
                total: sendAmount,
                spendDetails: spendDetails.map(r => {
                    var total = 0

                    r.receipts.map(_r => {
                        if (_r.receiptCategory == '할인') total -= _r.price * _r.quantity
                        else total += _r.price * _r.quantity

                        return { ..._r, total: _r.price * _r.quantity }
                    })

                    sendAmount += total

                    return { ...r, total: total }
                }),
            }

            docs = {
                ...docs,
                content: JSON.stringify({ income: income, spend: spend }),
            }
        }

        try {
            setIsLoading(true)
            const response = await fetch('/api/council/docs/insertDocs', {
                method: 'POST',
                body: JSON.stringify(docs),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!')
            }
        } catch (e) {
            setIsLoading(false)
            return alert(e)
        }

        router.push(`/council/docs?id=${props.result.departmentId}`)
    }

    const ComponentType1: JSX.Element = (
        <>
            <div className="input-line">
                <input
                    type="text"
                    name="eventPlace"
                    id="eventPlace"
                    placeholder=" "
                    required
                    maxLength={50}
                />
                <label>행사장소</label>
            </div>
            <div className="input-line">
                <input
                    type="text"
                    name="personnel"
                    id="personnel"
                    placeholder=" "
                    required
                    maxLength={50}
                />
                <label>대상인원</label>
            </div>
        </>
    )

    useEffect(() => {
        setIncomeAmount(
            incomeDetails.reduce(function add(sum, r) {
                var val = r.receipts.reduce(function add(sum, r) {
                    return sum + r.quantity * r.price
                }, 0)
                return sum + val
            }, 0)
        )
    }, [incomeDetails])

    useEffect(() => {
        setSpendAmount(
            spendDetails.reduce(function add(sum, r) {
                var val = r.receipts.reduce(function add(sum, r) {
                    if (r.receiptCategory == '할인') return sum - r.quantity * r.price
                    return sum + r.quantity * r.price
                }, 0)
                return sum + val
            }, 0)
        )
    }, [spendDetails])

    const ComponentType2: JSX.Element = (
        <>
            <div className={styles.input_fields}>
                <div className="input-line">
                    <input
                        type="text"
                        name="income"
                        id="income"
                        value={incomeAmount.toLocaleString()}
                        placeholder=" "
                        required
                    />
                    <label>수입합계</label>
                </div>
                <div className="input-line">
                    <input
                        type="text"
                        name="spend"
                        id="spend"
                        value={spendAmount.toLocaleString()}
                        placeholder=" "
                        required
                    />
                    <label>지출합계</label>
                </div>
            </div>
            <div className={styles.dynamic_fields}>
                <h3>수입내역</h3>
                {incomeDetails.map((receipt, receiptIdx) => (
                    <div key={receiptIdx} className={styles.receipt_container}>
                        <div className={`box ${styles.receipt_out_wrapper}`}>
                            <div className={styles.dynamic_fields}>
                                <div className={styles.input_fields}>
                                    <div className="input-line">
                                        <input
                                            type="text"
                                            name="incomeContent"
                                            id="incomeContent"
                                            value={receipt.content}
                                            onChange={e =>
                                                setIncomeDetails(
                                                    incomeDetails.map((_e, _i) =>
                                                        _i == receiptIdx
                                                            ? {
                                                                  ..._e,
                                                                  content: e.target.value,
                                                              }
                                                            : _e
                                                    )
                                                )
                                            }
                                            placeholder=" "
                                            required
                                        />
                                        <label>내용</label>
                                    </div>
                                    <div className="input-line">
                                        <input
                                            type="text"
                                            name="incomeAmount"
                                            id="incomeAmount"
                                            value={receipt.receipts
                                                .reduce(function add(sum, r) {
                                                    return sum + r.quantity * r.price
                                                }, 0)
                                                .toLocaleString()}
                                            placeholder=" "
                                            readOnly
                                        />
                                        <label>수입총액</label>
                                    </div>
                                </div>
                                {receipt.receipts.map((field, fieldIdx) => (
                                    <div key={fieldIdx} className={styles.receipt_container}>
                                        <div
                                            className={`${styles.receipt_wrapper} ${styles.inner_wrapper}`}
                                        >
                                            <div className="input-line">
                                                <input
                                                    type="text"
                                                    name={`item${fieldIdx}`}
                                                    id={`item${receiptIdx}${fieldIdx}`}
                                                    value={field.item}
                                                    onChange={e =>
                                                        setIncomeDetails(
                                                            incomeDetails.map((_e, _i) =>
                                                                _i == receiptIdx
                                                                    ? {
                                                                          ..._e,
                                                                          receipts: _e.receipts.map(
                                                                              (__e, __i) =>
                                                                                  __i == fieldIdx
                                                                                      ? {
                                                                                            ...__e,
                                                                                            item: e
                                                                                                .target
                                                                                                .value,
                                                                                        }
                                                                                      : __e
                                                                          ),
                                                                      }
                                                                    : _e
                                                            )
                                                        )
                                                    }
                                                    placeholder=" "
                                                    required
                                                />
                                                <label>품목</label>
                                            </div>
                                            <div className="input-line">
                                                <input
                                                    type="text"
                                                    name={`quantity${receiptIdx}${fieldIdx}`}
                                                    id={`quantity${receiptIdx}${fieldIdx}`}
                                                    value={field.quantity.toLocaleString()}
                                                    onChange={e =>
                                                        setIncomeDetails(
                                                            incomeDetails.map((_e, _i) =>
                                                                _i == receiptIdx
                                                                    ? {
                                                                          ..._e,
                                                                          receipts: _e.receipts.map(
                                                                              (__e, __i) =>
                                                                                  __i == fieldIdx
                                                                                      ? {
                                                                                            ...__e,
                                                                                            quantity:
                                                                                                parseInt(
                                                                                                    e.target.value.replaceAll(
                                                                                                        ',',
                                                                                                        ''
                                                                                                    )
                                                                                                ) ||
                                                                                                0,
                                                                                        }
                                                                                      : __e
                                                                          ),
                                                                      }
                                                                    : _e
                                                            )
                                                        )
                                                    }
                                                    placeholder=" "
                                                    required
                                                    min={0}
                                                />
                                                <label>수량</label>
                                            </div>
                                            <div className="input-line">
                                                <input
                                                    type="text"
                                                    name={`price${receiptIdx}${fieldIdx}`}
                                                    id={`price${receiptIdx}${fieldIdx}`}
                                                    value={field.price.toLocaleString()}
                                                    onChange={e =>
                                                        setIncomeDetails(
                                                            incomeDetails.map((_e, _i) =>
                                                                _i == receiptIdx
                                                                    ? {
                                                                          ..._e,
                                                                          receipts: _e.receipts.map(
                                                                              (__e, __i) =>
                                                                                  __i == fieldIdx
                                                                                      ? {
                                                                                            ...__e,
                                                                                            price:
                                                                                                parseInt(
                                                                                                    e.target.value.replaceAll(
                                                                                                        ',',
                                                                                                        ''
                                                                                                    )
                                                                                                ) ||
                                                                                                0,
                                                                                        }
                                                                                      : __e
                                                                          ),
                                                                      }
                                                                    : _e
                                                            )
                                                        )
                                                    }
                                                    placeholder=" "
                                                    required
                                                    min={0}
                                                />
                                                <label>단가</label>
                                            </div>
                                            <div className="input-line">
                                                <input
                                                    type="text"
                                                    name={`total${receiptIdx}${fieldIdx}`}
                                                    id={`total${receiptIdx}${fieldIdx}`}
                                                    value={(
                                                        field.price * field.quantity
                                                    ).toLocaleString()}
                                                    placeholder=" "
                                                    readOnly
                                                    required
                                                    min={0}
                                                />
                                                <label>총액</label>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className={`red ${styles.remove_button}`}
                                            onClick={() => removeIncomeField(receiptIdx, fieldIdx)}
                                        >
                                            <MinusIcon />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    className={`primary ${styles.add_button}`}
                                    onClick={() => addIncomeField(receiptIdx)}
                                >
                                    <PlusIcon />
                                </button>
                            </div>
                        </div>
                        <button
                            type="button"
                            className={`red ${styles.remove_button}`}
                            onClick={() => removeIncomeReceipt(receiptIdx)}
                        >
                            <MinusIcon />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className={`primary ${styles.add_button}`}
                    onClick={() => addIncomeReceipt()}
                >
                    <PlusIcon />
                </button>
            </div>
            <div className={styles.dynamic_fields}>
                <h3>지출내역</h3>
                {spendDetails.map((receipt, receiptIdx) => (
                    <div key={receiptIdx} className={styles.receipt_container}>
                        <div className={`box ${styles.receipt_out_wrapper}`}>
                            <div className={styles.dynamic_fields}>
                                <div className={styles.input_fields}>
                                    <div className="input-line">
                                        <input
                                            type="text"
                                            name="spendPlace"
                                            id="spendPlace"
                                            value={receipt.place}
                                            onChange={e =>
                                                setSpendDetails(
                                                    spendDetails.map((_e, _i) =>
                                                        _i == receiptIdx
                                                            ? {
                                                                  ..._e,
                                                                  place: e.target.value,
                                                              }
                                                            : _e
                                                    )
                                                )
                                            }
                                            placeholder=" "
                                            required
                                        />
                                        <label>구매처</label>
                                    </div>
                                    <div className="input-line">
                                        <input
                                            type="text"
                                            name="spendAmount"
                                            id="spendAmount"
                                            value={receipt.receipts
                                                .reduce(function add(sum, r) {
                                                    if (r.receiptCategory == '할인')
                                                        return sum - r.quantity * r.price
                                                    return sum + r.quantity * r.price
                                                }, 0)
                                                .toLocaleString()}
                                            placeholder=" "
                                            readOnly
                                        />
                                        <label>지출총액</label>
                                    </div>
                                    <div className="input-line">
                                        <input
                                            type="text"
                                            name="spendContent"
                                            id="spendContent"
                                            value={receipt.content}
                                            onChange={e =>
                                                setSpendDetails(
                                                    spendDetails.map((_e, _i) =>
                                                        _i == receiptIdx
                                                            ? {
                                                                  ..._e,
                                                                  content: e.target.value,
                                                              }
                                                            : _e
                                                    )
                                                )
                                            }
                                            placeholder=" "
                                            required
                                        />
                                        <label>내용</label>
                                    </div>
                                </div>
                                {receipt.receipts.map((field, fieldIdx) => (
                                    <div key={fieldIdx} className={styles.receipt_container}>
                                        <div
                                            className={`${styles.receipt_wrapper} ${styles.inner_wrapper}`}
                                        >
                                            <div className="input-line">
                                                <select
                                                    name={`receiptCategory${receiptIdx}${fieldIdx}`}
                                                    id={`receiptCategory${receiptIdx}${fieldIdx}`}
                                                    value={field.receiptCategory}
                                                    onChange={e =>
                                                        setSpendDetails(
                                                            spendDetails.map((_e, _i) =>
                                                                _i == receiptIdx
                                                                    ? {
                                                                          ..._e,
                                                                          receipts: _e.receipts.map(
                                                                              (__e, __i) =>
                                                                                  __i == fieldIdx
                                                                                      ? {
                                                                                            ...__e,
                                                                                            receiptCategory:
                                                                                                e
                                                                                                    .target
                                                                                                    .value,
                                                                                        }
                                                                                      : __e
                                                                          ),
                                                                      }
                                                                    : _e
                                                            )
                                                        )
                                                    }
                                                    required
                                                >
                                                    <option value="일반">일반</option>
                                                    <option value="할인">할인</option>
                                                    <option value="수수료">수수료</option>
                                                </select>
                                                <label>영수종류</label>
                                            </div>
                                            <div className="input-line">
                                                <input
                                                    type="text"
                                                    name={`item${fieldIdx}`}
                                                    id={`item${receiptIdx}${fieldIdx}`}
                                                    value={field.item}
                                                    onChange={e =>
                                                        setSpendDetails(
                                                            spendDetails.map((_e, _i) =>
                                                                _i == receiptIdx
                                                                    ? {
                                                                          ..._e,
                                                                          receipts: _e.receipts.map(
                                                                              (__e, __i) =>
                                                                                  __i == fieldIdx
                                                                                      ? {
                                                                                            ...__e,
                                                                                            item: e
                                                                                                .target
                                                                                                .value,
                                                                                        }
                                                                                      : __e
                                                                          ),
                                                                      }
                                                                    : _e
                                                            )
                                                        )
                                                    }
                                                    placeholder=" "
                                                    required
                                                />
                                                <label>품목</label>
                                            </div>
                                            <div className="input-line">
                                                <input
                                                    type="text"
                                                    name={`quantity${receiptIdx}${fieldIdx}`}
                                                    id={`quantity${receiptIdx}${fieldIdx}`}
                                                    value={field.quantity.toLocaleString()}
                                                    onChange={e =>
                                                        setSpendDetails(
                                                            spendDetails.map((_e, _i) =>
                                                                _i == receiptIdx
                                                                    ? {
                                                                          ..._e,
                                                                          receipts: _e.receipts.map(
                                                                              (__e, __i) =>
                                                                                  __i == fieldIdx
                                                                                      ? {
                                                                                            ...__e,
                                                                                            quantity:
                                                                                                parseInt(
                                                                                                    e.target.value.replaceAll(
                                                                                                        ',',
                                                                                                        ''
                                                                                                    )
                                                                                                ) ||
                                                                                                0,
                                                                                        }
                                                                                      : __e
                                                                          ),
                                                                      }
                                                                    : _e
                                                            )
                                                        )
                                                    }
                                                    placeholder=" "
                                                    required
                                                    min={0}
                                                />
                                                <label>수량</label>
                                            </div>
                                            <div className="input-line">
                                                <input
                                                    type="text"
                                                    name={`price${receiptIdx}${fieldIdx}`}
                                                    id={`price${receiptIdx}${fieldIdx}`}
                                                    value={field.price.toLocaleString()}
                                                    onChange={e =>
                                                        setSpendDetails(
                                                            spendDetails.map((_e, _i) =>
                                                                _i == receiptIdx
                                                                    ? {
                                                                          ..._e,
                                                                          receipts: _e.receipts.map(
                                                                              (__e, __i) =>
                                                                                  __i == fieldIdx
                                                                                      ? {
                                                                                            ...__e,
                                                                                            price:
                                                                                                parseInt(
                                                                                                    e.target.value.replaceAll(
                                                                                                        ',',
                                                                                                        ''
                                                                                                    )
                                                                                                ) ||
                                                                                                0,
                                                                                        }
                                                                                      : __e
                                                                          ),
                                                                      }
                                                                    : _e
                                                            )
                                                        )
                                                    }
                                                    placeholder=" "
                                                    required
                                                    min={0}
                                                />
                                                <label>단가</label>
                                            </div>
                                            <div className="input-line">
                                                <input
                                                    type="text"
                                                    name={`total${receiptIdx}${fieldIdx}`}
                                                    id={`total${receiptIdx}${fieldIdx}`}
                                                    value={(
                                                        field.price * field.quantity
                                                    ).toLocaleString()}
                                                    placeholder=" "
                                                    readOnly
                                                    required
                                                    min={0}
                                                />
                                                <label>총액</label>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className={`red ${styles.remove_button}`}
                                            onClick={() => removeSpendField(receiptIdx, fieldIdx)}
                                        >
                                            <MinusIcon />
                                        </button>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    className={`primary ${styles.add_button}`}
                                    onClick={() => addSpendField(receiptIdx)}
                                >
                                    <PlusIcon />
                                </button>
                            </div>
                        </div>
                        <button
                            type="button"
                            className={`red ${styles.remove_button}`}
                            onClick={() => removeSpendReceipt(receiptIdx)}
                        >
                            <MinusIcon />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    className={`primary ${styles.add_button}`}
                    onClick={() => addSpendReceipt()}
                >
                    <PlusIcon />
                </button>
            </div>
        </>
    )

    return (
        <>
            <Head>
                <title>{`${props.result.departmentName} 발신문서 작성 - K-you Life`}</title>
                <meta
                    name="description"
                    content={`${props.result.departmentName} 발신문서 작성 - K-you Life`}
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <SideBar />
            <main className={styles.main}>
                <Header />
                <div className={styles.container}>
                    <div className={styles.docs_header}>
                        <div className={styles.docs_title}>
                            <h3>{props.result.departmentName}</h3>
                            <div className={styles.button_wrapper}>
                                <button
                                    type="button"
                                    className={`grey`}
                                    onClick={() =>
                                        router.push(
                                            '/council/ledger?id=' + props.result.departmentId
                                        )
                                    }
                                >
                                    전자장부
                                </button>
                                <button type="button" className={`primary`}>
                                    발신문서
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.council_container}>
                        <div className={`box ${styles.write_content}`}>
                            <h3>발신문서 작성({docType})</h3>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.input_fields}>
                                    <div className="input-line">
                                        <select
                                            name="docType"
                                            id="docType"
                                            value={docType}
                                            onChange={e => setDocType(e.target.value)}
                                            required
                                        >
                                            <option value="기획안">기획안</option>
                                            <option value="예산안">예산안</option>
                                            <option value="결산안">결산안</option>
                                            <option value="결과보고서">결과보고서</option>
                                        </select>
                                        <label>문서분류</label>
                                    </div>
                                    <div className="input-line">
                                        <input
                                            type="text"
                                            name="eventName"
                                            id="eventName"
                                            placeholder=" "
                                            required
                                            maxLength={30}
                                        />
                                        <label>행사명</label>
                                    </div>
                                    <div className="input-line">
                                        <input
                                            type="date"
                                            name="startDate"
                                            id="startDate"
                                            placeholder=" "
                                            max="9999-12-31"
                                            required
                                        />
                                        <label>시작일자</label>
                                    </div>
                                    <div className="input-line">
                                        <input
                                            type="date"
                                            name="endDate"
                                            id="endDate"
                                            placeholder=" "
                                            max="9999-12-31"
                                            required
                                        />
                                        <label>종료일자</label>
                                    </div>
                                    {(docType == '기획안' || docType == '결과보고서') &&
                                        ComponentType1}
                                </div>
                                {docType == '기획안' && (
                                    <div className={`box ${styles.textarea_wrapper}`}>
                                        <label htmlFor="purpose">목적 및 취지</label>
                                        <textarea
                                            name="purpose"
                                            id="purpose"
                                            required
                                            maxLength={400}
                                        />
                                    </div>
                                )}
                                {docType == '결과보고서' && (
                                    <>
                                        <label className={styles.file_subj}>행사사진</label>
                                        <div
                                            className={`box ${styles.file_wrapper}`}
                                            {...getEventImageRootProps()}
                                        >
                                            <input {...getEventImageInputProps()} />
                                            {isEventImageDragActive && (
                                                <div className={styles.isActive}>
                                                    <PlusIcon />
                                                </div>
                                            )}
                                            <div className={styles.file_container}>
                                                <div className={styles.file_area}>
                                                    {isEventLoading ? (
                                                        '사진 업로드 중...'
                                                    ) : (
                                                        <>
                                                            사진을 업로드하세요
                                                            <span>Drag & Drop</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            {eventImage.map((e, i) => (
                                                <div key={i} className={styles.item}>
                                                    <XMarkIcon
                                                        onClick={e => {
                                                            e.stopPropagation()
                                                            setEventImage(
                                                                eventImage.filter(
                                                                    (_e, _i) => _i !== i
                                                                )
                                                            )
                                                        }}
                                                    />
                                                    {e.name}
                                                </div>
                                            ))}
                                        </div>
                                        <label className={styles.file_subj}>물품사진</label>
                                        <div
                                            className={`box ${styles.file_wrapper}`}
                                            {...getItemImageRootProps()}
                                        >
                                            <input {...getItemImageInputProps()} />
                                            {isItemImageDragActive && (
                                                <div className={styles.isActive}>
                                                    <PlusIcon />
                                                </div>
                                            )}
                                            <div className={styles.file_container}>
                                                <div className={styles.file_area}>
                                                    {isItemLoading ? (
                                                        '사진 업로드 중...'
                                                    ) : (
                                                        <>
                                                            사진을 업로드하세요
                                                            <span>Drag & Drop</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            {itemImage.map((e, i) => (
                                                <div key={i} className={styles.item}>
                                                    <XMarkIcon
                                                        onClick={e => {
                                                            e.stopPropagation()
                                                            setItemImage(
                                                                itemImage.filter(
                                                                    (_e, _i) => _i !== i
                                                                )
                                                            )
                                                        }}
                                                    />
                                                    {e.name}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                                {(docType == '예산안' || docType == '결산안') && ComponentType2}
                                <div className={styles.button_wrapper}>
                                    <button
                                        type="button"
                                        className="grey"
                                        onClick={() =>
                                            router.push(
                                                `/council/docs?id=${props.result.departmentId}`
                                            )
                                        }
                                        disabled={isLoading}
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="submit"
                                        className="primary left-icon"
                                        disabled={isLoading}
                                    >
                                        <PencilSquareIcon />
                                        {isLoading ? '작성중' : '작성완료'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export async function getServerSideProps(context: any) {
    const session = await getSession(context)
    const query = context.query

    if (!session)
        return {
            redirect: {
                permanent: false,
                destination: `/user/login`,
            },
            props: {},
        }
    else if (session.user.asDep !== query.docsId)
        return {
            redirect: {
                permanent: false,
                destination: `/council/docs?id=${query.docsId}`,
            },
            props: {},
        }

    const response = await fetch(process.env.NEXT_URL + '/api/council/getDepartment', {
        method: 'POST',
        body: JSON.stringify({
            departmentId: query.docsId,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const result = await response.json()

    return {
        props: { result: result.message.result },
    }
}
