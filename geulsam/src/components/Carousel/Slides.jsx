import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Contents, DisplayNone, Eventlist, Gray, Left, Right, Slide, SliderContainer, SpaceBetween } from "../../style/Carousel";
import { TitleBold } from "../../style/StyledComponent";

const now = new Date()

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
    const genrePart = parts[1];   // 'w(NOVEL)'

    const genreCode = genrePart.match(/\(([^)]+)\)/)[1]; // 'NOVEL'

    // 장르 코드를 한국어 이름으로 변환합니다
    const genreName = genreMapping[genreCode] || genreCode; // 기본값으로 원본 코드 반환

    // 최종 포맷을 구성합니다
    return `${numberPart}부 w(${genreName})`;
};

const isPastEvent = (endTime) => {
    const eventEndDate = new Date(endTime);
    return eventEndDate < now;
};

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

    return sameDay ? `${formattedStart} ~ ${formattedEnd}` : `${formattedStart} ~ ${formattedEnd} ${end.toLocaleDateString('ko-KR', options)}`;
};

function CenterMode({ data }) {
    const [monthIdx, setMonthIdx] = useState(0);
    const sliderRef = useRef(null);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "50px",
        slidesToShow: 4.45,
        slidesToScroll: 1,
        speed: 300,
        arrows: false,
        beforeChange: (current, next) => setMonthIdx(next)
    };


    const onClickSlide = (idx) => {
        setMonthIdx(idx)
        sliderRef.current.slickGoTo(idx);
    }

    return (
        <SliderContainer>
            <Slider ref={sliderRef} {...settings}>
                {data.map((monthdata, idx) => (
                    <div key={idx}>
                        <Slide className={idx === monthIdx ? "active" : ""} onClick={() => (onClickSlide(idx))}>
                            <TitleBold>
                                {monthdata.month}
                            </TitleBold>
                            <Contents>
                                {monthdata.events.map((events, eventIdx) => (
                                    <Eventlist key={eventIdx} past={isPastEvent(events.endTime)}>
                                        <SpaceBetween past={isPastEvent(events.endTime)}>
                                            <Left>
                                                {formatEventTime(events.startTime, events.endTime)}
                                                <DisplayNone past={isPastEvent(events.endTime)}>
                                                    <br />
                                                    <Gray>
                                                        {events.locate}
                                                    </Gray>
                                                </DisplayNone>
                                            </Left>
                                            <Right>
                                                {events.title}
                                                <DisplayNone past={isPastEvent(events.endTime)}>
                                                    <br />
                                                    {events.introduce}
                                                    {events.userAndGenre && events.userAndGenre.length > 0 && (
                                                        events.userAndGenre.map((critic, criticIdx) => (
                                                            <div key={criticIdx}>
                                                                {formatGenre(critic)}
                                                            </div>
                                                        ))
                                                    )}
                                                </DisplayNone>
                                            </Right>
                                        </SpaceBetween>
                                    </Eventlist>
                                ))}
                            </Contents>
                        </Slide>
                    </div>
                ))}
            </Slider>
        </SliderContainer>
    );
}

export default CenterMode;
