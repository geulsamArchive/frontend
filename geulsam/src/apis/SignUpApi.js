import axios from 'axios'
import { normalAPI } from './Api';

export const SignUpApi = async (formdata) => {
    try {
        const result = await normalAPI.post('/user/signup', {
            name: formdata.name,
            schoolNum: formdata.schoolNum,
            joinedAt: formdata.joinedAt,
            introduce: formdata.info,
            keyword: formdata.keyword,
            password: formdata.password,
        })
        return result
    } catch (error) {
        console.log('err', error)
    }
};



