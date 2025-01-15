import React from "react";
import { Wrapped, WrappedMenu, WrappedContent } from "./style";
import SliderComponent from "../../components/sliderComps/Slider";
import BoxContent from "../../components/boxcontentComps/boxcontent";
import Line from "../../components/lineComps/line";
const MenuPage = () => {
  return (
    <>
      <Wrapped>
        <SliderComponent />
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