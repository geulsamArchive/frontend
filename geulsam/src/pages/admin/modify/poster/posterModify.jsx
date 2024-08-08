import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PosterLink,Button, HiddenButton, GridContainer, GridItems, PageButton, Paging, PosterGridContainer, Posters, PotserModifyGridItems } from '../../../../style/StyledComponent';
import Pagination from '../../../../components/Paging/Pagination';

const Poster = () => {
    const [page, setPage] = useState(1); // 시작 페이지 값
    const [pageTotal, setPageTotal] = useState(1); // 전체 페이지 수(백엔드에서 제공)
    const [order, setOrder] = useState('asc');
    const apiEndPoint = `http://43.200.215.113:8080/poster?page=${page}&order=${order}`;

    const [posterList, setPosterList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPosterList = async () => {
        try {
            const res = await axios.get(apiEndPoint);
            console.log(res.data.data);
            setPosterList(res.data.data.content);
            setPageTotal(res.data.data.pageTotal);
            setLoading(false);
        } catch (err) {
            console.log('api fetching failed', err);
        }
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > pageTotal) return;
        setPage(pageNumber);
    };

    useEffect(() => {
        getPosterList();
    }, [page]);

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= pageTotal; i++) {
            pages.push(
                <PageButton key={i} onClick={() => handlePageChange(i)} disabled={i === page}>
                    {i}
                </PageButton>
            );
        }
        return pages;
    };

    return (
        <>
            <PosterGridContainer>
                {posterList.map((poster) => (
                    <PotserModifyGridItems key={poster.id} >
                        <PosterLink  to={`/poster/modify/${poster.posterId}`}>
                            <HiddenButton>수정하기</HiddenButton>
                            <Posters src={poster.thumbnailImage} alt={poster.year} />
                        </PosterLink>
                    </PotserModifyGridItems>
                ))}
            </PosterGridContainer>
            <Pagination page={page} totalPage={pageTotal} onChangePage={setPage} />
        </>
    );
};

export default Poster;
