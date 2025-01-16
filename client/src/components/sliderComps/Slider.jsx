// src/components/sliderComps/Slider.jsx
import React from 'react';
import { Image, StyledSlider, Slides } from "./style"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderComponent = ({sliderImages}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <StyledSlider {...settings}>
      {sliderImages.map((image, index) => (
        <Slides key={index}>
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
          />
        </Slides>
      ))}
    </StyledSlider>
  );
};

export default SliderComponent;