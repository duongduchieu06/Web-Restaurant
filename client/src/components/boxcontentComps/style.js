import styled from "styled-components";


export const Name = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #fff;
`;
export const Type = styled.div`
  font-weight: bold;
  color: #f6ac00;
`;

export const Wrapped = styled.div`
  display: flex;
  width: 600px;
  height: 200px;
  gap: 20px;
  transition: color 0.3s ease-in-out;
  &:hover ${Name} {
    color:rgb(255, 179, 0);
  }
`;

export const Image = styled.div`
  width: 250px;
  height: 200px;
  border-radius: 10px;
  
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 60%;
`;

export const Description = styled.div`
  color: #fff;
  font-size:16px; 
`;

export const Price = styled.div`
  font-weight: bold;
  font-size: 24px;
  color: #fff;
`;

