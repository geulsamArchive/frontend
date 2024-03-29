import axios from 'axios'

export const LoginApi = async (schoolNum, password) => {
    const result = await axios.post('http://3.38.162.235:8080/user/login', { schoolNum, password });
    console.log(result)
    return result;
}