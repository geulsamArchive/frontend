import axios from 'axios'

export const Api = async (enpoint, id) => {
    try {
        if (id === null || id === undefined) {
            const response = await axios.get(enpoint);
            return response.data;

        } else {
            const response = await axios.get(enpoint + '/' + id);
            return response.data;

        }
    } catch (error) {
        console.log(error);
    }

}