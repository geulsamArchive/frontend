import { React, useState } from 'react';
import { Footers, Left, Right } from '../../style/StyledComponent';
import { Link, useLocation } from 'react-router-dom';
import { Desktop, Mobile } from '../../hooks/useMediaQuery';
import ReactModal from 'react-modal';
import { BigRed, DIV, Infom, ModalBottomContainer, ModalTopContainer, OpenChat } from '../../style/footerModal';
import { ALink } from './../../style/footerModal';

const Footer = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isHiddenOnMobile =
        location.pathname === '/' ||
        location.pathname === '/main' ||
        location.pathname.startsWith('/work/') ||
        location.pathname.startsWith('/archive/book/');

    const openModal = () => {
        setIsModalOpen(prev => !prev);

    }

    const ModalStyle = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex', // 추가
            justifyContent: 'flex-end', // 가로축: 우측 정렬
            alignItems: 'flex-end', // 세로축: 아래 정렬
            zIndex: 1,
        },
        content: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-betweenr',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
            border: 'none',
            outline: 'none',
            marginRight: '100px',
            marginBottom: '73px',
            backgroundColor: 'rgba(0, 0, 0, 0)',
        }
    };
    return (
        <>
            <Desktop>
                <Footers>
                    <Left>
                        COPYRIGHT © 글샘문학회 ALL RIGHTS RESERVED
                    </Left>
                    <Right>
                        <Link to='/admin/manage'>관리자페이지</Link>
                        <a href='https://www.instagram.com/hongik_geulsaem/'>
                            인스타그램
                        </a>
                        <span onClick={openModal}>
                            이용약관
                        </span>
                    </Right>
                </Footers>
            </Desktop>
            {!isHiddenOnMobile && (
                <Mobile>
                    <Footers>
                        <div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            COPYRIGHT © 글샘문학회 ALL RIGHTS RESERVED
                        </div>
                    </Footers>
                </Mobile>
            )}
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={ModalStyle}>
                <ModalTopContainer>
                    <BigRed>
                        사이트 이용에 문제가 있나요?
                    </BigRed>

                    <DIV>
                        사이트 관리 및 이용 중 발생한 오류 및 문제 사항은<br />
                        아래 연락처로 문의해주세요.
                    </DIV>
                    <OpenChat >
                        <ALink href='https://open.kakao.com/o/gm0dzCbh'>
                            TEAM 글샘웹 오픈채팅방 바로가기
                        </ALink>
                    </OpenChat>
                </ModalTopContainer>
                <ModalBottomContainer>
                    <Infom>
                        개인정보 이용 약관 확인하기
                        &nbsp;
                        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.22229 7.15008L11.2501 14.1779M11.2501 14.1779L18.2778 7.15008M11.2501 14.1779L11.2501 1.52786" stroke="#81807F" stroke-width="2.13525" stroke-linecap="round" />
                            <path d="M1.41107 16.2555L1.41107 17.661C1.41107 19.2136 2.66965 20.4722 4.22218 20.4722L18.2777 20.4722C19.8303 20.4722 21.0889 19.2136 21.0889 17.6611V16.2555" stroke="#81807F" stroke-width="2.42977" stroke-linecap="round" />
                        </svg>

                    </Infom>
                </ModalBottomContainer>
            </ReactModal>
        </>
    );
};

export default Footer;
