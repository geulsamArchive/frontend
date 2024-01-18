import axios from "axios"

export const AuthorNameApi = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}