import { Button } from "antd";
import styled from "styled-components";
import LoadingButton from "../../components/loadingComps/loading";

export const Container = styled.div`
  background-color: #f5f5f5;
  padding: 170px 0 40px;
`;

export const Wrapped = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  border: 2px solid #f6ac00;
  border-radius: 10px;
  background-color: #fff;
  // align-items: center;
`;

export const Content = styled.div`
  display: flex;
  // flex-direction: column;
  gap: 20px;
  padding: 20px 0;
`;

export const Infor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  position: relative;
  padding: 0 40px;
  &:after {
    content: "";
    position: absolute;
    height: 100%;
    width: 2px;
    background-color: #f6ac00;
    // top: 10px;
    // right: 100%;
    bot: 0;
    left: 100%;
  }
`;

export const ImageAvatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`
export const Label = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

export const BoxWrapper = styled.div`
  display: flex;
  jutify-content: center;
  align-items: center;
  gap: 50px;
`;

export const BoxButtonEdit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 78%;
  left: 25%;
  border: 2px solid #3d3d3d;
  background-color: #fff;
  padding: 2px 3px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  &:hover {
    color: #fff;
    background-color: #3d3d3d;
  }
`;

export const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Alert = styled.div`
  width: 80%;
  color: #fe2020;
  font-size: 13px;
`;

export const InforDetail = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

export const ButtonStyled = styled(Button)`
  width: 120px;
  padding: 8px 80px;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  border: 2px solid #000;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  &:hover {
    background-color: #fff !important;
    color: #000 !important;
    border: 2px solid #000 !important;
  }
`;

export const ButtonSave = styled(LoadingButton)`
  width: 120px;
  padding: 8px 80px;
  background-color: #f6ac00;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  border: 2px solid #f6ac00;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out, border 0.3s ease-in-out;
  &:hover {
    background-color: #fff !important;
    color: #f6ac00 !important;
    border: 2px solid #f6ac00 !important;
  }
`;

export const Popup = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1001;
  border-radius: 10px;
`;

export const BackgroundPopup = styled(Button)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
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
