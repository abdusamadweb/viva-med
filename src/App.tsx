// global styles
import './assets/styles/normalize.css'
import './assets/styles/global.css'
import './App.scss'

import React, {useLayoutEffect} from 'react'
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom"
import Header from "./components/header/Header"
import Home from "./pages/home/Home"
import Page404 from "./components/404/Page404.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import Login from "./pages/login/Login.tsx";
import {Toaster} from "react-hot-toast";
import Doctors from "./pages/doctors/Doctors.tsx";


// page scroll to X:0 Y:0
interface WrapperProps {
  children: React.ReactNode
}
const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])
  return <>{children}</>
}


const App: React.FC = () => {


  return (
      <div className='App'>
        <BrowserRouter>
          <Wrapper>

            <Header />

            <Routes>

              <Route path='/login' element={<Login />} />

              {/* Protect-able routes */}
              <Route element={<RequireAuth />}>

                <Route path='/' element={<Home />} />
                <Route path='/doctors' element={<Doctors />} />

              </Route>

              {/* Page 404 */}
              <Route path='*' element={<Page404 />} />

            </Routes>

            <Toaster
                containerClassName="toast"
                position="bottom-center"
                reverseOrder={false}
            />

          </Wrapper>
        </BrowserRouter>
      </div>
  )
}

export default App
