import { useState, useEffect } from "react";
import { Api } from "../apis/Api";

export const useData = (apiEndpoint, id) => {
    const [datas, setDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        try {
            const data = await Api(apiEndpoint, id);
            setDatas(data);
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
        console.log('함수호출')
    }, [])

    return { datas, isLoading }

}