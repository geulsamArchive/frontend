import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { normalAPI } from '../../../apis/Api';
import { B, BookInfoAndButton, BookInfoContainer, BookInfoContents, BookInfos, BookTitle } from '../../../style/StyledComponent';
import { WorkButtons } from '../../../style/Works';
import CopyURL from '../../../components/CopyURL/CopyURL';
import { Accordion } from '../../../components/Comment/Comments';

const AuthorInfo = () => {
    const { id } = useParams();
    const [author, setAuthor] = useState([])

    const getAuthorInfoData = async (authorId) => {
        try {
            let url = `/user/author?id=${authorId}`
            const res = await normalAPI.get(url)
            setAuthor(res.data.data)
            console.log(res)
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        getAuthorInfoData(id);
    }, [])

    return (
        <>
            <BookInfoContainer>
                <BookTitle>
                    {author.name}
                </BookTitle>
                <BookInfoAndButton>
                    <BookInfoContents>
                        <BookInfos>
                            <B>
                                자기소개
                            </B>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;
                            {author.introduce}
                        </BookInfos>
                        <BookInfos>
                            <B>
                                키워드
                            </B>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;  {author.keywords?.map((word) => (
                                <span>{word}</span>
                            ))}
                        </BookInfos>
                    </BookInfoContents>
                    <WorkButtons>
                        <br />
                        <br />
                        <CopyURL />
                    </WorkButtons>
                </BookInfoAndButton>
            </BookInfoContainer>
            <Accordion name='방명록' />
        </>
    );
};

export default AuthorInfo;