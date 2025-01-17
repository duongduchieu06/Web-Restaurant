import React from "react";
import { Wrapped, WrappedMenu, WrappedContent } from "./style";
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

            <span style={{fontSize: 40, fontWeight: "bold", color: "#fff", paddingTop: "50px"}}>MENU</span>
            <span style={{fontSize: 40, fontWeight: "bold", color: "#fff", paddingTop: "40px"}}>Choose your nearest restaurant</span>
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