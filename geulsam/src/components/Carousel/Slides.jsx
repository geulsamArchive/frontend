import React, { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Contents, Slide, SliderContainer } from "../../style/Carousel";
import { TitleBold } from "../../style/StyledComponent";

function CenterMode({ data }) {
    const [monthIdx, setMonthIdx] = useState(0);
    const sliderRef = useRef(null);

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "50px",
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 300,
        arrows: false,
        beforeChange: (current, next) => setMonthIdx(next)
    };


    const onClickSlide = (idx) => {
        setMonthIdx(idx)
        sliderRef.current.slickGoTo(idx);
    }

    return (
        <SliderContainer>
            <Slider ref={sliderRef} {...settings}>
                {data.map((monthdata, idx) => (
                    <div key={idx}>
                        <Slide className={idx === monthIdx ? "active" : ""} onClick={() => (onClickSlide(idx))}>
                            <TitleBold>
                                {monthdata.month}
                            </TitleBold>
                            <Contents>
                                {monthdata.events.map((events, eventIdx) => (
                                    <div key={eventIdx}>
                                        {events.title}
                                    </div>
                                ))}
                            </Contents>
                        </Slide>
                    </div>
                ))}
            </Slider>
        </SliderContainer>
    );
}

export default CenterMode;
