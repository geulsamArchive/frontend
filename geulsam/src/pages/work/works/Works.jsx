import React, { useEffect, useState } from 'react';
import { BookButtons, BookInfoAndButton, BookInfoContainer, BookInfoContents, BookInfos, BookTitle, Button, Red, Right } from '../../../style/StyledComponent';
import { normalAPI } from '../../../apis/Api';
import CopyURL from '../../../components/CopyURL/CopyURL';
import Pagination from '../../../components/Paging/Pagination';
import { GenreButton, Margin, Searchfailed, Space, WorkAwards, WorkButtons, WorkCreatedAt, WorkInfo, WorkInfoContainer, WorkInfoRight, WorkLink, WorkTitle, WorkTitleType, WorkTopBorder, WorkType } from '../../../style/Works';
import SearchWork from '../../../components/Search/SearchWork';
import { CheckTitleLength } from './../../../components/CheckLength';
import { useAuth } from '../../../store/Auth';

const Works = () => {
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [workList, setWorkList] = useState([])
    const [keyword, setKeyword] = useState('')
    const [genre, setGenre] = useState('');


    const { logout } = useAuth();

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

    const getWorkData = async () => {
        const accesstoken = localStorage.getItem('access')
        const refreshToken = localStorage.getItem('refresh')
        try {
            let url = `/content?page=${page}&genre=${genre}`;

            // keyword가 존재하면 URL에 추가
            if (keyword) {
                url += `&keyword=${keyword}`;
            }
            const response = await normalAPI.get(url, {
                headers: {
                    'accessToken': accesstoken
                }
            })
            console.log(response)

            const updatedWorkList = response.data.data.content.map(work => ({
                ...work,
                type: translateType(work.type)
            }));

            setWorkList(updatedWorkList);
            setTotalPage(response.data.data.pageTotal)

        } catch (err) {
            console.error(err)
            try {
                let url = `/content?page=${page}&genre=${genre}`;

                // keyword가 존재하면 URL에 추가
                if (keyword) {
                    url += `&keyword=${keyword}`;
                }

                const newResult = await normalAPI.get(url, {
                    headers: {
                        'refreshToken': refreshToken
                    }
                })

                const newAccessToken = newResult.headers.accesstoken.replace('Bearer ', '')
                localStorage.setItem('access', newAccessToken)
                if (newResult.headers.refreshtoken) {
                    const newRefreshToken = newResult.headers.refreshtoken.replace('Bearer ', '')
                    localStorage.setItem('refresh', newRefreshToken)
                }
                const updatedWorkList = newResult.data.data.content.map(work => ({
                    ...work,
                    type: translateType(work.type)
                }));

                setWorkList(updatedWorkList);
                setTotalPage(newResult.data.data.pageTotal)
            } catch (error) {
                alert('로그인이 만료되었습니다. 다시 로그인해주세요.')
                logout();
            }
        }

    }

    useEffect(() => {
        getWorkData()
        console.log(workList)
    }, [page, keyword, genre])

    const handleSearch = (newKeyword) => {
        setKeyword(newKeyword);
        setPage(1); // 검색 시 페이지를 1로 초기화
    };

    const handleGenreClick = (genre) => {
        setGenre(genre)
        setPage(1)
    }

    const handleSearchClear = () => {
        setKeyword('')
        setPage(1)
        setGenre('')
    }

    const renderEmptyLogs = (count) => {
        const emptyLogs = [];
        for (let i = 0; i < count; i++) {
            emptyLogs.push(<WorkInfo key={`empty-${i}`}>&nbsp;</WorkInfo>);
        }
        return emptyLogs;
    };


    return (
        <div>
            <SearchWork onSearch={handleSearch} placeholder='찾으시는 작품의 제목이나 작가명을 적어주세요.' />
            <button onClick={handleSearchClear}> 검색결과 초기화</button>
            <WorkInfoContainer>
                <WorkTopBorder />
                <BookInfoAndButton>
                    <BookInfoContents>
                        {workList.length === 0 ? (
                            <div>
                                <Searchfailed><Red>'{keyword}'</Red>에 해당하는 검색결과를 찾을 수 없습니다.</Searchfailed>
                                <WorkInfo>&nbsp;</WorkInfo>
                                <WorkInfo>&nbsp;</WorkInfo>
                                <WorkInfo>&nbsp;</WorkInfo>
                                <WorkInfo>&nbsp;</WorkInfo>
                                <WorkInfo>&nbsp;</WorkInfo>
                                <WorkInfo>&nbsp;</WorkInfo>
                                <WorkInfo>&nbsp;</WorkInfo>
                                <WorkInfo>&nbsp;</WorkInfo>
                                <WorkInfo>&nbsp;</WorkInfo>
                                <WorkInfo>&nbsp;</WorkInfo>
                                <WorkInfo>&nbsp;</WorkInfo>
                            </div>
                        ) : (
                            <>
                                {workList.map((work) => (
                                    <div key={work.id}>
                                        <WorkLink to={`/work/${work.contentId}`}>
                                            <WorkInfo>
                                                <WorkTitleType>
                                                    <WorkType>
                                                        {work.type}
                                                    </WorkType>
                                                    <WorkTitle>
                                                        {CheckTitleLength(work.title, 25)}
                                                    </WorkTitle>
                                                </WorkTitleType>
                                                <WorkInfoRight>
                                                    <WorkCreatedAt>
                                                        {work.awards && work.awards.length > 0 && (
                                                            <WorkAwards>
                                                                {work.awards.join(', ')}
                                                            </WorkAwards>
                                                        )}
                                                        {work.author}
                                                        <Space />
                                                        {work.createdAt}
                                                    </WorkCreatedAt>
                                                </WorkInfoRight>
                                            </WorkInfo>
                                        </WorkLink>
                                    </div>
                                ))}
                                {workList.length < 12 && renderEmptyLogs(12 - workList.length)}
                            </>
                        )}
                    </BookInfoContents>
                    <WorkButtons>
                        <GenreButton disabled={genre === ''} onClick={() => handleGenreClick('')}>전체</GenreButton>
                        <GenreButton disabled={genre === 'NOVEL'} onClick={() => handleGenreClick('NOVEL')}>소설</GenreButton>
                        <GenreButton disabled={genre === 'ESSAY'} onClick={() => handleGenreClick('ESSAY')}>수필</GenreButton>
                        <GenreButton disabled={genre === 'POEM'} onClick={() => handleGenreClick('POEM')}>시</GenreButton>
                    </WorkButtons>
                </BookInfoAndButton>
            </WorkInfoContainer >
            <Margin>
                <Pagination page={page} totalPage={totalPage} onChangePage={setPage} />
            </Margin>
        </div>
    );
};

export default Works;