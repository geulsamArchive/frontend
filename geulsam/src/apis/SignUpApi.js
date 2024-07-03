import axios from 'axios'

export const SignUpApi = async (formdata) => {
    try {
        const result = await axios.post('http://3.38.162.235:8080/user/signup', {
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



