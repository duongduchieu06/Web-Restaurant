import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
 } from '@fortawesome/free-solid-svg-icons';
import { Body, ButtonBack, Wrapped, Content, ButtonSignIn, ButtonLink } from "./style";
import SliderComponent from "../../components/sliderComps/Slider";
import slider1 from "../../assest/image/sliderSI1.jpg"
import slider2 from "../../assest/image/sliderSI2.jpg"
import slider3 from "../../assest/image/sliderSI3.jpg"
import slider4 from "../../assest/image/sliderSI4.jpg"
import slider5 from "../../assest/image/sliderSI5.jpg"
import InputForm from "../../components/inputformComps/inputform";

const SignInPage = () => {
  const sliderImages = [slider1, slider2, slider3, slider4, slider5];

  return (
    <>
        <Body>
            <ButtonBack to={"/"}><FontAwesomeIcon icon={faArrowLeft} /></ButtonBack>
            <Wrapped>
              <div style={{width: "50%", overflow: "hidden"}}>
                <SliderComponent sliderImages={sliderImages}/>
              </div>
              <Content>
                <h1>Đăng Nhập</h1>
                <InputForm style={{ width: "80%", height: "40px"}} placeholder='Vui lòng nhập Email' />
                <InputForm style={{ width: "80%", height: "40px"}} placeholder='Vui lòng nhập mật khẩu' />
                <ButtonSignIn 
                  // disabled={!email.length || !password.length}
                  // type="primary"
                  >
                  Đăng Nhập
                </ButtonSignIn>
                <p> Chưa có tài khoản? <ButtonLink to={'/SignUp'}>Đăng Ký</ButtonLink></p>
              </Content>
            </Wrapped>
        </Body>
    </>
  );
};

export default SignInPage;