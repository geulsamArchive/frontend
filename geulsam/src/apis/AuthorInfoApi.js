import axios from 'axios'

export const AuthorInfoApi = async (id) => {
    try {
        const response = await axios.get('' + id);
        return response.data;
    } catch (error) {
        console.log(error);
    }

}