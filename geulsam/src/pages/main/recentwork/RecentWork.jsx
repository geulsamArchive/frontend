import React, { useEffect, useState } from 'react';
import { RecentTitle, RecentWorks, RecentWorkContainer, RecentWorkOverlay, RecentWorkText, L, RecentWorkOverlayText, B, Recents, Centering, TextOverflow } from '../../../style/StyledComponent';
import { Link, useNavigate } from 'react-router-dom';
import { normalAPI } from '../../../apis/Api';
import { RecentLink, RecentWorkLink, RecentWorkLinkContainer } from '../../../style/Works';
import { CheckTitleLength } from '../../../components/CheckLength';
import { Desktop, Mobile } from '../../../hooks/useMediaQuery';
import { CloseSVG, GrayTexts, MobileRecentsWorkFull, MobileRecentWorkContainer, MobileRecentWorksContainer, MobileRecentWorkTop } from '../../../style/MobileRecent';


const SmallRecentWorks = ({ isOpen, closeMenu, work }) => {
    const navigate = useNavigate();

    if (!isOpen)
        return null

    return (
        <MobileRecentsWorkFull>
            <MobileRecentWorkTop>
                <div>
                    &nbsp;
                </div>
                <div>
                    최근 공개된 작품
                </div>
                <CloseSVG onClick={closeMenu}>
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M11.5 21.1752C10.2294 21.1752 8.97131 20.9249 7.79749 20.4387C6.62366 19.9525 5.5571 19.2399 4.65869 18.3415C3.76029 17.443 3.04763 16.3765 2.56142 15.2027C2.0752 14.0288 1.82495 12.7707 1.82495 11.5002C1.82495 10.2297 2.0752 8.97156 2.56142 7.79773C3.04763 6.62391 3.76029 5.55734 4.65869 4.65894C5.5571 3.76053 6.62367 3.04787 7.79749 2.56166C8.97132 2.07545 10.2294 1.8252 11.5 1.8252C12.7705 1.8252 14.0286 2.07545 15.2024 2.56166C16.3762 3.04788 17.4428 3.76053 18.3412 4.65894C19.2396 5.55735 19.9523 6.62391 20.4385 7.79774C20.9247 8.97156 21.175 10.2297 21.175 11.5002C21.175 12.7707 20.9247 14.0288 20.4385 15.2027C19.9523 16.3765 19.2396 17.443 18.3412 18.3415C17.4428 19.2399 16.3762 19.9525 15.2024 20.4387C14.0286 20.9249 12.7705 21.1752 11.4999 21.1752L11.5 21.1752Z" stroke="#81807F" stroke-width="1.8" stroke-linecap="round" />
                        <path d="M8.27502 8.2749L14.725 14.7249" stroke="#81807F" stroke-width="1.86" stroke-linecap="round" />
                        <path d="M14.725 8.2749L8.27498 14.7249" stroke="#81807F" stroke-width="1.86" stroke-linecap="round" />
                    </svg>
                </CloseSVG>
            </MobileRecentWorkTop>
            <MobileRecentWorksContainer>
                {work.map((work, workIdx) => (
                    <RecentWorkContainer key={workIdx}>
                        <RecentWorkText>
                            {work.sentence}
                        </RecentWorkText>
                        <RecentWorkOverlay onClick={() => (navigate(`/work/${work.contentId}`))}>
                            <RecentWorkOverlayText>
                                <div>
                                    <B><TextOverflow>
                                        {CheckTitleLength(work.title, 12)}
                                    </TextOverflow>
                                    </B>
                                    <br />
                                    <br />
                                    <GrayTexts>
                                        {work.createdAt}
                                        <br />
                                        {work.author}
                                    </GrayTexts>
                                </div>
                            </RecentWorkOverlayText>
                        </RecentWorkOverlay>
                    </RecentWorkContainer>
                ))}
            </MobileRecentWorksContainer>
        </MobileRecentsWorkFull>
    )
}

const RecentWork = () => {
    const [isWorkOpen, setIsWorkOpen] = useState(false)
    const onClickWork = () => {
        setIsWorkOpen(prevState => !prevState)
    }
    const onCloseMenu = () => {
        setIsWorkOpen(false);
    }

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
                <MobileRecentWorkContainer onClick={onClickWork}>
                    최근 공개된 작품들
                </MobileRecentWorkContainer>
                <SmallRecentWorks isOpen={isWorkOpen} closeMenu={onCloseMenu} work={worksData} />
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