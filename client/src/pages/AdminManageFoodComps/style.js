import { Button } from "antd";
import styled from "styled-components";
import LoadingButton from "../../components/loadingComps/loading";
import InputForm from "../../components/inputformComps/inputform";

export const HeaderTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const ButtonAdd = styled(Button)`
  display: flex;
  align-items: center;
  margin-top: 30px;
  background-color: #fff !important;
  color: #000 !important;
  font-weight: 700;
  &:hover {
    color: #f6ac00 !important;
  }
`;

export const BoxWrapper = styled.div`
  display: flex;
  jutify-content: center;
  align-items: center;
  gap: 20px;
  flex-direction: column;
  width: 80%;
`;

export const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BoxInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Label = styled.span`
  font-size: 18px;
  font-weight: 600;
`;
export const InputStyled = styled(InputForm)`
  width: 80%;
`;
export const SelecteStyled = styled.select`
  width: 80%;
  border: none;
  padding: 0 6px;
`;
export const InputFileStyled = styled.input`
  width: 80%;
`;
export const Alert = styled.div`
  width: 80%;
  color: #fe2020;
  font-size: 13px;
`;

export const Popup = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
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
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out,
    border 0.3s ease-in-out;
  &:hover {
    background-color: #fff !important;
    color: #f6ac00 !important;
    border: 2px solid #f6ac00 !important;
  }
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
