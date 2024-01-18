import React, { useEffect, useState } from 'react';
import { CriticismApi } from '../apis/CriticismApi';
import { LinkToCriticism } from './LinkToCriticism';

const LinkCriticism = () => {
    const [criticisms, setCriticisms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        try {
            const data = await CriticismApi();
            setCriticisms(data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            {isLoading ? LoadingMessage : <LinkToCriticism criticisms={criticisms} />}
        </>
    )
};

const LoadingMessage = <>로딩중</>


export default LinkCriticism;