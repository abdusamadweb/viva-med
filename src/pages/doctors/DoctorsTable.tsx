import React, {FormEvent, useState} from 'react'
import test from '../../assets/images/doctors-user-logo.png'
import {Button} from "antd"
import FormValidations from "./FormValidations.tsx"
import {useMutation, useQuery, useQueryClient} from "react-query"
import {AxiosResponse} from "axios"
import toast from "react-hot-toast"
import {doctorsAPI} from "../../api/swaggerAPI.ts"
import {formatPhone} from "../../assets/scripts/global.ts"


interface Props {
    search: string
    addModal: boolean
    setAddModal: (value: boolean) => void
    delModal: boolean
    setDelModal: (value: boolean) => void
}

interface Person {
    id: string | number
    name: string
    // Add other properties as needed
}

interface Data {
    username: string
    phone_number: string
    name: string
    middle_name: string
    surname: string
    birthdate: string
    country: number
    region: number
    district: number
    quarter: number
    gender: number
    passport_seria: string
    passport_number: number
    passport_data: string
    profession: string
    percent: string
    category: number
    groups: object
    user_permissions: object
}


const DoctorsTable: React.FC<Props> = ({ search, addModal, setAddModal, delModal, setDelModal }) => {

    const [loading, setLoading] = useState(false)
    const [effect, setEffect] = useState(false)

    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
    const [selectedPersonId, setSelectedPersonId] = useState<string | number>('')
    const [action, setAction] = useState<string>('')


    // fetch doctors
    const { data, isLoading } = useQuery(
        ['doctors', effect, search],
        doctorsAPI.getDoctors,
        {
            keepPreviousData: true,
        }
    )


    // add doctor
    const queryClient = useQueryClient()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const addMutation = useMutation<AxiosResponse, unknown, Data>(
        (item) => doctorsAPI.addEditDoctor(action, selectedPersonId, item),
        {
            onSuccess: () => {
                toast.success('Successfully added!')

                closeModal()
                setLoading(false)
                setEffect((prev) => !prev)

                queryClient.invalidateQueries('doctors')
            },
            onError: () => {
                setLoading(false)
                toast.error('Error!')
                // toast.error(err?.response?.data)
            },
        }
    )

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [phone_number, setPhone_number] = useState<string>('')
    const [phone_number_2, setPhone_number_2] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [middle_name, setMiddle_name] = useState<string>('')
    const [birthday, setBirthday] = useState<string>('')
    const [country, setCountry] = useState<string>('')
    const [region, setRegion] = useState<string>('')
    const [district, setDistrict] = useState<string>('')
    const [quarter, setQuarter] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [passport_seria, setPassport_seria] = useState<string>('')
    const [passport_number, setPassport_number] = useState<string>('')
    const [passport_data, setPassport_data] = useState<string>('')
    const [profession, setProfession] = useState<string>('')
    const [percent, setPercent] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [groups, setGroups] = useState<object>([])
    const [user_permissions, setUser_permissions] = useState<object>([])

    const addDoctor = (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const item = {
            username,
            password,
            phone_number,
            phone_number_2,
            name,
            surname,
            middle_name,
            birthday,
            country,
            region,
            district,
            quarter,
            gender,
            passport_seria,
            passport_number: +passport_number,
            passport_data,
            profession,
            percent: +percent,
            category: 1,
            groups,
            user_permissions
        }
        addMutation.mutate(item)
    }


    // delete doctor
    const delMutation = useMutation<AxiosResponse>(
        () => doctorsAPI.deleteDoctor(selectedPersonId),
        {
            onSuccess: () => {
                toast.success('Successfully deleted!')

                setSelectedPersonId('')
                setDelModal(false)
                setLoading(false)
                setEffect(prev => !prev)

                queryClient.invalidateQueries('doctors')
            },
            onError: () => {
                setLoading(false)
                toast.error('Error!')
                // toast.error(err?.response?.data)
            }
        }
    )
    const deleteDoctor = () => {
        setLoading(true)
        delMutation.mutate()
    }


    // modals
    const handlePersonClick = (person: Person, action: string) => {
        setSelectedPerson(person)
        setSelectedPersonId(person?.guid)
        setAction(action)
    }

    const handlePersonDelete = (guid: string) => {
        setSelectedPersonId(guid)
        setDelModal(true)
    }

    const closeModal = () => {
        setSelectedPerson(null)
        setSelectedPersonId('')

        setAddModal(false)
        setAction('')

        setUsername('')
        setPhone_number('')
        setName('')
        setSurname('')
        setMiddle_name('')
        setBirthday('')
    }


    return (
        <div className='table'>
            <div className="table__head">
                <span className='txt'>ID</span>
                <span className='txt'>Rasm</span>
                <span className='txt'>Ism</span>
                <span className='txt'>Familiya</span>
                <span className='txt'>Otasini ismi</span>
                <span className='txt'>Telefon raqam</span>
                <span className='txt'>Tug'ulgan kun</span>
                <span className='txt'>Amallar</span>
            </div>
            <ul className="table__body">
                {
                    isLoading ?
                        <p className='loading'>Loading . . .</p>
                        : data?.length ?
                            data?.map(i => (
                                <li className='item' key={i.id}>
                                    <span className='txt'>{i.id}</span>
                                    <img className='txt img' src={test} alt="user-logo"/>
                                    <span className="txt">{i.name}</span>
                                    <span className="txt">{i.surname}</span>
                                    <span className="txt">{i.middle_name}</span>
                                    <a className="txt" href={`tel: ${i.phone_number}`}>{formatPhone(i.phone_number)}</a>
                                    <time className="txt" dateTime={i.birthday}>{i.birthday}</time>
                                    <div className='txt actions row no-wrap evenly'>
                                        <button className='btn' onClick={() => handlePersonClick(i, 'show')}>
                                            <i className="fa-regular fa-eye"/>
                                        </button>
                                        <button className='btn' onClick={() => handlePersonClick(i, 'edit')}>
                                            <i className="fa-regular fa-pen-to-square"/>
                                        </button>
                                        <button className='btn' onClick={() => handlePersonDelete(i.guid)}>
                                            <i className="fa-regular fa-trash-can"/>
                                        </button>
                                    </div>
                                </li>
                            ))
                            : <p className='loading error'>No data!</p>
                }
            </ul>

            <div className={`modal animation ${(selectedPerson || addModal) ? 'active' : ''}`}>
                <form className='form' onSubmit={addDoctor}>
                    <div className="form__titles row between align-center">
                        <span className='txt'>
                            {
                                action === 'show' ? 'Doktor malumotlari'
                                    : action === 'edit' ? 'Doktorni tahrirlash'
                                    : 'Doktor qoshish'
                            }
                        </span>
                        <button className='close' type='button' onClick={closeModal}>
                            <i className="fa-solid fa-xmark"/>
                        </button>
                    </div>

                    <div className="form__body">
                        <FormValidations
                            formData={{
                                i: selectedPerson,
                                username,
                                password,
                                phone_number,
                                phone_number_2,
                                name,
                                surname,
                                middle_name,
                                birthday,
                                country,
                                region,
                                district,
                                quarter,
                                gender,
                                passport_seria,
                                passport_number,
                                passport_data,
                                profession,
                                percent,
                                category,
                                groups,
                                user_permissions,
                            }}
                            setFormData={{
                                setUsername,
                                setPassword,
                                setPhone_number,
                                setPhone_number_2,
                                setName,
                                setSurname,
                                setMiddle_name,
                                setBirthday,
                                setCountry,
                                setRegion,
                                setDistrict,
                                setQuarter,
                                setGender,
                                setPassport_seria,
                                setPassport_number,
                                setPassport_data,
                                setProfession,
                                setPercent,
                                setCategory,
                                setGroups,
                                setUser_permissions,
                            }}
                        />
                        {
                            action === 'show' ? <></>
                                : <div className='d-flex g1'>
                                    <Button
                                        className='my-button'
                                        type="primary"
                                        onClick={closeModal}
                                    >
                                        Bekor qilish
                                    </Button>
                                    <Button
                                        className='my-button confirm'
                                        type="primary"
                                        htmlType={"submit"}
                                        loading={loading}
                                    >
                                        Tasdiqlash
                                    </Button>
                                </div>
                        }
                    </div>
                </form>
                <div className="bg" onClick={closeModal}/>
            </div>
            <div className={`modal animation ${delModal ? 'active' : ''}`}>
                <div className="form del-form">
                    <span className="del-form__title">Doktorni ochirishni xohlaysizmi?</span>
                    <div className="d-flex g1">
                        <Button
                            className='my-button'
                            type="primary"
                            onClick={() => setDelModal(false)}
                        >
                            Bekor qilish
                        </Button>
                        <Button
                            className='my-button delete'
                            type="primary"
                            htmlType={"submit"}
                            loading={loading}
                            onClick={deleteDoctor}
                        >
                            Tasdiqlash
                        </Button>
                    </div>
                </div>
                <div className="bg" onClick={() => setDelModal(false)}/>
            </div>
        </div>
    )
}

export default DoctorsTable
