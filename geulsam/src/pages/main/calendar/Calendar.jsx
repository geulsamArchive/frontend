import React from 'react';
import { Calendars, CalendarTitle } from '../../../style/StyledComponent';
import CenterMode from '../../../components/Carousel/Slides';


const data = [
    {
        month: "2024년 1월",
        events: [
            {
                startTime: "2024-01-11T12:00",
                endTime: "2024-01-11T14:00",
                title: "합평회 1일차",
                introduce: "비고란",
                locate: "G111"
            },
            {
                startTime: "2024-01-13T12:00",
                endTime: "2024-01-13T14:00",
                title: "합평회 2일차",
                introduce: "비고란",
                locate: "G222"
            },
            {
                startTime: "2024-01-14T12:00",
                endTime: "2024-01-14T14:00",
                title: "합평회 3일차",
                introduce: "비고란",
                locate: "G333"
            },

        ]
    },
    {
        month: "2024년 2월",
        events: [
            {
                startTime: "2024-01-11T12:00",
                endTime: "2024-01-11T14:00",
                title: "합평회 1일차",
                introduce: "비고란",
                locate: "G111"
            },
            {
                startTime: "2024-01-13T12:00",
                endTime: "2024-01-13T14:00",
                title: "합평회 2일차",
                introduce: "비고란",
                locate: "G222"
            },
            {
                startTime: "2024-01-14T12:00",
                endTime: "2024-01-14T14:00",
                title: "합평회 3일차",
                introduce: "비고란",
                locate: "G333"
            },

        ]
    },
    {
        month: "2024년 3월",
        events: [
            {
                startTime: "2024-01-11T12:00",
                endTime: "2024-01-11T14:00",
                title: "합평회 1일차",
                introduce: "비고란",
                locate: "G111"
            },
            {
                startTime: "2024-01-13T12:00",
                endTime: "2024-01-13T14:00",
                title: "합평회 2일차",
                introduce: "비고란",
                locate: "G222"
            },
            {
                startTime: "2024-01-14T12:00",
                endTime: "2024-01-14T14:00",
                title: "합평회 3일차",
                introduce: "비고란",
                locate: "G333"
            },

        ]
    },
    {
        month: "2024년 4월",
        events: [
            {
                startTime: "2024-01-11T12:00",
                endTime: "2024-01-11T14:00",
                title: "합평회 1일차",
                introduce: "비고란",
                locate: "G111"
            },
            {
                startTime: "2024-01-13T12:00",
                endTime: "2024-01-13T14:00",
                title: "합평회 2일차",
                introduce: "비고란",
                locate: "G222"
            },
            {
                startTime: "2024-01-14T12:00",
                endTime: "2024-01-14T14:00",
                title: "합평회 3일차",
                introduce: "비고란",
                locate: "G333"
            },

        ]
    },
    {
        month: "2024년 5월",
        events: [
            {
                startTime: "2024-01-11T12:00",
                endTime: "2024-01-11T14:00",
                title: "합평회 1일차",
                introduce: "비고란",
                locate: "G111"
            },
            {
                startTime: "2024-01-13T12:00",
                endTime: "2024-01-13T14:00",
                title: "합평회 2일차",
                introduce: "비고란",
                locate: "G222"
            },
            {
                startTime: "2024-01-14T12:00",
                endTime: "2024-01-14T14:00",
                title: "합평회 3일차",
                introduce: "비고란",
                locate: "G333"
            },

        ]
    }, {
        month: "2024년 6월",
        events: [
            {
                startTime: "2024-01-11T12:00",
                endTime: "2024-01-11T14:00",
                title: "합평회 1일차",
                introduce: "비고란",
                locate: "G111"
            },
            {
                startTime: "2024-01-13T12:00",
                endTime: "2024-01-13T14:00",
                title: "합평회 2일차",
                introduce: "비고란",
                locate: "G222"
            },
            {
                startTime: "2024-01-14T12:00",
                endTime: "2024-01-14T14:00",
                title: "합평회 3일차",
                introduce: "비고란",
                locate: "G333"
            },
            {
                startTime: "2024-01-11T12:00",
                endTime: "2024-01-11T14:00",
                title: "합평회 1일차",
                introduce: "비고란",
                locate: "G111"
            },
            {
                startTime: "2024-01-13T12:00",
                endTime: "2024-01-13T14:00",
                title: "합평회 2일차",
                introduce: "비고란",
                locate: "G222"
            },
            {
                startTime: "2024-01-14T12:00",
                endTime: "2024-01-14T14:00",
                title: "합평회 3일차",
                introduce: "비고란",
                locate: "G333"
            }, {
                startTime: "2024-01-11T12:00",
                endTime: "2024-01-11T14:00",
                title: "합평회 1일차",
                introduce: "비고란",
                locate: "G111"
            },
            {
                startTime: "2024-01-13T12:00",
                endTime: "2024-01-13T14:00",
                title: "합평회 2일차",
                introduce: "비고란",
                locate: "G222"
            },
            {
                startTime: "2024-01-14T12:00",
                endTime: "2024-01-14T14:00",
                title: "합평회 3일차",
                introduce: "비고란",
                locate: "G333"
            },
        ]
    },
    {
        month: "2024년 7월",
        events: [
            {
                startTime: "2024-07-11T12:00",
                endTime: "2024-07-11T14:00",
                title: "합평회 1일차",
                introduce: "이정훈",
                locate: "G420"
            },
            {
                startTime: "2024-07-20T12:00",
                endTime: "2024-07-20T14:00",
                title: "합평회 2일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "2024-07-24T12:00",
                endTime: "2024-07-24T14:00",
                title: "합평회 3일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "2024-07-25T12:00",
                endTime: "2024-07-25T14:00",
                title: "합평회 2일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "2024-07-26T12:00",
                endTime: "2024-07-26T14:00",
                title: "합평회 3일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "2024-07-30T17:00",
                endTime: "2024-07-31T18:00",
                title: "합평회 4일차",
                introduce: "비고란",
                locate: "G420"
            },
        ]
    }
]



const Calendar = () => {


    return (
        <Calendars>
            <CalendarTitle>
                금학기 활동 일정
            </CalendarTitle>
            <CenterMode data={data} />
        </Calendars>
    );
};

export default Calendar;