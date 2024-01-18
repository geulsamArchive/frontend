import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthorInfoApi } from '../../apis/AuthorInfoApi';
import Authorpage from './Authorpage';
import { AuthorNovelApi } from '../../apis/AuthorNovelApi';

const AuthorInfo = () => {
    const [authorInfo, setAuthorInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [works, setWorks] = useState([])
    const { id } = useParams();

    const getData = async () => {
        try {
            const authordata = await AuthorInfoApi(id);
            const noveldata = await AuthorNovelApi(id);
            setAuthorInfo(authordata);
            setWorks(noveldata);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData();
    })

    return (
        <>
            {isLoading ? LoadingMessage : <Authorpage author={authorInfo} work={works} />}
        </>
    );
};

const LoadingMessage = <>로딩중</>

export default AuthorInfo;