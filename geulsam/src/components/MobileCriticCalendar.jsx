import React, { useState } from 'react';
import { CalendarContainer, CriticContainer, CriticDayes, CriticInfoTop, CriticTop, MobileCalendarContainer } from '../style/MobileCalendar';
import { BookTitle, Red, TitleBold } from '../style/StyledComponent';
import { formatTime } from './Carousel/CriticSlide';
import { CloseButton, Conditions, CriticButton, CriticDay, CriticInfos, GenreButton, ModalBottom, ModalTop, NameGenre, OrderAndTime } from '../style/Critic';
import { translateCondition, translateType } from './Translate';
import Modal from 'react-modal';
import axios from 'axios';
import { useAuth } from '../store/Auth';
import { normalAPI } from '../apis/Api';

const getDayOfWeek = (datestr) => { //ex) getDayOfWeek('2022-06-13')

    const week = ['일', '월', '화', '수', '목', '금', '토'];

    const dayOfWeek = week[new Date(datestr).getDay()];

    return dayOfWeek;

}

const MobileCriticCalendar = ({ criticData, onDataUpdate }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCriticism, setSelectedCriticism] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(0);
    const [selectedTime, setSelectedTime] = useState('')

    const { logout } = useAuth();

    const handleApply = async (genre) => {
        const accessToken = localStorage.getItem('access');
        const refreshToken = localStorage.getItem('refresh');
        console.log(selectedCriticism, selectedOrder, genre);

        try {
            let response = await normalAPI.post(
                '/criticismAuthor',
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
                    const tokenResponse = await normalAPI.post(
                        '/criticismAuthor',
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
                        const newAccessToken = tokenResponse.headers.accesstoken.replace('Bearer ', '')
                        localStorage.setItem('access', newAccessToken)
                        const newRefreshToken = tokenResponse.headers.refreshtoken.replace('Bearer ', '')
                        localStorage.setItem('refresh', newRefreshToken)
                        alert('신청이 완료되었습니다!');
                        onDataUpdate();
                        closeModal();
                    }
                } catch (err) {
                    console.error('Refresh Token Error:', err);
                    alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
                    logout();
                    closeModal();
                }
            } else {
                console.error('Error:', error);

                const errorMessage = error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : '오류가 발생했습니다. 다시 시도해주세요.';

                alert(errorMessage);
            }
        }
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
                            const newAccessToken = tokenResponse.headers.accesstoken.replace('Bearer ', '')
                            localStorage.setItem('access', newAccessToken)
                            const newRefreshToken = tokenResponse.headers.refreshtoken.replace('Bearer ', '')
                            localStorage.setItem('refresh', newRefreshToken)
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


    const formatDate = (startTime) => {
        const start = new Date(startTime);
        return `${start.getDate()}일(${getDayOfWeek(start)})`;
    };

    const date = new Date();
    const yearNow = date.getFullYear();

    const [monthIdx, setMonthIdx] = useState(0);

    const handleNextMonth = () => {
        setMonthIdx((prevIdx) => Math.min(prevIdx + 1, criticData.length - 1));
    };

    const handlePreviousMonth = () => {
        setMonthIdx((prevIdx) => Math.max(prevIdx - 1, 0));
    };

    if (!criticData || !criticData[monthIdx]) return <div>로딩중입니다.</div>;




    const modalStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
        content: {
            background: 'white',
            padding: 0,
            borderRadius: '8px',
            border: 'none',
            width: '90dvw',
            height: '200px',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            filter: 'drop-shadow(0 10px 30px rgba(152, 147, 142, 0.25))',
        }
    };

    return (
        <MobileCalendarContainer>
            <BookTitle>
                금학기 합평 신청 및 승인 확인
            </BookTitle>
            <CriticContainer>
                <CriticTop>
                    {monthIdx > 0 ? (
                        <svg onClick={handlePreviousMonth} width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.35 1.1333L1.98334 8.49997L9.35 15.8666" stroke="#575655" stroke-width="2.26667" stroke-linecap="round" />
                        </svg>
                    ) : (
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    )}
                    <TitleBold>
                        {yearNow}년 {criticData[monthIdx].month}월
                    </TitleBold>
                    {monthIdx < criticData.length - 1 ? (
                        <svg onClick={handleNextMonth} width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg" transform='rotate(180)'>
                            <path d="M9.35 1.1333L1.98334 8.49997L9.35 15.8666" stroke="#575655" stroke-width="2.26667" stroke-linecap="round" />
                        </svg>
                    ) : (
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                    )}
                </CriticTop>
                {criticData[monthIdx].criticismRes?.map((critic, criticIdx) => (
                    <CriticDayes>
                        <CriticInfoTop>
                            {formatDate(critic.start)}
                        </CriticInfoTop>
                        {critic.criticismAuthorResList.map((author, authorIdx) => (
                            <CriticDay key={authorIdx} >
                                {author.userName ? (
                                    <CriticInfos condition={author.condition}>
                                        <NameGenre>
                                            {author.userName}
                                            ({translateType(author.genre)})
                                        </NameGenre>
                                        <OrderAndTime>
                                            {author.order}부 ({formatTime(critic.start, author.order)})
                                        </OrderAndTime>
                                        <Conditions>
                                            {author.condition === 'UNFIXED' ?
                                                <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => handleDelete(author.criticismAuthorId)}>
                                                    <path d="M7.48286 7.16895L14.1171 13.4109" stroke="#81807F" stroke-width="1.91314" stroke-linecap="round" />
                                                    <path d="M14.1171 7.16895L7.48286 13.4109" stroke="#81807F" stroke-width="1.91314" stroke-linecap="round" />
                                                </svg>
                                                : translateCondition(author.condition)}
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
                    </CriticDayes>
                ))}

            </CriticContainer>
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
        </MobileCalendarContainer>
    );
};

export default MobileCriticCalendar;