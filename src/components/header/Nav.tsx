import React from 'react'
import {NavLink} from "react-router-dom";
import {navList} from "../../assets/scripts/mockAPI.tsx"

const Nav: React.FC = () => {




    return (
        <nav className='nav'>
            <NavLink className='nav__link link' to='/'>
                <i className="icon fa-solid fa-house-chimney"/>
                <span className='txt'>Bosh sahifa</span>
            </NavLink>

            <div>
                <span className='nav__txt'>Foydalanuvchilar</span>
                <ul className='nav__list'>
                    {
                        navList.map(i => (
                            <li className='item' key={i.route}>
                                <NavLink className='item__link link' to={i.route}>
                                    { i.icon }
                                    <span className='txt'>{ i.name }</span>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Nav
