import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    height: 100%;
    background-color:rgb(224, 224, 224);
`

export const WrappedNavi = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center:
    align-items: center;
    width: 250px;
    height: 100%;
    background-color: #404040;
    position: fixed;
    margin: 10px 0px 0px ;
    // padding: 0px 0px 0px 10px;
    border-radius:0 10px 0 0;
`
export const Head = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    // justify-content: space-evenly;
    align-items: center;
    margin: 20px 0 20px 20px;
    gap: 20px;
`

export const ButtonNavi = styled.div`
    width: 100%;
    padding: 10px 0 ;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    cursor: pointer;
    font-weight: 500;
    color: #fff;
    &:hover {
        background-color: rgb(224, 224, 224);
        color: #404040;
    }
`

export const WrappedMange = styled.div`
    width: 100%;
    background-color: #f5f5f5;
    height: 10000px;
    margin: 10px 10px 10px 270px;
    border-radius: 10px;
`