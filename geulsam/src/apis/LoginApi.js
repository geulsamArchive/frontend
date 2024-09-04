import axios from 'axios'

export const LoginApi = async (schoolNum, password) => {
    try {
        const result = await axios.post('https://geulsaem.store/user/login', { schoolNum, password });
        return result;
    } catch (error) {
        // 에러를 발생시켜 호출하는 쪽에서 처리할 수 있게 합니다.
        throw error;
    }
}