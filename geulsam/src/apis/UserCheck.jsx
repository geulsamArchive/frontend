import axios from "axios"

export const UserCheck = async () => {

    const access = localStorage.getItem('access')
    const refresh = localStorage.getItem('refresh')

    try {
        const res = await axios.get('https://geulsaem.store/user/check', {
            headers: {
                'accessToken': access
            },
        })
        console.log(res)
        const accessToken = res.headers.accesstoken.replace('Bearer ', '')
        localStorage.setItem('access', accessToken)
        const refreshToken = res.headers.refreshtoken.replace('Bearer ', '')
        localStorage.setItem('refresh', refreshToken)

    } catch (err) {
        console.error(err)
    }


}