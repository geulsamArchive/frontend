import React, { useEffect, useState } from 'react';
import { AwardApi } from '../apis/AwardApi';
import LinkToAward from './LinkToAward';

const LinkAward = () => {
    const [awards, setAwards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        try {
            const data = await AwardApi();
            setAwards(data);
            setIsLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            {isLoading ? LoadingMessage : <LinkToAward awards={awards} />}
        </>

    );
};

const LoadingMessage = <>로딩중</>


export default LinkAward;