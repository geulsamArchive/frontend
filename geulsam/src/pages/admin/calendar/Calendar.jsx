import React, { useState, useRef, useCallback, useEffect } from 'react';
import { WorkTopBorder } from '../../../style/Works';
import { normalAPI } from '../../../apis/Api';
import { Content, CriticContainer, Slide, SliderContainer } from '../../../style/admin/critic';
import Slider from 'react-slick';
import { TitleBold } from '../../../style/StyledComponent';
import Modal from 'react-modal';
import { useForms } from '../../../hooks/useForms';

const AdminCalendar = () => {
    //수정할 연도
    const [calendarYear, setCalendarYear] = useState(2024)
    const [calendarData, setCalendarData] = useState([])


    //일정 추가 관련 state
    const [startTime, onChangeStartTime] = useForms();
    const [endTime, onChangeEndTime] = useForms();
    const [location, onChangeLocation] = useForms();
    const [title, onChangeTitle] = useForms();
    const [introduce, onChangeIntroduce] = useForms();

    //슬라이더 관련
    const [monthIdx, setMonthIdx] = useState(0);
    const sliderRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const getCalendarData = async () => {
        try {
            const res = await normalAPI.get(`/calendar?field=start&search=${calendarYear}`)
            console.log(res)
            setCalendarData(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getCalendarData()
        console.log(calendarData)
    }, [])

    const formatEventTime = (startTime, endTime) => {
        const start = new Date(startTime);
        const end = new Date(endTime);

        const options = {
            month: 'long',
            day: 'numeric',
            weekday: 'short'
        };

        const sameDay = start.toDateString() === end.toDateString();

        const formattedStart = `${start.getDate()}일 (${start.toLocaleDateString('ko-KR', { weekday: 'short' })}) ${start.getHours()}:${String(start.getMinutes()).padStart(2, '0')}`;
        const formattedEnd = `${end.getHours()}:${String(end.getMinutes()).padStart(2, '0')}`;

        return sameDay ? `${formattedStart} ~ ${formattedEnd}` : `${formattedStart} ~ ${formattedEnd} (${end.toLocaleDateString('ko-KR', options)})`;
    };


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

    const handleApply = async (start, end, location, title, intro) => {
        const accessToken = localStorage.getItem('access');
        const refreshToken = localStorage.getItem('refresh');
        try {
            let response = await normalAPI.post(
                '/calendar',
                {
                    title: title,
                    start: start,
                    end: end,
                    locate: location,
                    introduce: intro,
                },
                {
                    headers: {
                        'accessToken': accessToken
                    }
                }
            );

            alert('추가 완료되었습니다!');
            getCalendarData()
            closeModal();

        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.log('토큰 재전송');

                // Access Token이 만료되었으므로, Refresh Token으로 새로운 Access Token을 발급받는다.
                try {
                    const tokenResponse = await normalAPI.post(
                        '/calendar',
                        {
                            title: title,
                            start: start,
                            end: end,
                            locate: location,
                            introduce: intro,
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
                        if (tokenResponse.headers.refreshtoken) {
                            const refreshToken = tokenResponse.headers.refreshtoken.replace('Bearer ', '');
                            localStorage.setItem('refresh', refreshToken);
                        }
                        alert('신청이 완료되었습니다!');
                        closeModal();
                        getCalendarData();
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

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <CriticContainer>
            <WorkTopBorder />
            <div>{calendarYear} 활동 일정</div>
            <div>각각의 활동을 클릭하여 수정할 수 있습니다.</div>
            <SliderContainer>
                <Slider ref={sliderRef} {...settings}>
                    {calendarData.map((monthdata, idx) => (
                        <div key={idx}>
                            <Slide onClick={() => (onClickSlide(idx))}>
                                <TitleBold>
                                    {monthdata.month}
                                </TitleBold>
                                <Content>
                                    {monthdata.events.map((events, eventIdx) => (
                                        <div>
                                            {formatEventTime(events.startTime, events.endTime)}<br />
                                            {events.locate}
                                            {events.title}
                                            {events.introduce}
                                        </div>
                                    ))}
                                    <button onClick={() => openModal()}>특별 활동 추가하기</button>
                                </Content>
                            </Slide>
                        </div>
                    ))}
                </Slider>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="추가하기"
                >
                    <div>
                        시작시간
                        <input type='datetime-local' value={startTime} onChange={onChangeStartTime} />
                        종료시간
                        <input type='datetime-local' value={endTime} onChange={onChangeEndTime} />
                        장소
                        <input value={location} onChange={onChangeLocation} />
                        활동명
                        <input value={title} onChange={onChangeTitle} />
                        비고
                        <input value={introduce} onChange={onChangeIntroduce} />
                    </div>
                    <button onClick={() => handleApply(startTime, endTime, location, title, introduce)}>추가하기</button>
                    <button onClick={closeModal}>닫기</button>
                </Modal>
            </SliderContainer>
        </CriticContainer>
    );
};

export default AdminCalendar;