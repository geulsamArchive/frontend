import React from 'react';
import { LinkToAuthor } from './LinkToAuthor';
import { useData } from '../hooks/useData';

const apiAddress = 'https://jsonplaceholder.typicode.com/albums'

const LinkAuthor = () => {
    const { authors, isLoading } = useData(apiAddress);

    return (
        <>
            {isLoading ? LoadingMessage : <LinkToAuthor authors={authors} />}
        </>
    )
};

const LoadingMessage = <>로딩중</>


export default LinkAuthor;