import axios from 'axios'

export const API_URL = 'http://192.168.1.163:8000/api/v1/'

const $api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export default $api