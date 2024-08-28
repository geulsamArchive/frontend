import React, { useState, useRef, useCallback } from 'react';
import { Contents, Eventlist, Slide, SliderContainer, Button } from '../../style/Carousel';
import Slider from 'react-slick';
import { TitleBold } from '../../style/StyledComponent';
import "slick-carousel/slick/slick.css";
import Modal from 'react-modal';
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

const CriticSlide = ({ criticData, year, onDataUpdate }) => {
    const [monthIdx, setMonthIdx] = useState(0);
    const sliderRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCriticism, setSelectedCriticism] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(0);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "50px",
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 300,
        arrows: false,
        beforeChange: (current, next) => setMonthIdx(next)
    };

    const onClickSlide = useCallback((idx) => {
        setMonthIdx(idx);
        sliderRef.current.slickGoTo(idx);
    }, []);

    const formatTime = (startTime, order) => {
        const start = new Date(startTime);
        const end = new Date(start.getTime() + order * 60 * 60 * 1000);
        const startFormatted = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        const endFormatted = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        return `${startFormatted} ~ ${endFormatted}`;
    };

    const formatDate = (startTime) => {
        const start = new Date(startTime);
        return `${start.getMonth() + 1}월 ${start.getDate()}일`;
    };

    const openModal = (criticismId, order, date) => {
        setSelectedCriticism(criticismId);
        setSelectedOrder(order);
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCriticism(null);
        setSelectedOrder(0);
        setSelectedDate('');
    };

    const handleApply = async (genre) => {
        const accessToken = localStorage.getItem('access');
        const refreshToken = localStorage.getItem('refresh');
        console.log(selectedCriticism, selectedOrder, genre);

        try {
            let response = await axios.post(
                'https://geulsaem.store/criticismAuthor',
                {
                    criticismId: selectedCriticism,
                    order: selectedOrder,
                    genre: genre
                },
                {
                    headers: {
                        'accessToken': accessToken
                    }
                }
            );

            alert('신청이 완료되었습니다!');
            onDataUpdate();
            closeModal();
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.log('토큰 재전송');

                // Access Token이 만료되었으므로, Refresh Token으로 새로운 Access Token을 발급받는다.
                try {
                    const tokenResponse = await axios.post(
                        'https://geulsaem.store/criticismAuthor',
                        {
                            criticismId: selectedCriticism,
                            order: selectedOrder,
                            genre: genre
                        },
                        {
                            headers: {
                                'refreshToken': refreshToken,
                            }
                        }
                    );
                    console.log(tokenResponse);
                    if (tokenResponse.status === 200) {
                        const accessToken = tokenResponse.headers.accesstoken.replace('Bearer ', '')
                        localStorage.setItem('access', accessToken)
                        const refreshToken = tokenResponse.headers.refreshtoken.replace('Bearer ', '')
                        localStorage.setItem('refresh', refreshToken)
                        alert('신청이 완료되었습니다!');
                        onDataUpdate();
                        closeModal();
                    } else {
                        throw new Error('Refresh Token 재발급에 실패했습니다.');
                    }
                } catch (err) {
                    console.error('Refresh Token Error:', err);
                    alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
                }
            } else {
                console.error('Error:', error);
                alert('신청 중 문제가 발생했습니다.');
            }
        }
    };

    return (
        <SliderContainer>
            <Slider ref={sliderRef} {...settings}>
                {criticData.map((monthdata, idx) => (
                    <div key={idx}>
                        <Slide className={idx === monthIdx ? "active" : ""} onClick={() => onClickSlide(idx)}>
                            <TitleBold>
                                {year}년 {monthdata.month}월
                            </TitleBold>
                            <Contents>
                                {monthdata.criticismRes?.map((critic, criticIdx) => (
                                    <div key={criticIdx}>
                                        {critic.criticismAuthorResList.map((author, authorIdx) => (
                                            <Eventlist key={authorIdx}>
                                                {authorIdx === 0 && (
                                                    <div>{formatDate(critic.start)}</div>
                                                )}
                                                {author.order}부 (
                                                {formatTime(critic.start, author.order)})
                                                {author.userName ? (
                                                    <>
                                                        <div>
                                                            {author.userName}
                                                            {author.genre}
                                                            {author.condition}</div>
                                                    </>
                                                ) : (
                                                    <Button onClick={() => openModal(critic.criticismId, author.order, formatDate(critic.start))}>신청하기</Button>
                                                )}
                                            </Eventlist>
                                        ))}
                                    </div>
                                ))}
                            </Contents>
                        </Slide>
                    </div>
                ))}
            </Slider>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="신청하기"
            >
                {selectedDate}
                {selectedOrder}부
                <div>
                    <button onClick={() => handleApply('NOVEL')}>소설</button>
                    <button onClick={() => handleApply('POEM')}>시</button>
                    <button onClick={() => handleApply('ESSAY')}>수필</button>
                </div>
                <button onClick={closeModal}>닫기</button>
            </Modal>
        </SliderContainer>
    );
};

export default CriticSlide;
