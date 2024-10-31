import React, { useEffect, useState } from 'react';
import { CalendarTitle, Centering } from '../../style/StyledComponent';
import { CriticContainer, Notice } from '../../style/Critic';
import { normalAPI } from '../../apis/Api';
import CriticSlide from '../../components/Carousel/CriticSlide';
import { Accordion } from '../../components/Comment/Comments';
import CriticLog from './CriticLog';

const translateSemester = (monthes) => {
    if (monthes <= 1) {
        return 1
    } else if (monthes <= 5) {
        return 3
    } else if (monthes <= 7) {
        return 7
    } else {
        return 9
    }
}

const Critic = () => {

    const date = new Date();
    const yearNow = date.getFullYear();
    const monthNow = date.getMonth();

    const [criticData, setCriticData] = useState([])
    const [month, seMonth] = useState(translateSemester(monthNow))
    const [year, setYear] = useState(yearNow)




    const getCriticData = async () => {
        try {
            const response = await normalAPI.get(`/calendar/criticism?year=${year}&season=${month}`)
            console.log(response)
            setCriticData(response.data.data)

        } catch (err) {
            console.error('Error:', err)
        }
    }

    useEffect(() => {
        getCriticData()
        console.log(criticData)
    }, [])

    const handleDataUpdate = async () => {
        await getCriticData(); // 데이터를 새로 받아오기
    };

    return (
        <CriticContainer>
            <CalendarTitle>
                금학기 합평 신청 및 승인 확인
            </CalendarTitle>
            <br />
            <br />
            <br />
            <Centering>
                <CriticSlide criticData={criticData} year={year} onDataUpdate={handleDataUpdate} />
            </Centering>
            <Centering>
                <Notice>
                    신청을 삭제하려면 해당하는 칸을 클릭해주세요.
                </Notice>
            </Centering>
            <Accordion name='지난 합평회' content={CriticLog} />
        </CriticContainer>
    );
};

export default Critic;