import styled from "styled-components";
import anh from "../../assest/image/hihi.jpg";

export const Name = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: #fff;
`;

export const Wrapped = styled.div`
  display: flex;
  width: 600px;
  height: 200px;
  gap: 20px;
  transition: color 0.3s ease-in-out;
  &:hover ${Name} {
    color: #f6ac00;
  }
`;

export const Image = styled.div`
  width: 250px;
  height: 150px;
  border-radius: 10px;
  background-image: url(${anh});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Description = styled.div`
  color: #fff;
`;

export const Price = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #fff;
`;
