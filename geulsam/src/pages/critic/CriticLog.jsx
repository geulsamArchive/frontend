import React, { useEffect, useState } from 'react';
import SearchWork from '../../components/Search/SearchWork';
import { CriticLogContainer, CriticLogsContainer, MarginRight, ModalBottom, ModalTop } from '../../style/Critic';
import { Centering } from '../../style/StyledComponent';
import { normalAPI } from '../../apis/Api';
import { translateType } from '../../components/Translate';
import Pagination from '../../components/Paging/Pagination';

const CriticLogs = () => {



}



const CriticLog = () => {
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [criticList, setCriticList] = useState([])
    const [keyword, setKeyword] = useState('')


    const getCriticLogs = async () => {
        try {
            const response = await normalAPI.get(`/criticismLog?page=${page}`)
            console.log(response)
            setCriticList(response.data.data.content)
            setTotalPage(response.data.data.pageTotal)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getCriticLogs();
    }, [page])

    return (
        <>
            <CriticLogContainer>
                <Centering>
                    <MarginRight>
                        <SearchWork placeholder='찾으시는 합평회의 제목, 작가, 날짜를 입력해주세요.' />
                    </MarginRight>
                </Centering>
                <CriticLogsContainer>
                    <hr />
                    {criticList.map((log) => (
                        <div>
                            {translateType(log.genre)}   {log.contentTitle} {log.userName} {log.localDate} {log.cloverNotePassword} <a href={log.cloverNoteUrl}>합평 기록 바로가기</a>
                            <hr />
                        </div>
                    ))}
                </CriticLogsContainer>
            </CriticLogContainer>
            <Pagination isDark='true' page={page} totalPage={totalPage} onChangePage={setPage} />
        </>
    );
};

export default CriticLog;

