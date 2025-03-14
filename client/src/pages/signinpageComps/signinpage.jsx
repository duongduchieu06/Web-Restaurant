import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
 } from '@fortawesome/free-solid-svg-icons';
import { Body, ButtonBack, Wrapped, WrappedSlider, Content, WrappedInput, InputStyle, EyeIcon, Alert, ButtonSignIn, ButtonLink,  } from "./style";
import SliderComponent from "../../components/sliderComps/Slider";
import slider1 from "../../assest/image/sliderSI1.jpg"
import slider2 from "../../assest/image/sliderSI2.jpg"
import slider3 from "../../assest/image/sliderSI3.jpg"
import slider4 from "../../assest/image/sliderSI4.jpg"
import slider5 from "../../assest/image/sliderSI5.jpg"
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as UserService from '../../services/userservice'
import { useMutationHook } from "../../hook/useMutationHook";


const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  
  const mutation = useMutationHook(
    data => UserService.loginUser(data)
  )
  const {data, isLoading} = mutation

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password
    })
  }

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
                  <InputStyle placeholder='Vui lòng nhập Email' value={email} onChange={handleOnchangeEmail}/>
                </WrappedInput>
                <WrappedInput>
                  <EyeIcon isShowPassword={isShowPassword} onClick={() => setIsShowPassword(!isShowPassword)} />
                  <InputStyle type={isShowPassword ? 'text' : 'password'} placeholder='Vui lòng nhập mật khẩu' value={password} onChange={handleOnchangePassword} />
                </WrappedInput>
                <Alert>
                {data?.status === 'ERR' && <span>{data?.message}</span>}
                </Alert>
                  <ButtonSignIn
                    disabled={!email.length || !password.length}
                    type="primary"
                    onClick={handleSignIn}
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



// import React, { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
// import { Body, ButtonBack, Wrapped, WrappedSlider, Content, WrappedInput, InputStyle, EyeIcon, Alert, ButtonLink } from "./style";
// import SliderComponent from "../../components/sliderComps/Slider";
// import slider1 from "../../assest/image/sliderSI1.jpg"
// import slider2 from "../../assest/image/sliderSI2.jpg"
// import slider3 from "../../assest/image/sliderSI3.jpg"
// import slider4 from "../../assest/image/sliderSI4.jpg"
// import slider5 from "../../assest/image/sliderSI5.jpg"
// import { useNavigate } from "react-router-dom";
// import * as UserService from '../../services/userservice'
// import { useMutationHook } from "../../hook/useMutationHook";
// import LoadingButton from "../../components/LoadingButton"; // Import component mới

// const SignInPage = () => {
//   const [isShowPassword, setIsShowPassword] = useState(false)
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [isLoadingCustom, setIsLoadingCustom] = useState(false)

//   const navigate = useNavigate()
  
//   const mutation = useMutationHook(
//     data => UserService.loginUser(data)
//   )
//   const {data} = mutation

//   const handleOnchangeEmail = (value) => {
//     setEmail(value)
//   }

//   const handleOnchangePassword = (value) => {
//     setPassword(value)
//   }

//   const handleSignIn = () => {
//     setIsLoadingCustom(true);
//     mutation.mutate({
//       email,
//       password
//     })

//     setTimeout(() => {
//       setIsLoadingCustom(false);
//     }, 2000);
//   }

//   const handelNavigateSignUp = () => {
//     navigate('/SignUp')
//   }
  
//   const sliderImages = [slider1, slider2, slider3, slider4, slider5];

//   return (
//     <>
//         <Body>
//             <ButtonBack to={"/"}><FontAwesomeIcon icon={faArrowLeft} /></ButtonBack>
//             <Wrapped>
//               <WrappedSlider>
//                 <SliderComponent sliderImages={sliderImages}/>
//               </WrappedSlider>
//               <Content>
//                 <h1>Đăng Nhập</h1>
//                 <WrappedInput>
//                   <InputStyle 
//                     placeholder='Vui lòng nhập Email' 
//                     value={email} 
//                     onChange={(e) => handleOnchangeEmail(e.target.value)}
//                   />
//                 </WrappedInput>
//                 <WrappedInput>
//                   <EyeIcon 
//                     isShowPassword={isShowPassword} 
//                     onClick={() => setIsShowPassword(!isShowPassword)} 
//                   />
//                   <InputStyle 
//                     type={isShowPassword ? 'text' : 'password'} 
//                     placeholder='Vui lòng nhập mật khẩu' 
//                     value={password} 
//                     onChange={(e) => handleOnchangePassword(e.target.value)} 
//                   />
//                 </WrappedInput>
//                 <Alert>
//                   {data?.status === 'ERR' && <span>{data?.message}</span>}
//                 </Alert>
//                 <LoadingButton
//                   onClick={handleSignIn}
//                   isLoading={isLoadingCustom}
//                   disabled={!email.length || !password.length}
//                   type="primary"
//                 >
//                   Đăng Nhập
//                 </LoadingButton>
//                 <p> Chưa có tài khoản? <ButtonLink onClick={handelNavigateSignUp}>Đăng Ký</ButtonLink></p>
//               </Content>
//             </Wrapped>
//         </Body>
//     </>
//   );
// };

// export default SignInPage;