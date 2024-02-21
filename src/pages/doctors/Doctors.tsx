import './Doctors.scss'
import React, {useState} from 'react'
import MyInput from "../../components/UI/input/MyInput.tsx";
import MyButton from "../../components/UI/button/MyButton.tsx";
import DoctorsTable from "./DoctorsTable.tsx";

const Doctors: React.FC = () => {

    const [search, setSearch] = useState('')

    const [addModal, setAddModal] = useState(false)
    const [delModal, setDelModal] = useState(false)


    return (
        <div className='doctors page'>
            <div className="container">
                <div className="doctors__inner">
                    <div className="doctors__head row between align-center">
                        <h2 className="title">Doktorlar jadvali</h2>
                        <div className='d-flex align-center g1'>
                            <MyInput
                                name={'search'}
                                type={'text'}
                                placeHolder={'Search'}
                                required={false}
                                value={search}
                                setValue={setSearch}
                                icon={<i className="fa-solid fa-magnifying-glass"/>}
                            />
                            <MyButton txt={'+ Doktor qoshish'} setValue={setAddModal} />
                        </div>
                    </div>
                    <DoctorsTable
                        search={search}
                        addModal={addModal}
                        setAddModal={setAddModal}
                        delModal={delModal}
                        setDelModal={setDelModal}
                    />
                </div>
            </div>
        </div>
    )
}

export default Doctors
