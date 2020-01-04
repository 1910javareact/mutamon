import axios from 'axios'

export const mutamonClient = axios.create({
    baseURL: 'http://3.88.86.151:8080/',
    headers: {
        'Content-Type':'application/json'
    },
    withCredentials:true
})