import './Login.scss'
import React, {FormEvent, useState} from 'react'
import MyInput from "../../components/UI/input/MyInput.tsx"
import loginImg from '../../assets/images/login-img.png'
import {Button} from 'antd'
import {useMutation, UseMutationOptions} from "react-query"
import {AxiosResponse} from 'axios'
import $api from '../../api'
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";


interface LoginResponse {
    access: string
}


const Login: React.FC = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    // use mutations
    const mutation = useMutation<
        AxiosResponse<LoginResponse>, unknown, { username: string; password: string }
    >(
        (item) => $api.post('/base/login/', item),
        {
            onSuccess: (res) => {
                localStorage.setItem('token', res.data.access)
                localStorage.setItem('loginParams', JSON.stringify(res.data))

                toast.success('Success! Now you are navigating . . .')
                setLoading(false)

                setTimeout(() => navigate('/'), 1000)
            },
            onError: (err) => {
                if (err.response) {
                    toast.error(err.response.data.non_field_errors?.map((i) => i))
                } else if (err.request) {
                    toast.error('Request error. Please try again.')
                } else {
                    toast.error('An unexpected error occurred.')
                }

                setLoading(false)
            }
        } as UseMutationOptions<AxiosResponse<LoginResponse>, unknown, { username: string; password: string }>
    )

    const login = (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const item = { username, password }
        mutation.mutate(item)
    }


    return (
        <div className='login'>
            <div className="login__inner">
                <div className='login__imgs'>
                    <img className='img' src={loginImg} alt="bg-img"/>
                </div>
                <div className='p1'>
                    <div className="login__titles">
                        <h2 className="title">Xush kelibsiz</h2>
                        <p className="desc">Xush kelibsiz ! Iltimos, ma'lumotlaringizni kiriting.</p>
                    </div>

                    <form className='login__form' onSubmit={login}>
                        <div>
                            <span className='txt'>User name <span className='red'>*</span></span>
                            <MyInput
                                name={'userName'}
                                type={'text'}
                                placeHolder={'User name . . .'}
                                required={true}
                                icon={<i className="fa-regular fa-user"/>}
                                value={username}
                                setValue={setUsername}
                            />
                        </div>
                        <div>
                            <span className='txt'>Password <span className='red'>*</span></span>
                            <MyInput
                                name={'password'}
                                type={'password'}
                                placeHolder={'Password . . .'}
                                required={true}
                                icon={<i className="fa-solid fa-lock"/>}
                                value={password}
                                setValue={setPassword}
                            />
                        </div>

                        <Button
                            className='my-button'
                            type="primary"
                            htmlType={"submit"}
                            loading={loading}
                        >
                            Click me!
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
