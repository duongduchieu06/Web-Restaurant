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
