import axios from 'axios'

export const SignUpApi = async (name, schoolNum, phone, email, joinedAt, birthDay) => {
    try {
        const result = await axios.post('http://3.38.162.235:8080/user/signup', {
            name: name,
            schoolNum: schoolNum,
            phone: phone,
            email: email,
            joinedAt: joinedAt,
            birthDay: birthDay,
            introduce: "자기소개",
            keyword: "키워드1,키워드2,키워드3",
        })
        return result
    } catch (error) {
        console.log('err', error)
    }
};



