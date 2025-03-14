import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
 } from '@fortawesome/free-solid-svg-icons';
import { Body, Wrapped, WrappedSlider, Content, WrappedInput, InputStyle, EyeIcon, ButtonSignIn, ButtonLink, ButtonBack } from "./style";
import SliderComponent from "../../components/sliderComps/Slider";
import slider1 from "../../assest/image/sliderSI1.jpg"
import slider2 from "../../assest/image/sliderSI2.jpg"
import slider3 from "../../assest/image/sliderSI3.jpg"
import slider4 from "../../assest/image/sliderSI4.jpg"
import slider5 from "../../assest/image/sliderSI5.jpg"
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleOnchangeName = (value) => {
    setName(value)
  }

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  const handleSignUp = () => {

  }

  const navigate = useNavigate()
  const handleNavigateLogin = () => {
    navigate('/SignIn')
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
                <h1>Đăng Ký</h1>
                <WrappedInput>
                  <InputStyle placeholder='Vui lòng nhập Tên' value={name} onChange = {handleOnchangeName}/>
                </WrappedInput>
                <WrappedInput>
                  <InputStyle placeholder='Vui lòng nhập Email' value={email} onChange = {handleOnchangeEmail}/>
                </WrappedInput>
                <WrappedInput>
                  <EyeIcon isShowPassword={isShowPassword} onClick={() => setIsShowPassword(!isShowPassword)}/>
                  <InputStyle type={isShowPassword ? 'text' : 'password'} placeholder='Vui lòng nhập mật khẩu' value={password} onChange={handleOnchangePassword}/>
                </WrappedInput>
                <WrappedInput>
                  <EyeIcon isShowPassword={isShowConfirmPassword} onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}/>
                  <InputStyle type={isShowConfirmPassword ? 'text' : 'password'} placeholder='Vui lòng nhập lại mật khẩu' value={confirmPassword} onChange={handleOnchangeConfirmPassword} />
                </WrappedInput>
                <ButtonSignIn 
                  disabled={!name || !email.length || !password.length || !confirmPassword.length}
                  type="primary"
                  onClick={handleSignUp}
                  >
                  Đăng Ký
                </ButtonSignIn>
                <p> Đã có tài khoản? <ButtonLink onClick={handleNavigateLogin}>Đăng Nhập</ButtonLink></p>
              </Content>
            </Wrapped>
        </Body>
    </>
  );
};

export default SignUpPage;