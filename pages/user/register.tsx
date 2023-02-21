import Head from 'next/head'
import styles from '@/styles/user/Register.module.css'
import SideBar from '@/components/SideBar'
import { useState } from 'react'
import { CheckIcon, DocumentTextIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import RegisterAgree from '@/components/user/RegisterAgree'
import RegisterForm from '@/components/user/RegisterForm'
import RegisterComplete from '@/components/user/RegisterComplete'

const steps = [
    {
        step: 1,
        icon: <DocumentTextIcon />,
        label: '약관동의',
    },
    {
        step: 2,
        icon: <PencilSquareIcon />,
        label: '정보입력',
    },
    {
        step: 3,
        icon: <CheckIcon />,
        label: '가입완료',
    },
]

export default function Register() {
    const [name, setName] = useState('')
    const [step, setStep] = useState(1)

    return (
        <>
            <Head>
                <title>회원가입 - K-you Life</title>
                <meta name="description" content="회원가입 - K-you Life" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <SideBar />
            <main className={styles.main}>
                <div id="container">
                    <div className={styles.register}>
                        <div className={styles.steps}>
                            {steps.map((_step, id) => (
                                <div key={id} className={styles.step_wrapper}>
                                    <div
                                        className={
                                            step == _step.step
                                                ? styles.active
                                                : step > _step.step
                                                ? styles.done
                                                : ''
                                        }
                                    >
                                        <div className={styles.icon}>
                                            <div className={styles.icon}>
                                                {step == _step.step ? _step.icon : _step.step}
                                            </div>
                                        </div>
                                        <label>{_step.label}</label>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <RegisterAgree visible={step == 1} next={() => setStep(step + 1)} />
                        <RegisterForm
                            visible={step == 2}
                            prev={() => setStep(step - 1)}
                            next={(name: string) => {
                                setName(name)
                                setStep(step + 1)
                            }}
                        />
                        {step == 3 && <RegisterComplete name={name} />}
                    </div>
                </div>
            </main>
        </>
    )
}
