import { Button } from "antd";
import styled from "styled-components";

export const Container = styled.div`
    background-color: #F5F5F5;
    padding: 170px 0 40px;
`;

export const Wrapped = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 0 30px;
    border: 2px solid #F6AC00;
    border-radius: 10px;
    background-color: #fff;
    // align-items: center;
`

export const Content = styled.div`
    display: flex;
    // flex-direction: column;
    gap: 20px;
    padding: 20px 0;
`

export const Infor = styled.div`
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: center;
    gap: 30px;
    position: relative;
    padding: 0 40px;
    &:after {
        content: "";
        position: absolute;
        height: 100%;   
        width: 2px;
        background-color: #F6AC00;
        // top: 10px;
        // right: 100%;
        bot: 0;
        left: 100%;
    }
`

export const Label = styled.span`
    font-size: 18px;
    font-weight: 600;
`

export const BoxContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const InforDetail = styled.span`
    font-size: 18px;
    font-weight: 600;
`

export const ButtonStyled = styled.div` 
    width: 120px;
    padding: 5px 0px;
    background-color: #000;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    border: 2px solid #000;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    &:hover {
        background-color: #fff;
        color: #000;
        border: 2px solid #000;
    }
`

export const ButtonSave = styled.div` 
    width: 120px;
    padding: 5px 0px;
    background-color: #F6AC00;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    border: 2px solid #F6AC00;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    &:hover {
        background-color: #fff;
        color: #F6AC00;
        border: 2px solid #F6AC00;
    }
`

export const Popup = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    gap: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1001;
    border-radius: 10px;
`

export const BackgroundPopup = styled(Button)`
    position: fixed;
    top: 0; 
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`
