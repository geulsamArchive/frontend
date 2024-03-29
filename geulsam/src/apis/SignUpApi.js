import axios from 'axios'

export const SignUpApi = async (name, schoolNum, phone) => {
    try {
        const result = axios.post('http://3.38.162.235:8080/user/signup', {
            name,
            schoolNum,
            phone,
        })
        console.log('result', result)
        return result
    } catch (error) {
        console.log('err', error)
    }
};