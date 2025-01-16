import React from "react";
import { Body, Wrapped, Content } from "./style";
import SliderComponent from "../../components/sliderComps/Slider";
import slider1 from "../../assest/image/sliderSI1.jpg"
import slider2 from "../../assest/image/sliderSI2.jpg"
import slider3 from "../../assest/image/sliderSI3.jpg"
import slider4 from "../../assest/image/sliderSI4.jpg"
import slider5 from "../../assest/image/sliderSI5.jpg"

const SignInPage = () => {
  const sliderImages = [slider1, slider2, slider3, slider4, slider5];

  return (
    <>
        <Body>
            <Wrapped>
              <div style={{width: "50%"}}>
                <SliderComponent sliderImages={sliderImages}/>
              </div>
              <Content>
                <h1>Đăng Nhập</h1>
                
              </Content>
            </Wrapped>
        </Body>
    </>
  );
};

export default SignInPage;