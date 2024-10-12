import React, { useEffect, useState } from 'react';
import { RecentTitle, RecentWorks, RecentWorkContainer, RecentWorkOverlay, RecentWorkText, L, RecentWorkOverlayText, B, Recents, Centering, TextOverflow } from '../../../style/StyledComponent';
import { Link } from 'react-router-dom';
import { normalAPI } from '../../../apis/Api';
import { RecentLink, RecentWorkLink, RecentWorkLinkContainer } from '../../../style/Works';
import { CheckTitleLength } from '../../../components/CheckLength';
import { Desktop, Mobile } from '../../../hooks/useMediaQuery';

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
        <>
            <Mobile>
                최근 공개된 작품들
            </Mobile>
            <Desktop>
                <RecentWorks>
                    <RecentTitle>
                        최근 공개된 작품들
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
                                                {work.author}
                                            </div>
                                            <RecentWorkLinkContainer>
                                                <RecentLink to={`/work/${work.contentId}`}>
                                                    작품 바로 읽기
                                                </RecentLink>
                                            </RecentWorkLinkContainer>
                                        </RecentWorkOverlayText>
                                    </RecentWorkOverlay>
                                </RecentWorkContainer>
                            ))}
                        </Recents>
                    </Centering>
                </RecentWorks>
            </Desktop>
        </>
    );
};

export default RecentWork;