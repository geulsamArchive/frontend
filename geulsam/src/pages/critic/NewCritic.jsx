import React, { useEffect, useState } from 'react';
import SearchWork from '../../components/Search/SearchWork';
import {
    CriticLogContainer,
    CriticLogsContainer,
    LogDate,
    LogLeft,
    MobileLogName,
    LogName,
    LogPassword,
    LogRight,
    Logs,
    LogSearchFailed,
    LogTitle,
    LogType,
    LogURL,
    LogURLMobile,
    MarginRight,
    MarginLeft,
    ModalBottom,
    ModalTop,
} from '../../style/Critic';
import { Accordion } from '../../components/Comment/Comments';
import { Centering, Red } from '../../style/StyledComponent';
import { normalAPI } from '../../apis/Api';
import { translateType } from '../../components/Translate';
import Pagination from '../../components/Paging/Pagination';
import { CheckTitleLength } from './../../components/CheckLength';
import { Desktop, Mobile } from '../../hooks/useMediaQuery';
import CriticLogModal from './CriticLogModal';


export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const NewCritic = () => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [criticList, setCriticList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null); // 선택된 합평 로그 저장


    const openCriticLogModal = (log) => {
        setSelectedLog(log); // 선택된 로그 저장
        setIsModalOpen(true);
    };

    const closeCriticLogModal = () => {
        setIsModalOpen(false);
        setSelectedLog(null); // 모달 닫을 때 선택된 로그 초기화
    };
    const getCriticLogs = async () => {
        try {
            let url = `/criticismLog?page=${page}`;

            if (keyword) {
                url += `&keyword=${keyword}`;
            }
            const response = await normalAPI.get(url);
            console.log(response);
            setCriticList(response.data.data.content);
            setTotalPage(response.data.data.pageTotal);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCopyClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('클로버노트의 비밀번호가 복사되었어요. Ctrl+V를 입력해주세요');
        } catch (err) { }
    };

    useEffect(() => {
        getCriticLogs();
    }, [page, keyword]);

    const handleSearch = (newkeyword) => {
        setKeyword(newkeyword);
        setPage(1);
    };
    const renderEmptyLogs = (count) => {
        const emptyLogs = [];
        for (let i = 0; i < count; i++) {
            emptyLogs.push(<Logs key={`empty-${i}`}>&nbsp;</Logs>);
        }
        return emptyLogs;
    };

    return (
        <>
            <Desktop>
                <CriticLogContainer>
                    <Centering>
                        <MarginLeft>
                            <SearchWork
                                onSearch={handleSearch}
                                placeholder="찾으시는 합평회의 제목, 작가, 날짜를 입력해주세요."
                            />
                        </MarginLeft>
                    </Centering>
                    <br />
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
                                            <LogType>{translateType(log.genre)}</LogType>
                                            <LogTitle>
                                                {CheckTitleLength(log.contentTitle, 25)}
                                            </LogTitle>
                                        </LogLeft>
                                        <LogRight>
                                            <LogName>{log.userName}</LogName>
                                            <LogDate>{formatDate(log.localDate)}</LogDate>
                                            <LogPassword
                                                onClick={() =>
                                                    handleCopyClipBoard(`${log.cloverNotePassword}`)
                                                }
                                            >
                                                {log.cloverNotePassword}
                                            </LogPassword>
                                            <LogURL target="_blank" href={log.cloverNoteUrl}></LogURL>
                                            {/* <LogURLMobile target="_blank" href={log.cloverNoteUrl}>
                                            합평 기록 
                                        </LogURLMobile> */}
                                        </LogRight>
                                    </Logs>
                                ))}
                                {criticList.length < 12 &&
                                    renderEmptyLogs(12 - criticList.length)}{' '}
                            </>
                        )}
                    </CriticLogsContainer>
                </CriticLogContainer>
                <Pagination page={page} totalPage={totalPage} onChangePage={setPage} />{' '}
            </Desktop>
            <Mobile>
                <CriticLogContainer>
                    <Centering>
                        <MarginLeft>
                            <SearchWork
                                onSearch={handleSearch}
                                placeholder="찾으시는 합평회의 제목, 작가, 날짜를 입력해주세요."
                            />
                        </MarginLeft>
                    </Centering>
                    <br />
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
                                    <Logs onClick={() => openCriticLogModal(log)} key={log.id}>
                                        {isModalOpen && selectedLog && (
                                            <CriticLogModal
                                                isModalOpen={isModalOpen}
                                                closeModal={closeCriticLogModal}
                                                logTitle={selectedLog.contentTitle}  // 제목
                                                logDate={formatDate(selectedLog.localDate)}  // 날짜
                                                logPassword={selectedLog.cloverNotePassword}  // 비밀번호
                                                logUrl={selectedLog.cloverNoteUrl}
                                            />)}
                                        <LogLeft>
                                            <MobileLogName>{log.userName}</MobileLogName>
                                            <LogTitle>
                                                {CheckTitleLength(log.contentTitle, 25)}
                                            </LogTitle>
                                        </LogLeft>
                                        <LogRight>

                                            <LogDate>{formatDate(log.localDate)}</LogDate>
                                            {/*<LogPassword
                                                onClick={() =>
                                                    handleCopyClipBoard(`${log.cloverNotePassword}`)
                                                }
                                            >
                                                {log.cloverNotePassword}
                                            </LogPassword>*/}
                                            {/*<LogURL target="_blank" href={log.cloverNoteUrl}></LogURL>*/}
                                            {/* <LogURLMobile target="_blank" href={log.cloverNoteUrl}>
                                            합평 기록 
                                        </LogURLMobile> */}
                                        </LogRight>
                                    </Logs>
                                ))}
                                {criticList.length < 12 &&
                                    renderEmptyLogs(12 - criticList.length)}{' '}
                            </>
                        )}
                    </CriticLogsContainer>
                </CriticLogContainer>
                <Pagination page={page} totalPage={totalPage} onChangePage={setPage} />{' '}
            </Mobile>
        </>
    );
};

export default NewCritic;
