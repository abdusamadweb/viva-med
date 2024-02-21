import './Header.scss'
import React from 'react'
import {Link, useHref} from "react-router-dom"
import Nav from "./Nav.tsx"
import logo from '../../assets/images/logo.svg'

const Header: React.FC = () => {

    const href: string = useHref({})


    return (
        <div className={`header ${href.includes('login') ? 'd-none' : ''}`}>
            <div className="container">
                <div className="header__inner">
                    <Link className='header__logo' to='/'>
                        <img className='img' src={logo} alt="site-logo"/>
                    </Link>

                    <Nav />

                </div>
            </div>
        </div>
    )
}

export default Header
