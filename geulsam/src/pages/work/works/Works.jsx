import React, { useEffect, useState } from 'react';
import { BookButtons, BookInfoAndButton, BookInfoContainer, BookInfoContents, BookInfos, BookTitle, Right } from '../../../style/StyledComponent';
import { normalAPI } from '../../../apis/Api';
import CopyURL from '../../../components/CopyURL/CopyURL';
import Pagination from '../../../components/Paging/Pagination';
import { WorkAwards, WorkButtons, WorkInfo, WorkInfoContainer, WorkLink, WorkTitleType, WorkTopBorder, WorkType } from '../../../style/Works';
import SearchWork from '../../../components/Search/SearchWork';

const Works = () => {
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [workList, setWorkList] = useState([])
    const [keyword, setKeyword] = useState('')

    const translateType = (type) => {
        switch (type) {
            case 'NOVEL':
                return '소설';
            case 'ESSAY':
                return '에세이';
            case 'POEM':
                return '시';
            default:
                return type;
        }
    };

    const getWorkData = async () => {
        try {
            const response = await normalAPI.get(`/content?page=${page}&keyword=${keyword}`)
            console.log(response)

            const updatedWorkList = response.data.data.content.map(work => ({
                ...work,
                type: translateType(work.type)
            }));

            setWorkList(updatedWorkList);
            setTotalPage(response.data.data.pageTotal)

        } catch (err) {
            console.error(err)
        }

    }

    useEffect(() => {
        getWorkData()
        console.log(workList)
    }, [page, keyword])

    const handleSearch = (newKeyword) => {
        setKeyword(newKeyword);
        setPage(1); // 검색 시 페이지를 1로 초기화
    };

    return (
        <div>
            <SearchWork onSearch={handleSearch} />
            <WorkInfoContainer>
                <WorkTopBorder />
                <BookInfoAndButton>
                    <BookInfoContents>
                        {workList.length === 0 ? (
                            <div> 검색결과없음</div>
                        ) : (
                            workList.map((work) => (
                                <div key={work.id}>
                                    <WorkLink to={`/work/${work.contentId}`}>
                                        <WorkInfo>
                                            <WorkTitleType>
                                                <WorkType>
                                                    {work.type}
                                                </WorkType>
                                                <div>
                                                    {work.title}
                                                </div>
                                            </WorkTitleType>

                                            <div>
                                                {work.awards && work.awards.length > 0 && (
                                                    <WorkAwards>
                                                        {work.awards.join(', ')}
                                                    </WorkAwards>
                                                )}
                                                {work.author}
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                &nbsp;&nbsp;&nbsp;&nbsp;

                                                {work.createdAt}
                                                &nbsp;
                                                &nbsp;
                                                &nbsp;
                                            </div>
                                        </WorkInfo>
                                    </WorkLink>
                                </div>
                            ))
                        )}
                    </BookInfoContents>
                    <WorkButtons>
                        <br />
                        <br />
                        <CopyURL />
                    </WorkButtons>
                </BookInfoAndButton>
            </WorkInfoContainer >
            <Pagination page={page} totalPage={totalPage} onChangePage={setPage} />
        </div>
    );
};

export default Works;