import React from 'react';
import { useLocation } from 'react-router-dom';
import { URLButton } from '../../style/StyledComponent';
import Logo from '../../assets/images/URL.png'
import { Desktop, Mobile } from '../../hooks/useMediaQuery';

const CopyURL = () => {
    const baseURL = "geulsaem.pages.dev"
    const location = useLocation();
    const handleCopyClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert("해당 페이지의 URL이 복사되었어요.");
        } catch (err) {
            alert.error("URL 복사에 실패하였습니다.");
        }
    };
    return (
        <>
            <URLButton onClick={() => handleCopyClipBoard(`${baseURL}${location.pathname}`)}>
                <Desktop>
                    <img src={Logo} alt='현재 URL 복사' />

                </Desktop>
                <Mobile>
                    공유하기
                </Mobile>
            </URLButton>
        </>
    );
};

export default CopyURL;