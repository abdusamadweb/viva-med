import React, {useEffect, useState} from 'react'
import MyInput from "../../components/UI/input/MyInput.tsx"
import {Radio, Select, Space} from "antd"
import {baseAPI} from "../../api/swaggerAPI.ts"
import {useLang} from "../../context/LangProvider.tsx"
import {Option} from "antd/es/mentions"
import {useQueries, UseQueryOptions} from 'react-query'


interface Props {
    i: object | null
    username: string | null
    password: string | null
    phone_number: string
    phone_number_2: string
    name: string
    surname: string
    middle_name: string
    birthday: string
    country: string
    region: string
    district: string
    quarter: string
    gender: string
    passport_seria: string
    passport_number: string
    passport_data: string
    profession: string
    percent: string
    category: string
    groups: object
    user_permissions: object

    setUsername: React.Dispatch<React.SetStateAction<string>>
    setPassword: React.Dispatch<React.SetStateAction<string>>
    setPhone_number: React.Dispatch<React.SetStateAction<string>>
    setPhone_number_2: React.Dispatch<React.SetStateAction<string>>
    setName: React.Dispatch<React.SetStateAction<string>>
    setSurname: React.Dispatch<React.SetStateAction<string>>
    setMiddle_name: React.Dispatch<React.SetStateAction<string>>
    setBirthday: React.Dispatch<React.SetStateAction<string>>
    setCountry: React.Dispatch<React.SetStateAction<string>>
    setRegion: React.Dispatch<React.SetStateAction<string>>
    setDistrict: React.Dispatch<React.SetStateAction<string>>
    setQuarter: React.Dispatch<React.SetStateAction<string>>
    setGender: React.Dispatch<React.SetStateAction<string>>
    setPassport_seria: React.Dispatch<React.SetStateAction<string>>
    setPassport_number: React.Dispatch<React.SetStateAction<string>>
    setPassport_data: React.Dispatch<React.SetStateAction<string>>
    setProfession: React.Dispatch<React.SetStateAction<string>>
    setPercent: React.Dispatch<React.SetStateAction<string>>
    setCategory: React.Dispatch<React.SetStateAction<string>>
    setGroups: React.Dispatch<React.SetStateAction<object>>
    setUser_permissions: React.Dispatch<React.SetStateAction<object>>
}


const FormValidations: React.FC<Props> = ({
    i,
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
    setUser_permissions
}) => {

    const { lang } = useLang()


    useEffect(() => {
        if (i) {
            setUsername(i?.username)
            setPhone_number(i?.phone_number)
            setPhone_number_2(i?.phone_number_2)
            setName(i?.name)
            setSurname(i?.surname)
            setMiddle_name(i?.middle_name)
            setBirthday(i?.birthday)
            setCountry(i?.country)
            setRegion(i?.region)
            setDistrict(i?.district)
            setQuarter(i?.quarter)
            setGender(i?.gender)
            setPassport_seria(i?.passport_seria)
            setPassport_number(i?.passport_number)
            setPassport_data(i?.passport_data)
            setProfession(i?.profession)
            setPercent(i?.percent)
            setCategory(i?.category)
            setUser_permissions(i?.user_permissions)
            setGroups(i?.groups)
        }
    }, [i])


    // to handle option for - ant select
    const [permissionOption, setPermissionOption] = useState<object>({})
    const [groupPermissionOption, setGroupPermissionOption] = useState<object>({})

    // get all queries in one
    const queryOptions = { keepPreviousData: true, refetchOnWindowFocus: false }
    const queryConfigurations: UseQueryOptions[] = [
        { queryKey: ['countries'], queryFn: baseAPI.getCounty, ...queryOptions },
        { queryKey: ['regions'], queryFn: baseAPI.getRegion, ...queryOptions },
        { queryKey: ['districts'], queryFn: baseAPI.getDistrict, ...queryOptions },
        { queryKey: ['quarters'], queryFn: baseAPI.getQuarter, ...queryOptions },
        // { queryKey: ['categories'], queryFn: benefitCategory.getCategories },
        {
            queryKey: ['permission'],
            queryFn: baseAPI.getPermission,
            ...queryOptions,
            onSuccess: (res) => {
                setPermissionOption(res?.map(i => ({
                    ...i,
                    value: i.id,
                    label: i.name
                })))
            }
        },
        {
            queryKey: ['group-permission'],
            queryFn: baseAPI.getGroupPermission,
            ...queryOptions,
            onSuccess: (res) => {
                setGroupPermissionOption(res?.map(i => ({
                    ...i,
                    value: i.id,
                    label: i.name
                })))
            }
        }
    ]
    const queryResults = useQueries(queryConfigurations)

    const countries = queryResults[0].data
    const regions = queryResults[1].data
    const districts = queryResults[2].data
    const quarters = queryResults[3].data


    // filtered data with ID
    const [filteredDistricts, setFilteredDistricts] = useState<object>([])
    const [filteredQuarters, setFilteredQuarters] =  useState<object>([])
    useEffect(() => {

        setFilteredDistricts(districts?.filter(r => r.region_id === +region))
        setFilteredQuarters(quarters?.filter(r => r.district_id === +district))

    }, [districts, quarters, region, district])


    return (
        <div className='form__validations'>
            <div>
                <span className='txt'>Foydalanuvchi nomi</span>
                <MyInput
                    name={'username'}
                    type={'text'}
                    placeHolder={'Foydalanuvchi nomi...'}
                    required={true}
                    icon={false}
                    value={username}
                    setValue={setUsername}
                />
            </div>
            {
                i === null &&
                    <div>
                        <span className='txt'>Parol</span>
                        <MyInput
                            name={'password'}
                            type={'password'}
                            placeHolder={'Password...'}
                            required={true}
                            icon={false}
                            value={password}
                            setValue={setPassword}
                        />
                    </div>
            }
            <div>
                <span className='txt'>Telefon raqam</span>
                <MyInput
                    name={'phone_number'}
                    type={'tel'}
                    placeHolder={'Phone number...'}
                    required={true}
                    icon={false}
                    value={phone_number}
                    setValue={setPhone_number}
                />
            </div>
            <div>
                <span className='txt'>Ism</span>
                <MyInput
                    name={'name'}
                    type={'text'}
                    placeHolder={'Ism...'}
                    required={true}
                    icon={false}
                    value={name}
                    setValue={setName}
                />
            </div>

            <div>
                <span className='txt'>Familiya</span>
                <MyInput
                    name={'surname'}
                    type={'text'}
                    placeHolder={'Familiya...'}
                    required={true}
                    icon={false}
                    value={surname}
                    setValue={setSurname}
                />
            </div>
            <div>
                <span className='txt'>Otasini ismi</span>
                <MyInput
                    name={'middle_name'}
                    type={'text'}
                    placeHolder={'Otasini ismi...'}
                    required={true}
                    icon={false}
                    value={middle_name}
                    setValue={setMiddle_name}
                />
            </div>
            <div>
                <span className='txt'>Tug’ulgan kun</span>
                <MyInput
                    name={'birth_date'}
                    type={'text'}
                    placeHolder={'Misol: 14.02.1998'}
                    required={true}
                    icon={false}
                    value={birthday}
                    setValue={setBirthday}
                />
            </div>

            <div>
                <span className='txt'>Telefon raqam 2</span>
                <MyInput
                    name={'phone_number_2'}
                    type={'tel'}
                    placeHolder={'Phone number 2...'}
                    required={false}
                    icon={false}
                    value={phone_number_2}
                    setValue={setPhone_number_2}
                />
            </div>
            <div>
                <span className='txt'>Davlat</span>
                <Select
                    className='my-input select'
                    value={country}
                    onChange={(value) => setCountry(value)}
                    placeholder="Search to select"
                    aria-required={true}
                >
                    {
                        countries?.map(i => (
                            <Option value={i.id} key={i.id}>{ i.name?.[lang.txt] }</Option>
                        ))
                    }
                </Select>
            </div>
            <div>
                <span className='txt'>Region</span>
                <Select
                    className='my-input select'
                    value={region}
                    onChange={(value) => setRegion(value)}
                    placeholder="Search to select"
                    aria-required={true}
                >
                    {
                        regions?.map(i => (
                            <Option value={i.id} key={i.id}>{ i.name?.[lang.txt] }</Option>
                        ))
                    }
                </Select>
            </div>

            <div>
                <span className='txt'>Tuman</span>
                <Select
                    className='my-input select'
                    value={district}
                    onChange={(value) => setDistrict(value)}
                    placeholder="Select"
                    aria-required={true}
                >
                    {
                        filteredDistricts?.map(i => (
                            <Option value={i.id} key={i.id}>
                                {i.name?.[lang.txt]}
                            </Option>
                        ))
                    }
                </Select>
            </div>
            <div>
                <span className='txt'>Mavze</span>
                <Select
                    className='my-input select'
                    value={quarter}
                    onChange={(value) => setQuarter(value)}
                    placeholder="Select"
                    aria-required={true}
                >
                    {
                        filteredQuarters?.map(i => (
                            <Option value={i.id} key={i.id}>{ i.name }</Option>
                        ))
                    }
                </Select>
            </div>
            <div>
                <span className='txt'>Jins</span>
                <Radio.Group
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                >
                    <Radio value={1}>Erkak</Radio>
                    <Radio value={2}>Ayol</Radio>
                </Radio.Group>
            </div>

            <div>
                <span className='txt'>Passport seriya</span>
                <MyInput
                    name={'passport_seria'}
                    type={'txt'}
                    placeHolder={'Passport serie...'}
                    required={false}
                    icon={false}
                    value={passport_seria}
                    setValue={setPassport_seria}
                />
            </div>
            <div>
                <span className='txt'>Passport raqam</span>
                <MyInput
                    name={'passport_number'}
                    type={'number'}
                    placeHolder={'Passport number...'}
                    required={false}
                    icon={false}
                    value={passport_number}
                    setValue={setPassport_number}
                />
            </div>
            <div>
                <span className='txt'>Passport malumotlari</span>
                <MyInput
                    name={'passport_data'}
                    type={'text'}
                    placeHolder={'Passport data...'}
                    required={false}
                    icon={false}
                    value={passport_data}
                    setValue={setPassport_data}
                />
            </div>

            <div>
                <span className='txt'>Kasb</span>
                <MyInput
                    name={'profession'}
                    type={'text'}
                    placeHolder={'Profession...'}
                    required={false}
                    icon={false}
                    value={profession}
                    setValue={setProfession}
                />
            </div>
            <div>
                <span className='txt'>Percent</span>
                <MyInput
                    name={'percent'}
                    type={'text'}
                    placeHolder={'Percent...'}
                    required={false}
                    icon={false}
                    value={percent}
                    setValue={setPercent}
                />
            </div>
            <div>
                <span className='txt'>Kategoriya</span>
                <Select
                    className='my-input select'
                    value={category}
                    onChange={(value) => setCategory(value)}
                    placeholder="Search to select"
                    aria-required={true}
                >
                    <Option value={1}>{ 1 }</Option>
                </Select>
            </div>

            <div>
                <span className="txt">Ruxsatnoma</span>
                <Select
                    className='my-input select'
                    value={user_permissions}
                    onChange={setUser_permissions}
                    mode="multiple"
                    placeholder="Permission"
                    optionLabelProp="label"
                    options={permissionOption}
                    optionRender={(option) => (
                        <Space>
                            <span aria-label={option.label}>
                              {option.label}
                            </span>
                        </Space>
                    )}
                />
            </div>
            <div>
                <span className="txt">Gurux ruhsatnomalari</span>
                <Select
                    className='my-input select'
                    value={groups}
                    onChange={setGroups}
                    mode="multiple"
                    placeholder="Group permission"
                    optionLabelProp="label"
                    options={groupPermissionOption}
                    optionRender={(option) => (
                        <Space>
                            <span aria-label={option.label}>
                              {option.label}
                            </span>
                        </Space>
                    )}
                />
            </div>
        </div>
    )
}

export default FormValidations
