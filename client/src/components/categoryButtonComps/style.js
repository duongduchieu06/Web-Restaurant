import styled from "styled-components";

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: #f6ac00;
  }
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
  &:hover {
    color: #f6ac00;
  }
`;


export const ButtonNavigate = styled.div`
  cursor: pointer;
  font-weight: 700;
  line-height: 1.5;
  font-size: 18px;
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