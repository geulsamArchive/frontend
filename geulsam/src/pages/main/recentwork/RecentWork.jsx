import React, { useEffect, useState } from 'react';
import { RecentTitle, RecentWorks, RecentWorkContainer, RecentWorkOverlay, RecentWorkText, L, RecentWorkOverlayText, B, Recents, Centering, TextOverflow } from '../../../style/StyledComponent';
import { Link } from 'react-router-dom';
import { normalAPI } from '../../../apis/Api';
import { RecentWorkLink } from '../../../style/Works';
import { CheckTitleLength } from '../../../components/CheckLength';

const Texts = {
    text: "대형견 역시 개의 체형, 활동 수준, 나이 등을 고려하여 비만 여부를 판단해야 합니다. 비만은 대형견에게도 다양한 건강 문제를 일으킬 수 있으므로, 적절한 체중 관리를 위해 정기적인 운동과 균형 잡힌 식사를 제공하는 것이 중요합니다. 정기적으로 수의사의 검진을 받아 건강 상태를 체크하고, 필요시 체중 조절 프로그램을 따르는 것이 좋습니다.",
    author: "정성훈",
    title: "소설제목짓는법좀",
    date: "2024 - 01 - 13",
    link: ""
}



const RecentWork = () => {
    const [worksData, setWorksData] = useState([])
    const getWorksData = async () => {
        try {
            const response = await normalAPI.get('/content/recent?page=1')
            console.log(response)
            setWorksData(response.data.data.content)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getWorksData();
    }, [])

    return (
        <RecentWorks>
            <RecentTitle>
                최근 공개된 작품
            </RecentTitle>
            <Centering>
                <Recents>
                    {worksData.map((work, workIdx) => (
                        <RecentWorkContainer key={workIdx}>
                            <RecentWorkText>
                                {work.sentence}
                            </RecentWorkText>
                            <RecentWorkOverlay>
                                <RecentWorkOverlayText>
                                    <div>
                                        <L><B><TextOverflow>
                                            {CheckTitleLength(work.title, 12)}
                                        </TextOverflow>
                                        </B></L>
                                        <br />
                                        <br />
                                        <br />
                                        {work.createdAt}
                                        <br />
                                        <br />
                                        {work.author}
                                    </div>
                                    <RecentWorkLink to={`/work/${work.contentId}`}>
                                        작품 바로 읽기
                                        <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.8705 4.74866V20.9582" stroke="#2D2B2A" stroke-width="2.04367" stroke-linecap="round" />
                                            <path d="M24.0924 4.74866L24.0924 20.9582" stroke="#2D2B2A" stroke-width="2.04367" stroke-linecap="round" />
                                            <path d="M1.64856 4.74866L1.64856 20.9582" stroke="#2D2B2A" stroke-width="2.04367" stroke-linecap="round" />
                                            <path d="M24.0924 20.9581C24.0924 20.9581 22.8456 18.4644 18.4815 18.4644C14.1174 18.4644 12.8705 20.9581 12.8705 20.9581" stroke="#2D2B2A" stroke-width="2.04367" stroke-linecap="round" />
                                            <path d="M12.8705 20.9581C12.8705 20.9581 11.6236 18.4644 7.25954 18.4644C2.89544 18.4644 1.64856 20.9581 1.64856 20.9581" stroke="#2D2B2A" stroke-width="2.04367" stroke-linecap="round" />
                                            <path d="M24.0924 4.74865C24.0924 4.74865 22.8456 2.25488 18.4815 2.25488C14.1174 2.25488 12.8705 4.74865 12.8705 4.74865" stroke="#2D2B2A" stroke-width="2.04367" stroke-linecap="round" />
                                            <path d="M12.8705 4.74865C12.8705 4.74865 11.6236 2.25488 7.25954 2.25488C2.89544 2.25488 1.64856 4.74865 1.64856 4.74865" stroke="#2D2B2A" stroke-width="2.04367" stroke-linecap="round" />
                                        </svg>
                                    </RecentWorkLink>
                                </RecentWorkOverlayText>
                            </RecentWorkOverlay>
                        </RecentWorkContainer>
                    ))}
                </Recents>
            </Centering>
        </RecentWorks>
    );
};

export default RecentWork;