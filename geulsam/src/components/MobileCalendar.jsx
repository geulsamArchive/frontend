import React, { useState } from 'react';
import { CalendarBottom, CalendarContainer, CalendarInfo, CalendarTop, Left, Right } from '../style/MobileCalendar';
import { TitleBold } from '../style/StyledComponent';
import { formatEventTime, formatGenre } from './Carousel/Slides';


const MobileCalendar = ({ data }) => {

    const [monthIdx, setMonthIdx] = useState(0)

    const handleNextMonth = () => {
        setMonthIdx((prevIdx) => Math.min(prevIdx + 1, data.length - 1));
    };

    const handlePreviousMonth = () => {
        setMonthIdx((prevIdx) => Math.max(prevIdx - 1, 0));
    };

    if (!data || !data[monthIdx]) return <div>로딩중입니다.</div>;

    return (
        <CalendarContainer>
            <CalendarTop>
                {monthIdx > 0 ? (
                    <svg onClick={handlePreviousMonth} width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.35 1.1333L1.98334 8.49997L9.35 15.8666" stroke="#575655" stroke-width="2.26667" stroke-linecap="round" />
                    </svg>
                ) : (
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                )}
                <TitleBold>
                    {data[monthIdx].month}
                </TitleBold>
                {monthIdx < data.length - 1 ? (
                    <svg onClick={handleNextMonth} width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg" transform='rotate(180)'>
                        <path d="M9.35 1.1333L1.98334 8.49997L9.35 15.8666" stroke="#575655" stroke-width="2.26667" stroke-linecap="round" />
                    </svg>
                ) : (
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                )}
            </CalendarTop>
            <CalendarBottom>
                {data[monthIdx].events.map((events) => (
                    <CalendarInfo>
                        <Left>
                            {formatEventTime(events.startTime, events.endTime)}<br />
                            {events.locate}
                        </Left>
                        <Right>
                            {events.title}<br />
                            {events.introduce}
                            {events.userAndGenre && events.userAndGenre.length > 0 && (
                                events.userAndGenre.map((critic, criticIdx) => (
                                    <div key={criticIdx}>
                                        {formatGenre(critic)}
                                    </div>
                                ))
                            )}
                        </Right>
                    </CalendarInfo>
                ))}
            </CalendarBottom>
        </CalendarContainer>
    );
};

export default MobileCalendar;