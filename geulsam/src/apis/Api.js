import axios from "axios"

const baseURL = 'https://geulsam.com'

const axiosAPI = (url, options) => {
    const instance = axios.create({
        baseURL: url, ...options
    })
    return instance
}

const axiosAuthAPI = (url, options) => {
    const accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');
    const instance = axios.create({
        baseURL: url,
        headers: {
            accessToken: accessToken,
            refreshToken: refreshToken,
        },
        ...options
    })
    return instance
}

export const normalAPI = axiosAPI(baseURL);
export const authAPI = axiosAuthAPI(baseURL);