import React from 'react';
import { RecentTitle, RecentWorks, RecentWorkContainer, RecentWorkOverlay, RecentWorkText, L, RecentWorkOverlayText, B, Recents } from '../../../style/StyledComponent';

const Texts = {
    text: "대형견 역시 개의 체형, 활동 수준, 나이 등을 고려하여 비만 여부를 판단해야 합니다. 비만은 대형견에게도 다양한 건강 문제를 일으킬 수 있으므로, 적절한 체중 관리를 위해 정기적인 운동과 균형 잡힌 식사를 제공하는 것이 중요합니다. 정기적으로 수의사의 검진을 받아 건강 상태를 체크하고, 필요시 체중 조절 프로그램을 따르는 것이 좋습니다.",
    author: "정성훈",
    title: "소설제목짓는법좀",
    date: "2024 - 01 - 13",
    link: ""
}

const RecentWork = () => {
    return (
        <RecentWorks>
            <RecentTitle>
                최근 공개된 작품
            </RecentTitle>
            <Recents>
                <RecentWorkContainer>
                    <RecentWorkText>
                        {Texts.text}
                    </RecentWorkText>
                    <RecentWorkOverlay>
                        <RecentWorkOverlayText>
                            <div>
                                <L><B>
                                    {Texts.title}
                                </B></L>
                                <br />
                                <br />
                                <br />
                                {Texts.date}
                                <br />
                                <br />
                                {Texts.author}
                            </div>
                            <div>
                                나중에 버튼 넣을거임
                            </div>
                        </RecentWorkOverlayText>
                    </RecentWorkOverlay>
                </RecentWorkContainer>
                <RecentWorkContainer>
                    <RecentWorkText>
                        {Texts.text}
                    </RecentWorkText>
                    <RecentWorkOverlay>
                        <RecentWorkOverlayText>
                            <div>
                                <L><B>
                                    {Texts.title}
                                </B></L>
                                <br />
                                <br />
                                <br />
                                {Texts.date}
                                <br />
                                <br />
                                {Texts.author}
                            </div>
                            <div>
                                나중에 버튼 넣을거임
                            </div>
                        </RecentWorkOverlayText>
                    </RecentWorkOverlay>
                </RecentWorkContainer><RecentWorkContainer>
                    <RecentWorkText>
                        {Texts.text}
                    </RecentWorkText>
                    <RecentWorkOverlay>
                        <RecentWorkOverlayText>
                            <div>
                                <L><B>
                                    {Texts.title}
                                </B></L>
                                <br />
                                <br />
                                <br />
                                {Texts.date}
                                <br />
                                <br />
                                {Texts.author}
                            </div>
                            <div>
                                나중에 버튼 넣을거임
                            </div>
                        </RecentWorkOverlayText>
                    </RecentWorkOverlay>
                </RecentWorkContainer><RecentWorkContainer>
                    <RecentWorkText>
                        {Texts.text}
                    </RecentWorkText>
                    <RecentWorkOverlay>
                        <RecentWorkOverlayText>
                            <div>
                                <L><B>
                                    {Texts.title}
                                </B></L>
                                <br />
                                <br />
                                <br />
                                {Texts.date}
                                <br />
                                <br />
                                {Texts.author}
                            </div>
                            <div>
                                나중에 버튼 넣을거임
                            </div>
                        </RecentWorkOverlayText>
                    </RecentWorkOverlay>
                </RecentWorkContainer><RecentWorkContainer>
                    <RecentWorkText>
                        {Texts.text}
                    </RecentWorkText>
                    <RecentWorkOverlay>
                        <RecentWorkOverlayText>
                            <div>
                                <L><B>
                                    {Texts.title}
                                </B></L>
                                <br />
                                <br />
                                <br />
                                {Texts.date}
                                <br />
                                <br />
                                {Texts.author}
                            </div>
                            <div>
                                나중에 버튼 넣을거임
                            </div>
                        </RecentWorkOverlayText>
                    </RecentWorkOverlay>
                </RecentWorkContainer><RecentWorkContainer>
                    <RecentWorkText>
                        {Texts.text}
                    </RecentWorkText>
                    <RecentWorkOverlay>
                        <RecentWorkOverlayText>
                            <div>
                                <L><B>
                                    {Texts.title}
                                </B></L>
                                <br />
                                <br />
                                <br />
                                {Texts.date}
                                <br />
                                <br />
                                {Texts.author}
                            </div>
                            <div>
                                나중에 버튼 넣을거임
                            </div>
                        </RecentWorkOverlayText>
                    </RecentWorkOverlay>
                </RecentWorkContainer><RecentWorkContainer>
                    <RecentWorkText>
                        {Texts.text}
                    </RecentWorkText>
                    <RecentWorkOverlay>
                        <RecentWorkOverlayText>
                            <div>
                                <L><B>
                                    {Texts.title}
                                </B></L>
                                <br />
                                <br />
                                <br />
                                {Texts.date}
                                <br />
                                <br />
                                {Texts.author}
                            </div>
                            <div>
                                나중에 버튼 넣을거임
                            </div>
                        </RecentWorkOverlayText>
                    </RecentWorkOverlay>
                </RecentWorkContainer><RecentWorkContainer>
                    <RecentWorkText>
                        {Texts.text}
                    </RecentWorkText>
                    <RecentWorkOverlay>
                        <RecentWorkOverlayText>
                            <div>
                                <L><B>
                                    {Texts.title}
                                </B></L>
                                <br />
                                <br />
                                <br />
                                {Texts.date}
                                <br />
                                <br />
                                {Texts.author}
                            </div>
                            <div>
                                나중에 버튼 넣을거임
                            </div>
                        </RecentWorkOverlayText>
                    </RecentWorkOverlay>
                </RecentWorkContainer>
            </Recents>
        </RecentWorks>
    );
};

export default RecentWork;