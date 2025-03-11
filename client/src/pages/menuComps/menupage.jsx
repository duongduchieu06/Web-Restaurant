import React from "react";
import { Wrapped, Title, WrappedMenu, WrappedContent } from "./style";
import SliderComponent from "../../components/sliderComps/Slider";
import BoxContent from "../../components/boxcontentComps/boxcontent";
import Line from "../../components/lineComps/line";
import slider1 from '../../assest/image/slider1.jpg';
import slider2 from '../../assest/image/slider2.jpg';
import slider3 from '../../assest/image/slider3.jpg';

const MenuPage = () => {
  const sliderImages = [slider1, slider2, slider3];
  return (
    <>
      <Wrapped>
        <SliderComponent sliderImages={sliderImages}/>
        <Line />
        <WrappedMenu>

            <Title>MENU</Title>
            <Title>Choose your nearest restaurant</Title>
            <WrappedContent>
              <BoxContent />
              <BoxContent />
              <BoxContent />
              <BoxContent />
              <BoxContent />
              <BoxContent />
              <BoxContent />
              <BoxContent />
            </WrappedContent>
        </WrappedMenu>
      </Wrapped>
    </>
  );
};

export default MenuPage;