import React, { useEffect, useState } from 'react';
import { BookTitle, Calendars, CalendarSelectContainer, CalendarTitle, Centering } from '../../../style/StyledComponent';
import CenterMode from '../../../components/Carousel/Slides';
import { normalAPI } from '../../../apis/Api';
import { Desktop, Mobile } from './../../../hooks/useMediaQuery';
import { MobileCalendarContainer } from '../../../style/MobileCalendar';
import { VisibleSelect } from '../../../style/WokrUpload';



const Calendar = () => {
    const date = new Date();
    const yearNow = date.getFullYear();
    const monthNow = date.getMonth();



    console.log(yearNow, monthNow)


    const [year, setYear] = useState()
    const [semester, setSemester] = useState()
    const [calendarData, setCalendarData] = useState([])


    const handleSelectChange = (e) => {
        const [selectedYear, selectedSemester] = e.target.value.split('-');
        setYear(Number(selectedYear));
        setSemester(Number(selectedSemester));
    };

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

    return (

        <>
            <Mobile>
                <MobileCalendarContainer>
                    <BookTitle>
                        {year}년 {semester}학기 활동 일정
                    </BookTitle>
                </MobileCalendarContainer>
            </Mobile>
            <Desktop>
                <Calendars>
                    <CalendarTitle>
                        {year}년 {semester}학기 활동 일정
                    </CalendarTitle>
                    <CalendarSelectContainer>
                        <VisibleSelect onChange={handleSelectChange} value={`${year}-${semester}`}>
                            <option value={`${yearNow}-1`}>{yearNow}년 1학기</option>
                            <option value={`${yearNow}-2`}>{yearNow}년 2학기</option>
                            <option value={`${yearNow - 1}-1`}>{yearNow - 1}년 1학기</option>
                            <option value={`${yearNow - 1}-2`}>{yearNow - 1}년 2학기</option>
                        </VisibleSelect>
                    </CalendarSelectContainer>
                    <Centering>
                        <CenterMode data={calendarData} />
                    </Centering>
                </Calendars>
            </Desktop>
        </>

    );
};

export default Calendar;