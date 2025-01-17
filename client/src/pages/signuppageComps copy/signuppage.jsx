import React, {useState} from "react";
import { Body, Wrapped, Content, ButtonSignIn } from "./style";
import SliderComponent from "../../components/sliderComps/Slider";
import slider1 from "../../assest/image/sliderSI1.jpg"
import slider2 from "../../assest/image/sliderSI2.jpg"
import slider3 from "../../assest/image/sliderSI3.jpg"
import slider4 from "../../assest/image/sliderSI4.jpg"
import slider5 from "../../assest/image/sliderSI5.jpg"
import InputForm from "../../components/inputformComps/inputform";

const SignUpPage = () => {
  const sliderImages = [slider1, slider2, slider3, slider4, slider5];

  return (
    <>
        <Body>
            <Wrapped>
              <div style={{width: "50%", overflow: "hidden"}}>
                <SliderComponent sliderImages={sliderImages}/>
              </div>
              <Content>
                <h1>Đăng Ký</h1>
                <InputForm style={{ width: "80%", height: "40px"}} placeholder='Vui lòng nhập Tên' />
                <InputForm style={{ width: "80%", height: "40px"}} placeholder='Vui lòng nhập Email' />
                <InputForm style={{ width: "80%", height: "40px"}} placeholder='Vui lòng nhập mật khẩu' />
                <InputForm style={{ width: "80%", height: "40px"}} placeholder='Vui lòng nhập lại mật khẩu' />
                <ButtonSignIn 
                  // disabled={!email.length || !password.length}
                  // type="primary"
                  >
                  Đăng Ký
                </ButtonSignIn>
              </Content>
            </Wrapped>
        </Body>
    </>
  );
};

export default SignUpPage;