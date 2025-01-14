import React from "react";
import { Wrapped } from "./style";
import SliderComponent from "../../components/sliderComps/Slider";
const HomePage = () => {

  return (
    <>
      <Wrapped>
        <SliderComponent />
      </Wrapped>
      <div style={{height: '1000px'}}>

      </div>
    </>
  );
};

export default HomePage;