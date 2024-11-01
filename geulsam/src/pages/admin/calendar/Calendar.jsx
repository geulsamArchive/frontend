import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Margin, WorkTopBorder } from '../../../style/Works';
import { normalAPI } from '../../../apis/Api';
import { AddForm, AddInputs, Content, ContentRightText, ContentsInfo, CriticContainer, EditCalendarInfo, EditCalendarTitle, EditCalendarTop, Slide, SliderContainer } from '../../../style/admin/critic';
import Slider from 'react-slick';
import { Button, Buttons, LoginForm, LoginInput, LoginInputs, LoginInputTitle, TitleBold, WhiteButton } from '../../../style/StyledComponent';
import Modal from 'react-modal';
import { useForms } from '../../../hooks/useForms';
import { useAuth } from '../../../store/Auth';
import { AddButton } from './../../../style/admin/critic';
import { Gray } from '../../../style/Carousel';

const AdminCalendar = () => {
    //합평회 추가 모달 관련
    const [isCriticModalOpen, setIsCriticModalOpen] = useState(false)
    const openCriticModal = () => setIsCriticModalOpen(true);
    const closeCriticModal = () => setIsCriticModalOpen(false);

    const [authorCnt, onChangeAuthorCnt] = useForms();


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

    const checkStates = startTime && endTime && location && title && introduce;

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
        centerPadding: "0",
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

            alert('일정 추가가 완료되었습니다!');
            getCalendarData()
            closeModal();

        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.log('토큰 재전송');
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
                        alert('일정 추가가 완료되었습니다!');
                        closeModal();
                        getCalendarData();
                    }
                } catch (err) {
                    console.error('Refresh Token Error:', err);
                    alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
                    logout();
                }
            } else {
                console.error('Error:', error);
                alert('추가 중 문제가 발생했습니다.');
            }
        }
    }



    const handleCriticApply = async (start, end, location, title, intro, cnt) => {
        const accessToken = localStorage.getItem('access');
        const refreshToken = localStorage.getItem('refresh');
        try {
            let response = await normalAPI.post(
                '/calendar/criticism',
                {
                    title: title,
                    start: start,
                    end: end,
                    locate: location,
                    introduce: intro,
                    authorCnt, cnt
                },
                {
                    headers: {
                        'accessToken': accessToken
                    }
                }
            );

            alert('합평회 추가가 완료되었습니다!');
            getCalendarData()
            closeCriticModal();

        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.log('토큰 재전송');
                try {
                    const tokenResponse = await normalAPI.post(
                        '/calendar/criticism',
                        {
                            title: title,
                            start: start,
                            end: end,
                            locate: location,
                            introduce: intro,
                            authorCnt: cnt,
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
                        alert('합평회 추가가 완료되었습니다!');
                        closeCriticModal();
                        getCalendarData();
                    }
                } catch (err) {
                    console.error('Refresh Token Error:', err);
                    alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
                    logout();
                }
            } else {
                console.error('Error:', error);
                alert(error.response.data.message);
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
        if (window.confirm("정말 해당 일정을 삭제하시겠습니까?")) {

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
    }
    const modalStyles = {
        overlay: {
            backgroundColor: 'inherit',
        },
        content: {
            background: 'white',
            padding: 0,
            borderRadius: '8.6px',
            border: 'none',
            width: '408px',
            height: '550px',
            margin: 'auto',
            filter: 'drop-shadow(0 10px 30px rgba(152, 147, 142, 0.25))',
        }
    };
    const genreMapping = {
        NOVEL: '소설',
        ESSAY: '수필',
        POEM: '시',
    };

    const formatGenre = (text) => {
        // 텍스트를 공백 기준으로 분리합니다
        const parts = text.split(' ');

        // 첫 번째 부분은 숫자와 문자로 나누고, 두 번째 부분은 괄호를 기준으로 나눕니다
        const numberPart = parts[0]; // '1'
        const namePart = parts[1].split('(')[0]; // '이소현'
        const genreCode = parts[1].match(/\(([^)]+)\)/)[1]; // 'NOVEL'

        // 장르 코드를 한국어 이름으로 변환합니다
        const genreName = genreMapping[genreCode] || genreCode; // 기본값으로 원본 코드 반환

        // 최종 포맷을 구성합니다
        return `${numberPart}부 ${namePart}(${genreName})`;
    };

    return (
        <CriticContainer>
            <WorkTopBorder />
            <EditCalendarTop>
                <div>
                    <EditCalendarTitle>
                        {year}년 {semester}학기 활동 일정
                    </EditCalendarTitle>
                    <EditCalendarInfo>
                        해당 학기의 활동 일정만 등록 가능합니다. <br />
                        각각의 활동을 클릭할 시 삭제할 수 있습니다.
                    </EditCalendarInfo>
                </div>
                <div>
                    <br />
                    <WhiteButton onClick={() => (openCriticModal())}>합평회 일정 등록</WhiteButton>
                </div>
            </EditCalendarTop>
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
                                        <ContentsInfo onClick={() => (deleteCalendar(events.eventId))}>
                                            <div>
                                                {formatEventTime(events.startTime, events.endTime)}<br />
                                                <Gray>
                                                    {events.locate}
                                                </Gray>
                                            </div>
                                            <ContentRightText>
                                                {events.title}<br />
                                                {events.introduce}
                                                {events.userAndGenre && events.userAndGenre.length > 0 && (
                                                    events.userAndGenre.map((critic, criticIdx) => (
                                                        <div key={criticIdx}>
                                                            {formatGenre(critic)}
                                                        </div>
                                                    ))
                                                )}
                                            </ContentRightText>
                                        </ContentsInfo>
                                    ))}
                                    <ContentsInfo>
                                        <div>
                                            &nbsp;
                                        </div>
                                        <AddButton onClick={() => openModal()}>
                                            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M19.0775 9.49946C19.0775 14.5129 15.0134 18.577 9.99995 18.577C4.98654 18.577 0.922363 14.5129 0.922363 9.49946C0.922363 4.48605 4.98654 0.421875 9.99995 0.421875C15.0134 0.421875 19.0775 4.48605 19.0775 9.49946ZM10 15.5512C9.44295 15.5512 8.99138 15.0996 8.99138 14.5425V10.5086H4.95698C4.39993 10.5086 3.94836 10.057 3.94836 9.5C3.94836 8.94295 4.39993 8.49138 4.95698 8.49138H8.99138V4.45634C8.99138 3.89929 9.44295 3.44772 10 3.44772C10.557 3.44772 11.0086 3.89929 11.0086 4.45634V8.49138H15.0432C15.6002 8.49138 16.0518 8.94295 16.0518 9.5C16.0518 10.057 15.6002 10.5086 15.0432 10.5086H11.0086V14.5425C11.0086 15.0996 10.557 15.5512 10 15.5512Z" fill="#81807F" />
                                            </svg>
                                            특별 활동 추가하기
                                        </AddButton>
                                        <div>
                                            &nbsp;
                                        </div>
                                    </ContentsInfo>
                                </Content>
                            </Slide>
                        </div>
                    ))}
                </Slider>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="추가하기"
                    style={modalStyles}
                >
                    <AddForm>
                        <AddInputs>
                            <LoginInputTitle>시작 시간</LoginInputTitle>
                            <LoginInput type='datetime-local' value={startTime} onChange={onChangeStartTime} />
                            <LoginInputTitle>종료 시간</LoginInputTitle>
                            <LoginInput type='datetime-local' value={endTime} onChange={onChangeEndTime} />
                            <LoginInputTitle>장소</LoginInputTitle>
                            <LoginInput value={location} onChange={onChangeLocation} />
                            <LoginInputTitle>활동명</LoginInputTitle>
                            <LoginInput value={title} onChange={onChangeTitle} />
                            <LoginInputTitle>비고</LoginInputTitle>
                            <LoginInput value={introduce} onChange={onChangeIntroduce} />
                        </AddInputs>
                        <Buttons>
                            <Button onClick={closeModal}>취소하기</Button>
                            <Button disabled={!checkStates} onClick={() => handleApply(startTime, endTime, location, title, introduce)}>추가하기</Button>
                        </Buttons>
                    </AddForm>
                </Modal>
                <Modal
                    isOpen={isCriticModalOpen}
                    onRequestClose={closeCriticModal}
                    contentLabel="합평회 추가하기"
                    style={modalStyles}
                >
                    <AddForm>
                        <AddInputs>
                            <LoginInputTitle>시작 시간</LoginInputTitle>
                            <LoginInput type='datetime-local' value={startTime} onChange={onChangeStartTime} />
                            <LoginInputTitle>종료 시간</LoginInputTitle>
                            <LoginInput type='datetime-local' value={endTime} onChange={onChangeEndTime} />
                            <LoginInputTitle>장소</LoginInputTitle>
                            <LoginInput value={location} onChange={onChangeLocation} />
                            <LoginInputTitle>활동명</LoginInputTitle>
                            <LoginInput value={title} onChange={onChangeTitle} />
                            <LoginInputTitle>비고</LoginInputTitle>
                            <LoginInput value={introduce} onChange={onChangeIntroduce} />
                            <LoginInputTitle>참여 작가 수</LoginInputTitle>
                            <LoginInput value={authorCnt} onChange={onChangeAuthorCnt} />
                        </AddInputs>
                        <Buttons>
                            <Button onClick={closeCriticModal}>취소하기</Button>
                            <Button disabled={!checkStates} onClick={() => handleCriticApply(startTime, endTime, location, title, introduce, authorCnt)}>추가하기</Button>
                        </Buttons>
                    </AddForm>
                </Modal>
            </SliderContainer>
        </CriticContainer>
    );
};

export default AdminCalendar;