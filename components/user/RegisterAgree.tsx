import styles from '@/styles/user/Register.module.css'
import { useEffect, useState } from 'react'

type Props = {
    visible: boolean
    next: Function
}

export default function RegisterAgree(props: Props) {
    const [agreeAll, setAgreeAll] = useState(false)
    const [agree1, setAgree1] = useState(false)
    const [agree2, setAgree2] = useState(false)

    useEffect(() => {
        if (!(agree1 && agree2)) {
            setAgreeAll(false)
        }
    }, [agree1, agree2])

    function checkAll() {
        if (agreeAll) {
            setAgree1(false)
            setAgree2(false)
        } else {
            setAgreeAll(true)
            setAgree1(true)
            setAgree2(true)
        }
    }

    function next(e: any) {
        e.preventDefault()

        if (!agree1) {
            alert('회원가입 약관에 동의하지 않았습니다.')
            e.target.agree1.focus()
            return
        }
        if (!agree2) {
            alert('개인정보 처리방침 안내에 동의하지 않았습니다.')
            e.target.agree2.focus()
            return
        }

        props.next()
    }

    return (
        <form onSubmit={next} className={props.visible ? '' : 'none'}>
            <div className={`box ${styles.agree}`}>
                <div className="check-wrap">
                    <input
                        type="checkbox"
                        id="agreeAll"
                        checked={agreeAll}
                        onChange={() => checkAll()}
                    />
                    <label htmlFor="agreeAll">전체 동의</label>
                </div>
                <div className={styles.agreeText}>
                    <div className="check-wrap">
                        <input
                            type="checkbox"
                            id="agree1"
                            checked={agree1}
                            onChange={e => setAgree1(e.target.checked)}
                        />
                        <label htmlFor="agree1">회원가입약관 동의 (필수)</label>
                    </div>
                </div>
                <div className={styles.agreeText}>
                    <div className="check-wrap">
                        <input
                            type="checkbox"
                            id="agree2"
                            checked={agree2}
                            onChange={e => setAgree2(e.target.checked)}
                        />
                        <label htmlFor="agree2">
                            개인정보 처리방침 안내 동의 (필수)
                        </label>
                    </div>
                </div>
            </div>
            <button className={`primary ${styles.submit}`}>다음</button>
        </form>
    )
}
