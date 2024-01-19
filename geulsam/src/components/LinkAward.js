import React from 'react';
import LinkToAward from './LinkToAward';
import { useData } from '../hooks/useData';

const apiAddress = 'https://jsonplaceholder.typicode.com/albums'

const LinkAward = () => {
    const { awards, isLoading } = useData(apiAddress);

    return (
        <>
            {isLoading ? LoadingMessage : <LinkToAward awards={awards} />}
        </>

    );
};

const LoadingMessage = <>로딩중</>


export default LinkAward;