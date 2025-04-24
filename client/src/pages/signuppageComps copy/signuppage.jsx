import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
 } from '@fortawesome/free-solid-svg-icons';
import { Body, Wrapped, WrappedSlider, Content, WrappedInput, InputStyle, EyeIcon, Alert, ButtonStyled, ButtonLink, ButtonBack, Notification } from "./style";
import SliderComponent from "../../components/sliderComps/Slider";
import slider1 from "../../assest/image/sliderSI1.jpg"
import slider2 from "../../assest/image/sliderSI2.jpg"
import slider3 from "../../assest/image/sliderSI3.jpg"
import slider4 from "../../assest/image/sliderSI4.jpg"
import slider5 from "../../assest/image/sliderSI5.jpg"
import slider6 from "../../assest/image/sliderSI6.jpg"
import slider7 from "../../assest/image/sliderSI7.jpg"
import { useNavigate } from "react-router-dom";
import * as UserService from '../../services/userservice'
import { useMutationHook } from "../../hook/useMutationHook";

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoadingCustom, setIsLoadingCustom] = useState(false)
  const [notification, setNotification] = useState(null);

  const mutation = useMutationHook(
    data => UserService.signUpUser(data)
  )
  const {data} = mutation

  useEffect(() => {
    if (data?.status === 'SUCCESS') {
      setNotification({ type: 'success', message: 'Đăng ký thành công! Vui lòng đăng nhập lại' });
      setTimeout(() => {
        setNotification(null); // Ẩn thông báo sau 3 giây
        handleNavigateLogin(); // Chuyển hướng sau khi thông báo biến mất
      }, 3000);
    } else if (data?.status === 'ERR') {
      setNotification({ type: 'error', message: 'Đăng ký thất bại. Vui lòng thử lại.' });
      setTimeout(() => {
        setNotification(null); // Ẩn sau 3 giây
      }, 3000);
    }
  }, [data]);

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
    setIsLoadingCustom(true);
    mutation.mutate({
      name,
      email,
      password,
      confirmPassword,
    })
    setTimeout(() => {
      setIsLoadingCustom(false);
    }, 3000);
  }

  const navigate = useNavigate()
  const handleNavigateLogin = () => {
    navigate('/SignIn')
  }
  const sliderImages = [slider1, slider2, slider3, slider4, slider5, slider6, slider7];

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
                <Alert>
                  {data?.status === 'ERR' && <span>{data?.message}</span>}
                </Alert>
                <ButtonStyled
                  disabled={!name || !email.length || !password.length || !confirmPassword.length}
                  isLoading={isLoadingCustom}
                  type="primary"
                  onClick={handleSignUp}
                  >
                  Đăng Ký
                </ButtonStyled>
                <p> Đã có tài khoản? <ButtonLink onClick={handleNavigateLogin}>Đăng Nhập</ButtonLink></p>
              </Content>
            </Wrapped>
        </Body>
      {notification && (
        <Notification type={notification.type}>
          {notification.message}
        </Notification>
      )}
    </>
  );
};

export default SignUpPage;