import styled, { keyframes } from "styled-components";
import bgimg from "../../assest/image/background.jpg";
import InputForm from "../../components/inputformComps/inputform";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import LoadingButton from "../../components/loadingComps/loading";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 1;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

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
`;

export const ButtonBack = styled(Link)`
  display: block;
  text-decoration: none;
  position: absolute;
  top: 40px;
  left: 200px;
  color: #fff;
  font-size: 30px;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: #f6ac00 !important;
  }
`;

export const Wrapped = styled.div`
  max-width: 800px;
  margin: 50px auto;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  overflow: auto;
  background-color: #f0f0f0;

  animation: ${slideIn} 0.5s ease-in-out forwards;
`;

export const WrappedSlider = styled.div`
  width: 50%;
  overflow: hidden;
`;

export const Content = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  jutify-content: center;
  align-items: center;
  gap: 20px;
`;

export const WrappedInput = styled.div`
  width: 80%;
  position: relative;
`;

export const InputStyle = styled(InputForm)`
  height: 40px;
`;

export const EyeIcon = styled(({ isShowPassword, ...props }) =>
  isShowPassword ? <EyeFilled {...props} /> : <EyeInvisibleFilled {...props} />
)`
  height: 40px;
  position: absolute;
  z-index: 1;
  left: 90%;
`;

export const Alert = styled.div`
  width: 80%;
  color: #fe2020;
  font-size: 13px;
`;

export const ButtonStyled = styled(LoadingButton)`
  margin: 20px 0;
  width: 80%;
  height: 45px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  border: none;
`;

export const ButtonLink = styled.span`
  text-decoration: none;
  color: #f6ac00;
  font-weight: bold;
  cursor: pointer;
`;

export const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  background-color: ${(props) =>
    props.type === "success" ? "#4caf50" : "#f44336"};
  color: white;
  border-radius: 5px;
  z-index: 9999;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-out;
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
