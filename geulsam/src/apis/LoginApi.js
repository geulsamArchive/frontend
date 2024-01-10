import axios from 'axios'

export const LoginApi = async (id, pw) => {
    const result = await axios.post('', { id, pw });
    return result;
}