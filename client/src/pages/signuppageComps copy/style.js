import styled from "styled-components";
import bgimg from "../../assest/image/background.jpg"
import InputForm from "../../components/inputformComps/inputform";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

export const Body = styled.div`
    display: block;
    width: 100%;
    height: 100vh;
    background-image: url(${bgimg});
    background-size: cover;
    background-position: center;
    margin: 0;
    padding: 0;
    overflow: auto;

`

export const ButtonBack = styled(Link)`
    display: block;
    text-decoration: none;
    position: absolute;
    top: 40px;
    left: 200px;
    color: #fff;
    font-size: 30px;
    transition:  color 0.3s ease-in-out;
    &:hover {
        color: #F6AC00 !important;
    }
`

export const Wrapped = styled.div`
    max-width: 800px;
    margin: 50px auto;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    overflow: auto;
    background-color: #f0f0f0;
`

export const WrappedSlider = styled.div`
    width: 50%;
    overflow: hidden;
`

export const Content = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    jutify-content: center;
    align-items: center;
    gap: 20px;
`

export const WrappedInput = styled.div`
  width: 80%;
  position: relative;
`;

export const InputStyle = styled(InputForm)`
  height: 40px;
`;

export const EyeIcon = styled(({ isShowPassword,  ...props }) =>
  isShowPassword ? <EyeFilled {...props} /> : <EyeInvisibleFilled {...props} />
)`
  height: 40px;
  position: absolute;
  z-index: 1;
  left: 90%;
`;

export const ButtonSignIn = styled(Button)`
    display: flex;
    justify-content:center;
    align-items: center;
    margin: 26px 0 20px;
    background-color: #F6AC00;
    border-radius: 8px; 
    width: 80%;
    height: 45px; 
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    border: none;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    &:hover {
        background-color: #fff !important;
        color: #F6AC00 !important;
    }
`

export const ButtonLink = styled.span`
    text-decoration: none;
    color: #F6AC00;
    font-weight: bold;
    cursor: pointer;
`