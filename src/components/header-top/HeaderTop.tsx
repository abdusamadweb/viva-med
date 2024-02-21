import './HeaderTop.scss'
import React, {useEffect, useState} from 'react'
import {Link, useHref} from "react-router-dom"
import BreadCrumb from "./BreadCrumb.tsx"
import {Switch} from "antd"
import ru from '../../assets/images/ru.png'
import uz from '../../assets/images/uz.png'
import en from '../../assets/images/en.png'
import test from '../../assets/images/user-logo.png'
import {userParams} from "../../assets/scripts/global.ts";
import {useLang} from "../../context/LangProvider.tsx";


const HeaderTop: React.FC = () => {

    const href = useHref({})


    const langs = [
        {
            txt: 'ru',
            img: ru,
        },
        {
            txt: 'en',
            img: en,
        },
        {
            txt: 'uz',
            img: uz,
        }
    ]
    const { lang, setLang } = useLang()
    useEffect(() => {
        setLang(langs[0])
    }, [])


    // get time
    const date: Date = new Date()
    const [currentDayOfWeek, setCurrentDayOfWeek] = useState<string>(getDayOfWeek())
    const [currentHours, setCurrentHours] = useState<number>(new Date().getHours())
    const [currentMinutes, setCurrentMinutes] = useState<number>(new Date().getMinutes())

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date()
            setCurrentHours(now.getHours())
            setCurrentMinutes(now.getMinutes())
            setCurrentDayOfWeek(getDayOfWeek())
        }, 60000)

        return () => clearInterval(intervalId)
    }, [])

     // get day
    function getDayOfWeek(): string {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const currentDayIndex = new Date().getDay()
        return daysOfWeek[currentDayIndex]
    }


    return (
        <div className={`header-top page ${href.includes('login') ? 'd-none' : ''}`}>
            <div className="container">
                <div className="header-top__inner row between">
                    <div className="header-top__titles">
                        <BreadCrumb href={href} />
                        <span className='title'>{ `User ${userParams?.username}` }</span>
                    </div>
                    <div className='d-flex align-center g3'>
                        <div className='date'>
                            <div className='row between align-center g2'>
                                <div className='row align-center'>
                                    <div className='date__langs relative'>
                                        <button className="lang row align-center">
                                            <img className='flag' src={lang.img} alt="icon"/>
                                            <i className="fa-solid fa-angle-down icon"/>
                                        </button>
                                        <div className='hovered'>
                                            {
                                                langs.map((i, index) => (
                                                    i.txt !== lang.txt &&
                                                    <button
                                                        className='btn'
                                                        onClick={() => setLang(i)}
                                                        key={index}
                                                    >
                                                        <img className='flag' src={i.img} alt={i.txt}/>
                                                        <span className='txt'>{ i.txt }</span>
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <span className='lang-txt'>{ lang.txt }</span>
                                </div>
                                <div className='date__switch'>
                                    <Switch defaultChecked />
                                </div>
                                <div className='date__notf'>
                                    <Link className='link' to='/'>
                                        <i className="fa-solid fa-envelope"/>
                                    </Link>
                                    <Link className='link' to='/'>
                                        <i className="fa-solid fa-bell"/>
                                    </Link>
                                </div>
                            </div>
                            <div className='date__time row between'>
                                <span className='txt'>
                                    { `${currentHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}` }
                                </span>
                                <span className="txt">{ date?.toLocaleDateString() }</span>
                                <span className="txt">{ currentDayOfWeek }</span>
                            </div>
                        </div>
                        <div className='user'>
                            <div className='user__imgs'>
                                <img className='img' src={test} alt="user-logo"/>
                            </div>
                            <div className='user__titles'>
                                <span className='title'>{ `User ${userParams?.username}` }</span>
                                <span className="role">{ userParams?.role }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderTop
