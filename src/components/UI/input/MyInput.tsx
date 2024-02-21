import './MyInput.scss'
import React from 'react'


interface MyInputProps {
    value: string | number
    setValue: (value: string | number) => void
    name: string
    type: string
    placeHolder: string
    required: boolean
    icon: React.ReactNode
}


const MyInput: React.FC<MyInputProps> = ({ value, setValue, name, type, placeHolder, required, icon }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }


    return (
        <label className='my-input'>
            <input
                className={`inp ${icon ? 'pr2' : ''}`}
                name={name}
                type={type}
                placeholder={placeHolder}
                required={required}
                value={value}
                onChange={handleChange}
                autoComplete='readonly'
            />
            { icon }
        </label>
    )
}

export default MyInput
