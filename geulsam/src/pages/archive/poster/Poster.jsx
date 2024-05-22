import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GridContainer, GridItems, Posters } from '../../../style/StyledComponent';
import Modal from '../../../components/Modal/Modal';

const apiEndPoint = "http://3.38.162.235:8080/poster?page=1&order=asc"

const Poster = () => {
    const [posterList, setPosterList] = useState([])
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [selectedPoster, setSelectedPoster] = useState(null);

    const getPosterList = async () => {
        try {
            const res = await axios.get(apiEndPoint)
            console.log(res.data)
            setPosterList(res.data.data)
            setLoading(false)
        } catch (err) {
            console.log('api fetching failed', err)
        }
    }

    const handlePosterClink = (poster) => {
        setSelectedPoster(poster)
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
        setSelectedPoster(null)
    }

    useEffect(() => {
        getPosterList()
    }, [])

    return (
        <>
            <GridContainer>
                {posterList.map((poster) => (
                    <GridItems key={poster.id}>
                        <Posters src={poster.image} alt={poster.year} onClick={handlePosterClink} />
                        <Modal isOpen={isOpen} poster={selectedPoster} onClose={closeModal} />
                    </GridItems>
                ))}
            </GridContainer>
        </>
    );
};

export default Poster;