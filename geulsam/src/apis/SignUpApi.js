import axios from 'axios'

export const SignUpApi = async (name, schoolNum, phone, email, joinedAt) => {
    try {
        const result = await axios.post('http://3.38.162.235:8080/user/signup', {
            name: "정성훈",
            schoolNum: "B222222",
            phone: "010-3333-2222",
            email: "example@gmail.com",
            joinedA: 2021,
            introduce: "자기소개입니다",
            keyword: "가나,다라,마바",
            birthDay: "2024-05-01"

        })
        return result
    } catch (error) {
        console.log('err', error)
    }
};



