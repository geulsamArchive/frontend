import React, { useState, useRef, useCallback } from 'react';
import { Contents, Eventlist, Slide, SliderContainer, Button } from '../../style/Carousel';
import Slider from 'react-slick';
import { B, Centering, Red, TitleBold } from '../../style/StyledComponent';
import "slick-carousel/slick/slick.css";
import Modal from 'react-modal';
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { normalAPI } from '../../apis/Api';
import { translateCondition, translateType } from './../Translate';
import { CloseButton, Conditions, CriticButton, CriticDay, CriticInfos, Critics, Dates, GenreButton, ModalBottom, Modalcontent, ModalTop, NameGenre, OrderAndTime, Right } from '../../style/Critic';
import { useAuth } from '../../store/Auth';

const CriticSlide = ({ criticData, year, onDataUpdate }) => {
    const [monthIdx, setMonthIdx] = useState(0);
    const sliderRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCriticism, setSelectedCriticism] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(0);
    const [selectedTime, setSelectedTime] = useState('')

    const { logout } = useAuth();

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "200px",
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

    const openModal = (criticismId, order, date, time) => {
        setSelectedCriticism(criticismId);
        setSelectedOrder(order);
        setSelectedDate(date);
        setSelectedTime(time)
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCriticism(null);
        setSelectedOrder(0);
        setSelectedTime('')
        setSelectedDate('');
    };

    const handleDelete = async (criticismAuthorId) => {
        const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');

        if (confirmDelete) {
            const accessToken = localStorage.getItem('access');
            const refreshToken = localStorage.getItem('refresh');

            try {
                let response = await normalAPI.delete(
                    `/criticismAuthor?search=${criticismAuthorId}`,
                    {
                        headers: {
                            'accessToken': accessToken
                        }
                    }
                );
                console.log(response)
                alert('삭제가 완료되었습니다!');
                onDataUpdate();
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    console.log('토큰 재전송');
                    // Access Token이 만료되었으므로, Refresh Token으로 새로운 Access Token을 발급받는다.
                    try {
                        const tokenResponse = await normalAPI.delete(
                            `/criticismAuthor?search=${criticismAuthorId}`,
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
                            alert('삭제가 완료되었습니다!');
                            onDataUpdate();
                        }
                    } catch (err) {
                        console.error('Refresh Token Error:', err);
                        alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
                        logout();
                    }
                } else {
                    console.error('Error:', error);
                    alert('본인의 신청만 삭제 가능합니다.');
                }
            }
        }


    }

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
                    logout();
                }
            } else {
                console.error('Error:', error);
                alert('신청 중 문제가 발생했습니다.');
            }
        }
    };

    const modalStyles = {
        overlay: {
            backgroundColor: 'inherit',
        },
        content: {
            background: 'white',
            padding: 0,
            borderRadius: '8px',
            border: 'none',
            width: '350px',
            height: '200px',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            filter: 'drop-shadow(0 10px 30px rgba(152, 147, 142, 0.25))',
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
                                    <Critics key={criticIdx}>
                                        <Dates><B>{formatDate(critic.start)}</B></Dates>
                                        <Right>
                                            {critic.criticismAuthorResList.map((author, authorIdx) => (
                                                <CriticDay key={authorIdx} >
                                                    {author.userName ? (
                                                        <CriticInfos condition={author.condition} onClick={() => handleDelete(author.criticismAuthorId)}>
                                                            <NameGenre>
                                                                {author.userName}
                                                                ({translateType(author.genre)})
                                                            </NameGenre>
                                                            <OrderAndTime>
                                                                {author.order}부 ({formatTime(critic.start, author.order)})
                                                            </OrderAndTime>
                                                            <Conditions>
                                                                {translateCondition(author.condition)}
                                                            </Conditions>
                                                        </CriticInfos>
                                                    ) : (
                                                        <CriticInfos>
                                                            <OrderAndTime>
                                                                <Red>
                                                                    {author.order}부 ({formatTime(critic.start, author.order)})
                                                                </Red>
                                                            </OrderAndTime>
                                                            <CriticButton onClick={() => openModal(critic.criticismId, author.order, formatDate(critic.start), formatTime(critic.start, author.order))}>신청하기</CriticButton>
                                                        </CriticInfos>
                                                    )}
                                                </CriticDay>
                                            ))}
                                        </Right>
                                    </Critics>
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
                style={modalStyles}
            >
                <ModalTop>
                    <div>
                        <Red>
                            {selectedDate}&nbsp;{selectedOrder}부 ({selectedTime})
                        </Red>
                        <br />
                        <br />
                        <br />
                        <GenreButton onClick={() => handleApply('NOVEL')}>소설</GenreButton>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <GenreButton onClick={() => handleApply('POEM')}>시</GenreButton>
                        &nbsp;
                        &nbsp;
                        &nbsp;
                        <GenreButton onClick={() => handleApply('ESSAY')}>수필</GenreButton>
                    </div>
                </ModalTop>
                <ModalBottom>
                    <CloseButton onClick={closeModal}>닫기</CloseButton>
                </ModalBottom>
            </Modal>
        </SliderContainer>
    );
};

export default CriticSlide;
