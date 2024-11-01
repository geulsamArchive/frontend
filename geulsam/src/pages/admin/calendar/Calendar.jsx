import React, { useState, useRef, useCallback, useEffect } from 'react';
import { WorkTopBorder } from '../../../style/Works';
import { normalAPI } from '../../../apis/Api';
import { Content, CriticContainer, EditCalendarInfo, EditCalendarTitle, Slide, SliderContainer } from '../../../style/admin/critic';
import Slider from 'react-slick';
import { TitleBold } from '../../../style/StyledComponent';
import Modal from 'react-modal';
import { useForms } from '../../../hooks/useForms';
import { useAuth } from '../../../store/Auth';

const AdminCalendar = () => {
    const date = new Date();
    const yearNow = date.getFullYear();
    const monthNow = date.getMonth();

    const { logout } = useAuth()

    const translateSemester = (years, monthes) => {
        if (monthes <= 1) {
            setYear(years - 1)
            setSemester(2)
        } else if (monthes <= 7) {
            setYear(years)
            setSemester(1)
        } else {
            setYear(years)
            setSemester(2)
        }
    }
    //수정할 연도
    const [year, setYear] = useState()
    const [semester, setSemester] = useState()
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
            const res = await normalAPI.get(`/calendar?year=${year}&semester=${semester}`)
            console.log(res)
            setCalendarData(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        translateSemester(yearNow, monthNow);
    }, [yearNow, monthNow]);

    useEffect(() => {
        getCalendarData();
    }, [year, semester]);

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

    const deleteCalendar = async (id) => {
        const accesstoken = localStorage.getItem('access')
        const refreshToken = localStorage.getItem('refresh')
        try {
            const res = await normalAPI.delete(`/calendar?id=${id}`,
                {
                    headers: {
                        'accessToken': accesstoken,
                    }
                }
            )
            console.log(res.data);
            alert('독자 후기를 성공적으로 삭제했습니다.')
            getCalendarData()
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.log('토큰 재전송');
                try {
                    const tokenResponse = await normalAPI.delete(`/calendar?id=${id}`,
                        {
                            headers: {
                                'refreshToken': refreshToken,
                            },
                        });
                    console.log(tokenResponse);
                    const newAccessToken = tokenResponse.headers.accesstoken.replace('Bearer ', '')
                    localStorage.setItem('access', newAccessToken)
                    if (tokenResponse.headers.refreshtoken) {
                        const refreshToken = tokenResponse.headers.refreshtoken.replace('Bearer ', '');
                        localStorage.setItem('refresh', refreshToken);
                    }
                    alert('독자 후기를 성공적으로 삭제했습니다.')
                    getCalendarData();
                } catch (err) {
                    console.error('Refresh Token Error:', err);
                    alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
                    logout();
                }
            } else {
                console.error('Error:', error);
                alert('삭제 중 문제가 발생했습니다.');
            }
        }
    }

    return (
        <CriticContainer>
            <WorkTopBorder />
            <EditCalendarTitle>
                {year}년 {semester}학기 활동 일정
            </EditCalendarTitle>
            <EditCalendarInfo>
                해당 학기의 활동 일정만 등록 가능합니다. <br />
                각각의 활동을 클릭하여 진행 예정 일정을 수정할 수 있습니다.
            </EditCalendarInfo>

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
                                            <button onClick={() => (deleteCalendar(events.eventId))}>삭제하기</button>
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