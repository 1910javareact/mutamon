import axios from 'axios'

export const mutamonClient = axios.create({
    baseURL: 'http://54.211.15.164:1910',
    headers: {
        'Content-Type':'application/json'
    },
    withCredentials:true
})