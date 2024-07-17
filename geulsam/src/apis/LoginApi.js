import axios from 'axios'

export const LoginApi = async (schoolNum, password) => {
    const result = await axios.post('http://43.200.215.113:8080/user/login', { schoolNum, password });
    console.log(result)
    return result;
}