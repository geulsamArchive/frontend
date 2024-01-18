import axios from "axios"

export const AuthorNovelApi = async (id) => {
    try {
        const response = await axios.get('' + id);
        return response.data
    } catch (error) {
        console.log(error);
    }

}