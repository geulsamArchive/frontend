import React from 'react';
import { Calendars, CalendarTitle } from '../../../style/StyledComponent';
import CenterMode from '../../../components/Carousel/Slides';


const data = [
    {
        month: "2024년 1월",
        events: [
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 1일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 2일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 3일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 4일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 4일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 4일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 4일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 4일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 4일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 4일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 4일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 4일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 4일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 4일차",
                introduce: "비고란",
                locate: "G420"
            },
        ]
    },
    {
        month: "2024년 2월",
        events: [
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 1일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 2일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 3일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 4일차",
                introduce: "비고란",
                locate: "G420"
            },
        ]
    },
    {
        month: "2024년 3월",
        events: [
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 1일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 2일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 3일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 4일차",
                introduce: "비고란",
                locate: "G420"
            },
        ]
    },
    {
        month: "2024년 4월",
        events: [
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 1일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 2일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 3일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 4일차",
                introduce: "비고란",
                locate: "G420"
            },
        ]
    },
    {
        month: "2024년 5월",
        events: [
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 1일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 2일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 3일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 4일차",
                introduce: "비고란",
                locate: "G420"
            },
        ]
    },
    {
        month: "2024년 6월",
        events: [
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 1일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 2일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 3일차",
                introduce: "비고란",
                locate: "G420"
            },
            {
                startTime: "yyyy-mm-dd-hh",
                endTime: "yyyy-mm-dd-hh",
                title: "합평회 4일차",
                introduce: "비고란",
                locate: "G420"
            },
        ]
    }
]



const Calendar = () => {

    const date = new Date()

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