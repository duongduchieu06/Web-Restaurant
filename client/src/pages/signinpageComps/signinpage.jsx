import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
 } from '@fortawesome/free-solid-svg-icons';
import { Body, ButtonBack, Wrapped, WrappedSlider, Content, WrappedInput, InputStyle, EyeIcon, Alert, ButtonStyled, ButtonLink, Notification  } from "./style";
import SliderComponent from "../../components/sliderComps/Slider";
import slider1 from "../../assest/image/sliderSI1.jpg"
import slider2 from "../../assest/image/sliderSI2.jpg"
import slider3 from "../../assest/image/sliderSI3.jpg"
import slider4 from "../../assest/image/sliderSI4.jpg"
import slider5 from "../../assest/image/sliderSI5.jpg"
import { useNavigate } from "react-router-dom";
import * as UserService from '../../services/userservice'
import { useMutationHook } from "../../hook/useMutationHook";
import { jwtDecode } from "jwt-decode";
import {useDispatch} from 'react-redux'
import { updateUser } from "../../redux/slices/userSlice";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoadingCustom, setIsLoadingCustom] = useState(false)
  const [notification, setNotification] = useState(null)
  const dispatch = useDispatch()
  
  const mutation = useMutationHook(
    data => UserService.loginUser(data)
  )
  const {data} = mutation

  useEffect(() => {
    if (data?.status === 'SUCCESS') {
      setNotification({ type: 'success', message: 'Đăng nhập thành công!'});
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      if(data?.access_token) {
        const decode = jwtDecode(data?.access_token)
        // console.log("decode", decode)
        if(decode?.id){
          handleGetDetailUser(decode?.id, data?.access_token)
        }
      }
      setTimeout(() => {
        setNotification(null);
        handelNavigateHomePage();
      }, 2000)
    } else if (data?.status === 'ERR') {
      setNotification({ type: 'error', message: 'Đăng nhập thất bại!'})
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }, [data])
  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token)
    dispatch(updateUser( {...res?.data, access_token: token}))
  }

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

    const handleSignIn = () => {
    setIsLoadingCustom(true);
    mutation.mutate({
      email,
      password
    })
    setTimeout(() => {
      setIsLoadingCustom(false);
    }, 2000);
  }

  const navigate = useNavigate()
  const handelNavigateSignUp = () => {
    navigate('/SignUp')
  }
  const handelNavigateHomePage = () => {
    navigate('/')
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
                  <InputStyle placeholder='Vui lòng nhập Email' value={email} onChange={handleOnchangeEmail}/>
                </WrappedInput>
                <WrappedInput>
                  <EyeIcon isShowPassword={isShowPassword} onClick={() => setIsShowPassword(!isShowPassword)} />
                  <InputStyle type={isShowPassword ? 'text' : 'password'} placeholder='Vui lòng nhập mật khẩu' value={password} onChange={handleOnchangePassword} />
                </WrappedInput>
                <Alert>
                {data?.status === 'ERR' && <span>{data?.message}</span>}
                </Alert>
                <ButtonStyled
                  onClick={handleSignIn}
                  isLoading={isLoadingCustom}
                  disabled={!email.length || !password.length}
                  type="primary"
                  >
                  Đăng Nhập
                </ButtonStyled>
                <p> Chưa có tài khoản? <ButtonLink onClick={handelNavigateSignUp}>Đăng Ký</ButtonLink></p>
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

export default SignInPage;

