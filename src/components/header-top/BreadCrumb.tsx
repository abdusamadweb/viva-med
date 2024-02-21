import React from 'react'
import {Link} from "react-router-dom"

interface Props {
    href: string
}

const BreadCrumb: React.FC<Props> = ({ href }) => {

    const pathname = href.split('/').filter((x) => x)


    return (
        <ul className='bread-crumb'>
            <li className='item'>
                <Link className='item__link' to="/">Home</Link>
            </li>
            {
                pathname.map((name, index) => {
                    const routeTo = `/${pathname.slice(0, index + 1).join('/')}`
                    return (
                        <li className='item' key={name}>
                            <i className="fa-solid fa-angle-right icon"/>
                            <Link className='item__link' to={routeTo}>{name}</Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default BreadCrumb
