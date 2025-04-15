import styled from "styled-components";
import InputForm from "../../components/inputformComps/inputform";
import LoadingButton from "../../components/loadingComps/loading";

export const Container = styled.div`
  background-color: #f5f5f5;
  padding: 170px 0 40px;
`;

export const Wrapped = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 30px;
  border: 2px solid #f6ac00;
  border-radius: 10px;
  background-color: #fff;
`;

export const WrappedBooking = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const WrappedContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const WrappedButton = styled.div`
  display: flex;
  width: 80%;
  margin: 20px auto;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;
`

export const SpanStyled = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #f6ac00;
`

export const ButtonStyled = styled(LoadingButton)`
  width: 150px;
  padding: 8px;
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
`


export const BoxWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  gap: 20px;
`;

export const BoxInput = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  gap: 10px;
  border: 1px solid #DDDDDD;
  border-radius: 10px;
`;

export const Label = styled.span`
  width: 40%;
  font-size: 14px;
  font-weight: 600;
`;

export const LabelB = styled.span`
  width: 15%;
  font-size: 14px;
  font-weight: 600;
`;

export const InputStyled = styled(InputForm)`
  width: 60%;
`;

export const BoxItemTimes = styled.div`
  width: 85%;
  display: flex; 
  gap: 10px;
  flex-wrap: wrap; 
`

export const ItemTimne = styled.div`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

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

