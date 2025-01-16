import React from "react";
import { Wrapped } from "./style";
import SliderComponent from "../../components/sliderComps/Slider";
import slider1 from '../../assest/image/slider1.jpg';
import slider2 from '../../assest/image/slider2.jpg';
import slider3 from '../../assest/image/slider3.jpg';

const HomePage = () => {
  const sliderImages = [slider1, slider2, slider3];

  return (
    <>
      <Wrapped>
        <SliderComponent  sliderImages={sliderImages}/>
      </Wrapped>
      <div style={{height: '1000px'}}>

      </div>
    </>
  );
};

export default HomePage;