import React, { useEffect, useState } from 'react';
import { Calendars, CalendarTitle, Centering } from '../../../style/StyledComponent';
import CenterMode from '../../../components/Carousel/Slides';
import { normalAPI } from '../../../apis/Api';



const Calendar = () => {
    const [year, setYear] = useState(2024)
    const [calendarData, setCalendarData] = useState([])

    const getCalendarData = async () => {
        try {
            const res = await normalAPI.get(`/calendar?field=start&search=${year}`)
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


    return (
        <Calendars>
            <CalendarTitle>
                {year}년 활동 일정
            </CalendarTitle>
            <Centering>
                <CenterMode data={calendarData} />
            </Centering>
        </Calendars>
    );
};

export default Calendar;