import React, { useEffect, useState } from 'react';
import { Calendars, CalendarTitle } from '../../../style/StyledComponent';
import CenterMode from '../../../components/Carousel/Slides';
import axios from 'axios';

const Endpoint = 'http://43.200.215.113:8080/calendar?field=start&search=2024'


const Calendar = () => {

    const [calendarData, setCalendarData] = useState([])

    const getCalendarData = async () => {
        try {
            const res = await axios.get(Endpoint)
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
                금학기 활동 일정
            </CalendarTitle>
            <CenterMode data={calendarData} />
        </Calendars>
    );
};

export default Calendar;