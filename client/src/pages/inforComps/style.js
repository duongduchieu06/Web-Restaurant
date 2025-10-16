import styled from "styled-components";

export const Wrapped = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const WrapperContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${({ direction }) => direction || "column"};
  align-items: center;
  justify-content: center;
  padding: 100px 80px;
  min-height: 100vh;
  background-image: ${({ bgImage }) => `url(${bgImage})`};
  background-size: cover;
  background-position: center;
  gap: 60px;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.35);
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 30px;
  background-color: #18441A;
`;

export const BoxText = styled.div`
  flex: 1;
  color: ${({ textColor }) => textColor || "#fff"};
  text-align: left;
  padding: 20px;
  max-width: 800px;
`;

export const TextBehind = styled.h1`
  position: absolute;
  font-size: 200px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.08);
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  white-space: nowrap;
`;

export const TextFront = styled.div`
  font-size: 24px;
  font-weight: 400;
  line-height: 1.6;
`;

export const Paragraph = styled.p`
  margin-top: 20px;
  font-size: 18px;
  line-height: 1.8;
  color: inherit;
`;

export const BoxImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;

  &.restaurant-gallery img {
    width: 300px;
    height: 220px;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
  }
`;

export const ImageShow = styled.img`
  width: ${({ large }) => (large ? "500px" : "280px")};
  height: ${({ large }) => (large ? "400px" : "auto")};
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.5);
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(1.05);
  }
`;
