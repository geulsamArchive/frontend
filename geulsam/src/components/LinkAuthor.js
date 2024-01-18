import React, { useEffect, useState } from 'react';
import { AuthorNameApi } from '../apis/AuthorNamesApi';
import { LinkToAuthor } from './LinkToAuthor';

const LinkAuthor = () => {
    const [authors, setAuthors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getData = async () => {
        try {
            const data = await AuthorNameApi();
            setAuthors(data);
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
            {isLoading ? LoadingMessage : <LinkToAuthor authors={authors} />}
        </>
    )
};

const LoadingMessage = <>로딩중</>


export default LinkAuthor;