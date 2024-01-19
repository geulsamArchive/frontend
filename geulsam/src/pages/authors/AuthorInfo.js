import React from 'react';
import { useParams } from 'react-router-dom';
import Authorpage from './Authorpage';
import { useData } from '../../hooks/useData';

const apiAddressAuthor = ''
const apiAddressWork = ''

const AuthorInfo = () => {
    const { id } = useParams();
    const { authorInfo, isLoading } = useData(apiAddressAuthor, id);
    const { works, isLoading2 } = useData(apiAddressWork, id)

    return (
        <>
            {isLoading ? LoadingMessage : <Authorpage author={authorInfo} work={works} />}
            {isLoading2 ? <>작업정보로딩중</> : ''}
        </>
    );
};

const LoadingMessage = <>로딩중</>

export default AuthorInfo;