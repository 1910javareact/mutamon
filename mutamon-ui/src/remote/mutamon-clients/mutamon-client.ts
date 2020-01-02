import axios from 'axios'

export const mutamonClient = axios.create({
    baseURL: 'http://localhost:1910',
    headers: {
        'Content-Type':'application/json'
    },
    withCredentials:true
})