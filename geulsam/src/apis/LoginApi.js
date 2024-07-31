import axios from 'axios'

export const LoginApi = async (schoolNum, password) => {
    const result = await axios.post('https://geulsaem.store/user/login', { schoolNum, password });
    console.log(result)
    return result;
}