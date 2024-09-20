import React, { useState, useRef, useCallback, useEffect } from 'react';
import { WorkTopBorder } from '../../../style/Works';
import { normalAPI } from '../../../apis/Api';
import { Content, CriticContainer, Slide, SliderContainer } from '../../../style/admin/critic';
import Slider from 'react-slick';
import { TitleBold } from '../../../style/StyledComponent';
import { translateCondition, translateType } from '../../../components/Translate';

const AdminCritic = () => {
    const [criticData, setCriticData] = useState([])
    const [monthIdx, setMonthIdx] = useState(0);

    const [criticMonth, setCriticMonth] = useState(9)
    const [criticYear, setCriticYear] = useState(2024)

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

    const sliderRef = useRef(null);

    const getCriticData = async () => {
        try {
            const response = await normalAPI.get(`/calendar/criticism?year=${criticYear}&season=${criticMonth}`)
            console.log(response)
            setCriticData(response.data.data)

        } catch (err) {
            console.error('Error:', err)
        }
    }

    const onClickSlide = useCallback((idx) => {
        setMonthIdx(idx);
        sliderRef.current.slickGoTo(idx);
    }, []);

    const formatDate = (startTime) => {
        const start = new Date(startTime);
        return `${start.getMonth() + 1}월 ${start.getDate()}일`;
    };

    const formatTime = (startTime, order) => {
        const start = new Date(startTime);
        const end = new Date(start.getTime() + order * 60 * 60 * 1000);
        const startFormatted = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        const endFormatted = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        return `${startFormatted} ~ ${endFormatted}`;
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

    const handleApply = async (criticismAuthorId) => {
        const accessToken = localStorage.getItem('access');
        const refreshToken = localStorage.getItem('refresh');

        try {
            let response = await normalAPI.get(
                `/criticismAuthor/toggle?field=id&search=${criticismAuthorId}`,
                {
                    headers: {
                        'accessToken': accessToken
                    }
                }
            );
            console.log(response)
            alert('승인이 완료되었습니다!');
            await getCriticData()
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.log('토큰 재전송');

                // Access Token이 만료되었으므로, Refresh Token으로 새로운 Access Token을 발급받는다.
                try {
                    const tokenResponse = await normalAPI.get(
                        `/criticismAuthor/toggle?field=id&search=${criticismAuthorId}`,
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
                        if (tokenResponse.headers.refreshtoken) {
                            const refreshToken = tokenResponse.headers.refreshtoken.replace('Bearer ', '');
                            localStorage.setItem('refresh', refreshToken);
                        }
                        alert('승인이 완료되었습니다!');
                        await getCriticData()
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
    }

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
                await getCriticData()
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
                            await getCriticData()
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
        }
    }


    useEffect(() => {
        getCriticData()
    }, [])

    return (
        <CriticContainer>
            <WorkTopBorder />
            <div>금학기 합평 신청 승인</div>
            <div>이미 승인한 합평을 수정하려면 해당 항목을 꾹 눌러주세요.</div>
            <SliderContainer>
                <Slider ref={sliderRef} {...settings}>
                    {criticData.map((monthdata, idx) => (
                        <div key={idx}>
                            <Slide onClick={() => onClickSlide(idx)}>
                                <TitleBold>
                                    {criticYear}년 {monthdata.month}월
                                </TitleBold>
                                <Content>
                                    {monthdata.criticismRes?.map((critic, criticIdx) => (
                                        <div key={criticIdx}>
                                            {critic.criticismAuthorResList.map((author, authorIdx) => (
                                                <div key={authorIdx}>
                                                    {authorIdx === 0 && (
                                                        <div>{formatDate(critic.start)}</div>
                                                    )}
                                                    {author.order}부 (
                                                    {formatTime(critic.start, author.order)})
                                                    {author.userName ? (
                                                        <>
                                                            <div>
                                                                {author.userName}
                                                                {translateType(author.genre)}
                                                                {translateCondition(author.condition)}
                                                                {author.condition !== "FIXED" && (
                                                                    <button onClick={() => handleApply(author.criticismAuthorId)}>승인하기</button>
                                                                )}
                                                                <button onClick={() => handleDelete(author.criticismAuthorId)}>삭제하기</button>

                                                            </div>
                                                        </>
                                                    ) : (
                                                        null
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </Content>
                            </Slide>
                        </div>
                    ))}
                </Slider>
            </SliderContainer>
        </CriticContainer>
    );
};

export default AdminCritic;