import './Doctors.scss'
import React, {useState} from 'react'
import MyInput from "../../components/UI/input/MyInput.tsx";
import MyButton from "../../components/UI/button/MyButton.tsx";

const Doctors: React.FC = () => {

    const [search, setSearch] = useState('')


    return (
        <div className='doctors page'>
            <div className="container">
                <div className="doctors__inner">
                    <div className="doctors__head row between align-center">
                        <h2 className="title">Doktorlar jadvali</h2>
                        <div className='d-flex align-center g1'>
                            <MyInput
                                type={'text'}
                                placeHolder={'Search'}
                                required={false}
                                value={search}
                                setValue={setSearch}
                                icon={<i className="fa-solid fa-magnifying-glass"/>}
                            />
                            <MyButton txt={'+ Doktor qoshish'} />
                        </div>
                    </div>
                    <div className="doctors__content">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Doctors
