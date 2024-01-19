import React from 'react';
import { LinkToCriticism } from './LinkToCriticism';
import { useData } from '../hooks/useData';

const apiAddress = 'https://jsonplaceholder.typicode.com/albums'

const LinkCriticism = () => {
    const { criticisms, isLoading } = useData(apiAddress);

    return (
        <>
            {isLoading ? LoadingMessage : <LinkToCriticism criticisms={criticisms} />}
        </>
    )
};

const LoadingMessage = <>로딩중</>


export default LinkCriticism;