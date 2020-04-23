import axios from 'axios'
import Cookies from 'js-cookie'
import { getCookieFromReq } from '../helpers/utils'

const axiosInstance = axios.create({
    baseURL: `${process.env.NAMESPACE}/api/v1`,
    timeout: 3000
})

const setAuthHeader = (req) => {
    const token = req ? getCookieFromReq(req, 'jwt') : Cookies.getJSON('jwt')
    if (token) {
        return {headers: {'authorization': `Bearer ${token}` }}
    } else {
        return undefined
    }
}

export const getSecretData = async (req) => {

 const url = req ? '/secret' : '/api/v1/secret'
 return await axiosInstance.get(url, setAuthHeader(req)).then(response => response.data )
}

export const getWords = async (req) => {
    return await axiosInstance.get('/words', setAuthHeader(req)).then(response => response.data )
}

export const createWord = async (wordData) => {
    return await axiosInstance.post('/words', wordData, setAuthHeader()).then(response => response.data )
}

