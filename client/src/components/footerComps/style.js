import styled from "styled-components"
import logo from "../../assest/image/logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Box = styled.div`
    background-color: #000;
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const FooterLogo = styled.div`
    background-image: url(${logo});
    background-size: cover;
    width: 250px;
    height: 250px;  
`

export const Label = styled.div`
    color: #fff;
    font-size: 40px;
    font-weight: bold;
`

export const Wrapped = styled.div`
    display: flex;
    background-color: #A11D25;
    justify-content: space-evenly;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        height: 1px;   
        width: 100%;
        background-color: #fff;
        top: 10px;
        right: 0;
        bot: 0;
        left: 0;
    }
`

export const WrappedContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 35%;
    color: #fff;
    font-size: 14px;
    gap: 10px;
    padding: 40px 0;
`

export const Element = styled.div`
    display: flex;
    align-items: center;
    height: auto;
`


export const Name = styled.div`
    font-weight: bold;
    display: inline-block;
`

export const Location = styled.div`
    display: inline-block;
    margin-left: 5px;
`

export const WrappedContact = styled.div`
    background-color: #A11D25;
    // height: 100%;
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    position: relative;
    z-index: 1;


    &::after {
        content: "";
        position: absolute;
        height: 1px;   
        width: 100%;
        background-color: #fff;
        top: 80%;
        right: 0;
        bot: 0;
        left: 0;
    }
`

export const Icon = styled(FontAwesomeIcon)`
  width: 50px;
  height: 50px;
  color: #fff;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #F6AC00;
  }
`