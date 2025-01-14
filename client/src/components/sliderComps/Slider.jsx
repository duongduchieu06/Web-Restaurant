// src/components/sliderComps/Slider.jsx
import React from 'react';
import Slider from 'react-slick';
import { Image } from 'antd';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slider1 from '../../assest/image/slider1.png';
import slider2 from '../../assest/image/slider2.jpg';
import slider3 from '../../assest/image/slider3.jpg';
import slider4 from '../../assest/image/slider4.jpg';

const SliderComponent = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const sliderImages = [slider1, slider2, slider3, slider4];
  return (
    <Slider {...settings}>
      {sliderImages.map((image, index) => (
        <Image key={index} src={image} alt="slider" preview={false} width="100%" height="700px"/>
      ))}
    </Slider>
  );
};

export default SliderComponent;