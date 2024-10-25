import React from 'react';
import { Button, Container, Info, Info404, InfoTitle } from '../../style/404';
import { useNavigate } from 'react-router-dom';

const NotFound404 = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <Info404>
                <svg width="96" height="69" viewBox="0 0 96 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M88.7149 9.14258H90.4874C92.876 9.14258 94.8101 10.8989 94.8101 13.0615L94.8 63.3665C94.8 65.5292 92.8608 67.281 90.4773 67.281L5.51266 67.2674C3.12405 67.2674 1.18994 65.5156 1.18994 63.3485L1.20004 13.0434C1.20004 10.8808 3.13921 9.12451 5.52276 9.12451H7.14377" stroke="#575655" stroke-width="2.02422" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M48.0378 2L11.6734 2.00903C9.20907 2.00903 7.21436 3.89174 7.21436 6.21692L7.22446 55.9802C7.22446 58.3053 9.22421 60.1881 11.6835 60.1881L48.0378 60.179V2Z" stroke="#575655" stroke-width="2.02422" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M16.1276 17.0122L39.9328 17.0167" stroke="#575655" stroke-width="2.02422" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15.7488 26.8545L39.9328 26.859" stroke="#575655" stroke-width="2.02422" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15.7488 36.6973L39.9277 36.7018" stroke="#575655" stroke-width="2.02422" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15.7437 46.5439L39.9276 46.5485" stroke="#575655" stroke-width="2.02422" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M47.962 2H84.4184C86.887 2 88.8915 3.88723 88.8915 6.2124L88.8718 55.9756C88.8718 58.3008 86.8673 60.1835 84.3987 60.1835H47.962L47.9719 2H47.962Z" stroke="#575655" stroke-width="2.02422" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M56.5232 16.9307L80.3897 16.9352" stroke="#575655" stroke-width="2.02422" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M56.1481 26.7734L80.3799 26.778" stroke="#575655" stroke-width="2.02422" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M56.1382 36.6206H80.3799" stroke="#575655" stroke-width="2.02422" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M56.1382 46.4629L80.37 46.4674" stroke="#575655" stroke-width="2.02422" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M47.649 2H84.247C86.7252 2 88.7375 3.88723 88.7375 6.2124L88.7177 55.9756C88.7177 58.3008 86.7054 60.1835 84.2272 60.1835H47.649L47.6589 2H47.649Z" stroke="#575655" stroke-width="2.02422" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M56.2433 16.9307L80.2025 16.9352" stroke="#575655" stroke-width="2.02422" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M55.8668 26.7734L80.1928 26.778" stroke="#575655" stroke-width="2.02422" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M55.8567 36.6206H80.1925" stroke="#575655" stroke-width="2.02422" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M55.8567 46.4629L80.1826 46.4674" stroke="#575655" stroke-width="2.02422" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <InfoTitle>
                    원하시는 페이지를 찾을 수 없습니다.
                </InfoTitle>
                <Info>
                    방문하고자 하는 페이지의 주소가 잘못 입력되었거나
                    페이지의 주소가 변경 혹은 삭제되었을 수 있습니다.
                    입력하신 주소가 정확한지 다시 한 번 확인해주시기 바랍니다.
                </Info>
                <Button onClick={() => navigate('/main')}>메인으로</Button>
            </Info404>
        </Container>
    );
};

export default NotFound404;