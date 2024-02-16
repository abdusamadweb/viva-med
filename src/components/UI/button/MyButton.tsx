import './MyButton.scss'
import React from 'react'


interface MyButtonProps {
    txt: string
}


const MyButton: React.FC<MyButtonProps> = ({ txt }) => {
    return (
        <button className='my-button'>
            { txt }
        </button>
    )
}

export default MyButton
