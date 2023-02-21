import styles from '@/styles/user/Register.module.css'

type Props = {
    visible: boolean
    prev: Function
    next: Function
}

export default function RegisterForm(props: Props) {
    async function handleSubmit(e: any) {
        e.preventDefault()

        var regId = /^[a-z]+[a-z0-9]{5,19}$/g
        var regPw = /^(?=.*[a-zA-Z])(?=.*[0-9]).{7,19}$/g
        var regNick = /[^a-zA-Z0-9ㄱ-힣]/g

        if (!regId.test(e.target.username.value)) {
            alert('아이디는 영어로 시작하는 6~20자의 영어,숫자 조합이어야 합니다.')
            e.target.username.focus()
            return
        }

        if (!regPw.test(e.target.password.value)) {
            alert('비밀번호는 8~20자의 영어,숫자 조합이어야 합니다.')
            e.target.password.focus()
            return
        }

        if (e.target.password.value !== e.target.password2.value) {
            alert('비밀번호가 일치하지 않습니다.')
            e.target.password2.focus()
            return
        }

        if (regNick.test(e.target.nickname.value)) {
            alert('닉네임은 2~10자의 한글,영어,숫자 조합이어야 합니다.')
            e.target.nickname.focus()
            return
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    name: e.target.name.value,
                    username: e.target.username.value,
                    password: e.target.password.value,
                    nickname: e.target.nickname.value,
                    email: e.target.email.value,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!')
            }
        } catch (e) {
            alert(e)
            return
        }

        props.next(e.target.name.value)
    }

    return (
        <form onSubmit={handleSubmit} className={props.visible ? '' : 'none'}>
            <div className={`box ${styles.form}`}>
                <h3>기본정보</h3>
                <div className={`input-box ${styles.input_box}`}>
                    <label htmlFor="name">이름</label>
                    <div>
                        <input type="text" id="name" placeholder="이름" required maxLength={10} />
                        <span id="username_err"></span>
                    </div>
                </div>
                <div className={`input-box ${styles.input_box}`}>
                    <label htmlFor="username">아이디</label>
                    <div>
                        <input
                            type="text"
                            id="username"
                            placeholder="아이디"
                            required
                            maxLength={20}
                        />
                        <span>* 영어로 시작하는 6~20자의 영어,숫자 조합</span>
                        <span id="username_err"></span>
                    </div>
                </div>
                <div className={`input-box ${styles.input_box}`}>
                    <label htmlFor="password">비밀번호</label>
                    <div>
                        <input
                            type="password"
                            id="password"
                            placeholder="비밀번호"
                            required
                            maxLength={20}
                        />
                        <span>* 8~20자의 영어,숫자 조합</span>
                        <span id="username_err"></span>
                    </div>
                </div>
                <div className={`input-box ${styles.input_box}`}>
                    <label htmlFor="password2">비밀번호 확인</label>
                    <div>
                        <input
                            type="password"
                            id="password2"
                            placeholder="비밀번호 확인"
                            required
                            maxLength={20}
                        />
                        <span id="username_err"></span>
                    </div>
                </div>
                <div className={`input-box ${styles.input_box}`}>
                    <label htmlFor="nickname">별명</label>
                    <div>
                        <input
                            type="text"
                            id="nickname"
                            placeholder="별명"
                            required
                            maxLength={10}
                        />
                        <span>* 2~10자의 한글,영어,숫자 조합</span>
                        <span id="username_err"></span>
                    </div>
                </div>
                <div className={`input-box ${styles.input_box}`}>
                    <label htmlFor="email">이메일</label>
                    <div>
                        <input
                            type="email"
                            id="email"
                            placeholder="email@admin.com"
                            required
                            maxLength={40}
                        />
                        <span id="username_err"></span>
                    </div>
                </div>
            </div>
            <div className={styles.button_wrapper}>
                <button
                    type="button"
                    className="grey"
                    onClick={e => {
                        e.preventDefault()
                        props.prev()
                    }}
                >
                    이전
                </button>
                <button type="submit" className="primary">
                    회원가입
                </button>
            </div>
        </form>
    )
}
