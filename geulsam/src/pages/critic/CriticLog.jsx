import React, { useEffect, useState } from 'react';
import SearchWork from '../../components/Search/SearchWork';
import { CriticLogContainer, CriticLogsContainer, LogDate, LogLeft, LogName, LogPassword, LogRight, Logs, LogSearchFailed, LogTitle, LogType, LogURL, MarginRight, ModalBottom, ModalTop } from '../../style/Critic';
import { Centering, Red } from '../../style/StyledComponent';
import { normalAPI } from '../../apis/Api';
import { translateType } from '../../components/Translate';
import Pagination from '../../components/Paging/Pagination';
import { CheckTitleLength } from './../../components/CheckLength';


export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const CriticLog = () => {
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [criticList, setCriticList] = useState([])
    const [keyword, setKeyword] = useState('')


    const getCriticLogs = async () => {
        try {
            let url = `/criticismLog?page=${page}`

            if (keyword) {
                url += `&keyword=${keyword}`
            }
            const response = await normalAPI.get(url)
            console.log(response)
            setCriticList(response.data.data.content)
            setTotalPage(response.data.data.pageTotal)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getCriticLogs();
    }, [page, keyword])

    const handleSearch = (newkeyword) => {
        setKeyword(newkeyword)
        setPage(1)
    }
    const renderEmptyLogs = (count) => {
        const emptyLogs = [];
        for (let i = 0; i < count; i++) {
            emptyLogs.push(<Logs key={`empty-${i}`}>&nbsp;</Logs>);
        }
        return emptyLogs;
    };

    return (
        <>
            <CriticLogContainer>
                <Centering>
                    <MarginRight>
                        <SearchWork onSearch={handleSearch} placeholder='찾으시는 합평회의 제목, 작가, 날짜를 입력해주세요.' />
                    </MarginRight>
                </Centering>
                <CriticLogsContainer>
                    {criticList.length === 0 ? (
                        <>
                            <LogSearchFailed>
                                <Red>'{keyword}'</Red>에 해당하는 검색결과를 찾을 수 없습니다.
                            </LogSearchFailed>
                            <Logs>&nbsp;</Logs>
                            <Logs>&nbsp;</Logs>
                            <Logs>&nbsp;</Logs>
                            <Logs>&nbsp;</Logs>
                            <Logs>&nbsp;</Logs>
                            <Logs>&nbsp;</Logs>
                            <Logs>&nbsp;</Logs>
                            <Logs>&nbsp;</Logs>
                            <Logs>&nbsp;</Logs>
                            <Logs>&nbsp;</Logs>
                            <Logs>&nbsp;</Logs>
                        </>
                    ) : (
                        <>
                            {criticList.map((log) => (
                                <Logs>
                                    <LogLeft>
                                        <LogType>
                                            {translateType(log.genre)}
                                        </LogType>
                                        <LogTitle>
                                            {CheckTitleLength(log.contentTitle, 25)}
                                        </LogTitle>
                                    </LogLeft>
                                    <LogRight>
                                        <LogName>
                                            {log.userName}
                                        </LogName>
                                        <LogDate>
                                            {formatDate(log.localDate)}
                                        </LogDate>
                                        <LogPassword>
                                            {log.cloverNotePassword}
                                        </LogPassword>
                                        <LogURL href={log.cloverNoteUrl}>
                                            합평 기록 바로가기
                                        </LogURL>
                                    </LogRight>
                                </Logs>
                            ))}
                            {criticList.length < 12 && renderEmptyLogs(12 - criticList.length)}  </>
                    )}
                </CriticLogsContainer>
            </CriticLogContainer>
            <Pagination isDark='true' page={page} totalPage={totalPage} onChangePage={setPage} />
        </>
    );
};

export default CriticLog;

