import React, { useEffect, useState } from 'react';
import { CalendarTitle, Centering } from '../../style/StyledComponent';
import { CriticContainer } from '../../style/Critic';
import { normalAPI } from '../../apis/Api';
import CriticSlide from '../../components/Carousel/CriticSlide';
const Critic = () => {
    const [criticData, setCriticData] = useState([])
    const [startMonth, setStartMonth] = useState(9)
    const [year, setYear] = useState(2024)
    const getCriticData = async () => {
        try {
            const response = await normalAPI.get(`/calendar/criticism?year=2024&season=9`)
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
            <Centering>
                <CriticSlide criticData={criticData} year={year} onDataUpdate={handleDataUpdate} />
            </Centering>
        </CriticContainer>
    );
};

export default Critic;