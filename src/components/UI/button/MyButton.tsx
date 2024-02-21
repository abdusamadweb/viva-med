import './MyButton.scss'
import React from 'react'


interface MyButtonProps {
    txt: string
    setValue: (value: boolean) => void | undefined
}


const MyButton: React.FC<MyButtonProps> = ({ txt, setValue }) => {
    return (
        <button className='my-button' onClick={() => setValue(true)}>
            { txt }
        </button>
    )
}

export default MyButton
