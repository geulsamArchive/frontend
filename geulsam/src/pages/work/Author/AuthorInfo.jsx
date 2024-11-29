import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { normalAPI } from '../../../apis/Api';
import { AuthorInfoAndButton, B, BookInfoAndButton, BookInfoContainer, BookInfoContents, BookInfos, BookTitle, NoneLinkBookInfos } from '../../../style/StyledComponent';
import { WorkInfoForAuthorInfo, AuthorWorkInfoRight, AuthorShareButtons, MobileAuthorInfoWorkContainer, AuthorWorkContainer, AuthorWorkInfo, Margin, WorkButtons, WorkCreatedAt, WorkInfo, WorkInfoRight, WorkLink, WorkTitle, WorkTitleType, WorkType } from '../../../style/Works';
import CopyURLForAuthor from '../../../components/CopyURL/CopyURLforAuthor';
import { Accordion, GuestBook } from '../../../components/Comment/Comments';
import { CheckTitleLength } from '../../../components/CheckLength';
import { Desktop } from '../../../hooks/useMediaQuery';
import Pagination from '../../../components/Paging/Pagination';

const AuthorInfo = () => {
    const { id } = useParams();
    const [author, setAuthor] = useState([])
    const [work, setWork] = useState([])
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const translateType = (type) => {
        switch (type) {
            case 'NOVEL':
                return '소설';
            case 'ESSAY':
                return '수필';
            case 'POEM':
                return '시';
            default:
                return type;
        }
    };

    const renderEmptyLogs = (count) => {
        const emptyLogs = [];
        for (let i = 0; i < count; i++) {
            emptyLogs.push(<AuthorWorkInfo key={`empty-${i}`}>&nbsp;</AuthorWorkInfo>);
        }
        return emptyLogs;
    };

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

    const getAuthorWorks = async (authorId) => {
        try {
            let url = `/content/author?page=${page}&authorId=${authorId}`
            const res = await normalAPI.get(url)
            setWork(res.data.data.content)
            console.log(res)
            setTotalPage(res.data.data.pageTotal)
        } catch (error) {
            console.log('작가 작품 로딩 오류', error)
        }
    }

    useEffect(() => {
        getAuthorInfoData(id);
        getAuthorWorks(id)
    }, [page])

    return (
        <>
            <BookInfoContainer>
                <BookTitle>
                    {author.name}
                </BookTitle>
                <AuthorInfoAndButton>
                    <BookInfoContents>
                        <NoneLinkBookInfos>
                            <B>
                                키워드
                            </B>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;  {author.keywords?.map((word) => (
                                <span>{word}</span>
                            ))}
                        </NoneLinkBookInfos>
                        <NoneLinkBookInfos>
                            <B>
                                자기소개
                            </B>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {author.introduce}
                        </NoneLinkBookInfos>
                        <MobileAuthorInfoWorkContainer>
                            {work.map((w, index) => (
                                <WorkLink to={`/work/${w.contentId}`}>
                                    <WorkInfoForAuthorInfo style={{
                                        borderBottom: index === work.length - 1 ? '1px solid rgba(129, 128, 127, 1)' : 'none',
                                    }}
                                    >
                                        <WorkTitleType>
                                            <WorkType>
                                                {translateType(w.type)}
                                            </WorkType>
                                            <WorkTitle>
                                                {CheckTitleLength(w.title, 25)}
                                            </WorkTitle>
                                        </WorkTitleType>
                                        <AuthorWorkInfoRight>
                                            <WorkCreatedAt>
                                                {w.createdAt}
                                            </WorkCreatedAt>
                                        </AuthorWorkInfoRight>
                                    </WorkInfoForAuthorInfo>
                                </WorkLink>
                            ))}
                            <Desktop>
                                {work.length < 8 && renderEmptyLogs(8 - work.length)}
                            </Desktop>
                        </MobileAuthorInfoWorkContainer>
                    </BookInfoContents>
                    <AuthorShareButtons>
                        <br />
                        <br />
                        <CopyURLForAuthor />
                    </AuthorShareButtons>
                </AuthorInfoAndButton>
            </BookInfoContainer>
            <Margin>
                <Pagination page={page} totalPage={totalPage} onChangePage={setPage} />
            </Margin>
            <Accordion name='방명록' content={GuestBook} contentId={id} />
        </>
    );
};

export default AuthorInfo;



