import styled from 'styled-components'
// import { Link } from "react-router-dom";

export const HeaderWrapped = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: #fff;
`
export const HeaderLogo = styled.div`
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    top: 0;
    left: 150px;
    bottom: 0;
    right: 0;
    background-size: cover;
    z-index: 1;
`

export const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    gap : 30px; 
    justify-content: flex-end;
    padding: 0 150px;
`

export const ButtonLanguage = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    cursor: pointer;
`

export const BoxButton = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.2);
    width: auto;
    height: auto;
    border-radius: 40px;
    padding: 5px;
    position: relative;
`

export const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 0;
    background-color: #F6AC00;
    width: 150px;
    height: 100%;
    border-radius: 20px;
    color: #fff;
    cursor: pointer;
    font-size: 15px;
    font-weight: bold;
    gap: 10px;
    text-decoration: none;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

    &:hover {
        background-color: #fff;
        color: #F6AC00;
    }
`

export const WrapperContentPopup = styled.div`
    width: 150px;
    display: flex;
    flex-direction: column;
    gap: 5px;
`

export const ContentPopup = styled.div`
    color: #F6AC00;
    font-weight: 700;
    border-radius: 2.5px;
    padding: 3px 8px;
    cursor: pointer;
    &:hover {
        background-color: #F6AC00;
        color: #fff;
    }
`

