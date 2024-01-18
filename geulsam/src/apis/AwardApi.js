import axios from "axios";

export const AwardApi = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return response.data
    } catch (error) {
        console.log(error);
    }
};