import React, { useState } from 'react';
import SearchWork from '../../components/Search/SearchWork';
import { CriticLogContainer, MarginRight } from '../../style/Critic';
import { Centering } from '../../style/StyledComponent';

const CriticLog = () => {
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [criticList, setCriticList] = useState([])
    const [keyword, setKeyword] = useState('')

    return (
        <CriticLogContainer>
            <Centering>
                <MarginRight>
                    <SearchWork placeholder='찾으시는 합평회의 제목, 작가, 날짜를 입력해주세요.' />
                </MarginRight>
            </Centering>
        </CriticLogContainer>
    );
};

export default CriticLog;