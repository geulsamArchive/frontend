import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GridContainer, GridItems, PageButton, Paging, PosterGridContainer, Posters, PotserGridItems } from '../../../style/StyledComponent';
import Modal from '../../../components/Modal/Modal';
import Pagination from '../../../components/Paging/Pagination';
import { normalAPI } from '../../../apis/Api';
import Loading from '../../../components/Loading';



const Poster = () => {
    const [page, setPage] = useState(1); //시작 페이지 값
    const [pageTotal, setPageTotal] = useState(1); //전체 페이지 수(백엔드에서 제공)
    const [order, setOrder] = useState('asc')

    const [posterList, setPosterList] = useState([])
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedPoster, setSelectedPoster] = useState(null);

    const getPosterList = async () => {
        setLoading(true)
        try {
            const res = await normalAPI.get(`/poster?page=${page}&order=${order}`)
            console.log(res.data.data)
            setPosterList(res.data.data.content)
            setPageTotal(res.data.data.pageTotal)
        } catch (error) {
            console.log('api fetching failed', error)
        } finally {
            setLoading(false)
        }
    }

    const handlePosterClick = (poster) => {
        setSelectedPoster(poster)
        setIsOpen(true)
    }
    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > pageTotal) return;
        setPage(pageNumber)
    }
    const closeModal = () => {
        setIsOpen(false)
        setSelectedPoster(null)
        console.log(selectedPoster)
    }

    useEffect(() => {
        getPosterList()
    }, [page])

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
                    <PotserGridItems key={poster.id}>
                        <Posters src={poster.thumbnailImage} alt={poster.year} onClick={() => handlePosterClick(poster)} />
                    </PotserGridItems>
                ))}
            </PosterGridContainer>
            <Modal isOpen={isOpen} poster={selectedPoster} onClose={closeModal} />
            <Pagination page={page} totalPage={pageTotal} onChangePage={setPage} isDark='true' />
        </>
    );
};

export default Poster;