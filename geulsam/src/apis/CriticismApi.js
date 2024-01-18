import axios from "axios";

export const CriticismApi = async () => {
    try {
        const response = await axios.get('');
        return response.data;
    } catch (error) {
        console.log(error);
    }
};