import axios from 'axios'

export const API_URL = 'http://192.168.1.163:8000/api/v1/'

const $api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export const $apiT = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem('token')
    }
})

export default $api