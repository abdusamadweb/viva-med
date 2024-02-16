import './Header.scss'
import React from 'react'
import {Link, useHref} from "react-router-dom"
import Nav from "./Nav.tsx";

const Header: React.FC = () => {

    const href: string = useHref({})


    return (
        <div className={`header ${href.includes('login') ? 'd-none' : ''}`}>
            <div className="container">
                <div className="header__inner">
                    <Link className='header__logo' to='/'>
                        <h1 className='txt'>Viva</h1>
                    </Link>

                    <Nav />

                </div>
            </div>
        </div>
    )
}

export default Header
