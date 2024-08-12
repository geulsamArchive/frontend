import axios from 'axios'
import { normalAPI } from './Api';

export const SignUpApi = async (formdata) => {
    try {
        const result = await normalAPI.post('/user/signup', {
            name: formdata.name,
            schoolNum: formdata.schoolNum,
            phone: formdata.phone,
            email: formdata.email,
            joinedAt: formdata.joinedAt,
            birthDay: formdata.birthDay,
            introduce: formdata.info,
            keyword: formdata.keywords,
        })
        return result
    } catch (error) {
        console.log('err', error)
    }
};



