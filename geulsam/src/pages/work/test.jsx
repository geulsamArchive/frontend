import React, { useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const CarouselContainer = styled.div`
  /* 캐러셀 컨테이너 스타일 */
  overflow: hidden;
`;

const Slide = styled.div`
  padding: 10px;
  transition: transform 0.3s ease;
  background-color: blue;
  border-radius: 10px;
  /* 기본 슬라이드 스타일 */
  &.center-slide {
    transform: scale(1.2); /* 가운데 슬라이드 확대 */
    z-index: 1; /* 가운데 슬라이드를 앞으로 */
  }
`;

export default function Test() {
    const [activeIndex, setActiveIndex] = useState(0);

    const settings = {
        slidesToShow: 5,
        slidesToScroll: 1,
        beforeChange: (current, next) => setActiveIndex(next),
        infinite: false, // 비순환 모드
    };

    // 슬라이드 클래스 설정
    const getSlideClass = (index) => (index === activeIndex ? 'center-slide' : '');

    return (
        <CarouselContainer>
            <Slider {...settings}>
                {[...Array(10)].map((_, index) => (
                    <Slide key={index} className={getSlideClass(index)}>
                        {/* 슬라이드 내용 */}
                        슬라이드 {index}입니다.
                    </Slide>
                ))}
            </Slider>
        </CarouselContainer>
    );
}
