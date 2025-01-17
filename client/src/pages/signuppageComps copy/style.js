import styled from "styled-components";
import bgimg from "../../assest/image/background.jpg"
import { Button } from "antd";

export const Body = styled.div`
    width: 100%;
    height: 100vh;
    text-align: center;
    background-image: url(${bgimg});
    background-size: cover;
    background-position: center;
    margin: 0;
    padding: 0;
    overflow: auto;
`

export const Wrapped = styled.div`
    max-width: 800px;
    margin: 50px auto;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    overflow: auto;
    background-color: #f0f0f0;
`

export const Content = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    jutify-content: center;
    align-items: center;
    gap: 20px;
`

export const ButtonSignIn = styled(Button)`
    display: flex;
    justify-content:center;
    align-items: center;
    margin: 26px 0 20px;
    background-color: #F6AC00;
    border-radius: 8px; 
    width: 80%;
    height: 45px; 
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    border: none;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    &:hover {
        background-color: #fff;
        color: #F6AC00 !important;
    }
`