import './MyInput.scss'
import React from 'react'


interface MyInputProps {
    value: string
    setValue: (value: string) => void
    type: string
    placeHolder: string
    required: boolean
    icon: React.ReactNode
}


const MyInput: React.FC<MyInputProps> = ({ value, setValue, type, placeHolder, required, icon }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }


    return (
        <label className='my-input'>
            <input
                className='inp'
                type={type}
                placeholder={placeHolder}
                required={required}
                value={value}
                onChange={handleChange}
            />
            { icon }
        </label>
    )
}

export default MyInput
