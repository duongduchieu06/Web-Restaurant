import styled, { keyframes } from "styled-components";
const slideInLR = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 1;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInRL = keyframes`
  from {
    transform: translateX(100%);
    opacity: ;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;


export const Wrapped = styled.div`
    margin-top: 130px;
    overflow-x: hidden;
`
export const WrapperContent = styled.div`
    height: auto;
    padding: 120px 0;
`

export const BoxText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    animation: ${slideInLR} 0.5s ease-in-out forwards;
`

export const TextBehind = styled.div`
    font-size: 250px;
    font-weight: 700;
    opacity: 0.09;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
`
export const TextFront = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: relative;
    z-index: 2;
`

export const BoxImage = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 60px;
    animation: ${slideInLR} 0.5s ease-in-out forwards;
`
export const BoxImage2 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 60px;
    animation: ${slideInRL} 0.5s ease-in-out forwards;
`

export const WrappedImageText = styled.div`
    position: relative;
    width: 500px;
    height: 230px;
`
export const TextImage = styled.div`
    text-align: center;
    position: relative;
    font-size: 70px;
    font-weight: 400;
    color: #f6ac00;
`
export const ImageBackground = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const ImageSpecial = styled.img`
    max-width: 500px;
    height: 700px;
    object-fit: contain
`