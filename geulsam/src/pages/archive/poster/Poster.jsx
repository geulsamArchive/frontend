import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GridContainer, GridItems, PosterGridContainer, Posters, PotserGridItems } from '../../../style/StyledComponent';
import Modal from '../../../components/Modal/Modal';


const Poster = () => {
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState('asc')
    const [posterList, setPosterList] = useState([])
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedPoster, setSelectedPoster] = useState(null);
    const apiEndPoint = `http://3.38.162.235:8080/poster?page=${page}&order=${order}`

    const getPosterList = async () => {
        try {
            const res = await axios.get(apiEndPoint)
            setPosterList(res.data.data)
            setLoading(false)
        } catch (err) {
            console.log('api fetching failed', err)
        }
    }

    const handlePosterClick = (poster) => {
        setSelectedPoster(poster)
        setIsOpen(true)
    }
    const handlePageChange = (pageNumber) => {
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

    return (
        <>
            <PosterGridContainer>
                {posterList.map((poster) => (
                    <PotserGridItems key={poster.id}>
                        <Posters src={poster.image} alt={poster.year} onClick={() => handlePosterClick(poster)} />
                    </PotserGridItems>
                ))}
            </PosterGridContainer>
            <Modal isOpen={isOpen} poster={selectedPoster} onClose={closeModal} />
            <button onClick={() => handlePageChange(page - 1)}>이전</button>
            <button onClick={() => handlePageChange(page + 1)}>다음</button>
        </>
    );
};

export default Poster;