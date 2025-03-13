import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
 } from '@fortawesome/free-solid-svg-icons';
import { Body, ButtonBack, Wrapped, WrappedSlider, Content, WrappedInput, InputStyle, EyeIcon, ButtonSignIn, ButtonLink,  } from "./style";
import SliderComponent from "../../components/sliderComps/Slider";
import slider1 from "../../assest/image/sliderSI1.jpg"
import slider2 from "../../assest/image/sliderSI2.jpg"
import slider3 from "../../assest/image/sliderSI3.jpg"
import slider4 from "../../assest/image/sliderSI4.jpg"
import slider5 from "../../assest/image/sliderSI5.jpg"
import { useNavigate } from "react-router-dom";


const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const navigate = useNavigate()
  const handelNavigateSignUp = () => {
    navigate('/SignUp')
  }
  const sliderImages = [slider1, slider2, slider3, slider4, slider5];

  return (
    <>
        <Body>
            <ButtonBack to={"/"}><FontAwesomeIcon icon={faArrowLeft} /></ButtonBack>
            <Wrapped>
              <WrappedSlider>
                <SliderComponent sliderImages={sliderImages}/>
              </WrappedSlider>
              <Content>
                <h1>Đăng Nhập</h1>
                <WrappedInput>
                  <InputStyle placeholder='Vui lòng nhập Email' />
                </WrappedInput>
                <WrappedInput>
                  <EyeIcon isShowPassword={isShowPassword} onClick={() => setIsShowPassword(!isShowPassword)} />
                  <InputStyle type={isShowPassword ? 'text' : 'password'} placeholder='Vui lòng nhập mật khẩu' />
                </WrappedInput>
                <ButtonSignIn
                  // disabled={!email.length || !password.length}
                  // type="primary"
                  >
                  Đăng Nhập
                </ButtonSignIn>
                <p> Chưa có tài khoản? <ButtonLink onClick={handelNavigateSignUp}>Đăng Ký</ButtonLink></p>
              </Content>
            </Wrapped>
        </Body>
    </>
  );
};

export default SignInPage;