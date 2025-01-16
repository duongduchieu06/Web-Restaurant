import styled from "styled-components";
import bgimg from "../../assest/image/background.jpg"

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
    gap: 20px;
    overflow: auto;
`

export const Content = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    jutify-content: center;
    align-items: center;
    gap: 20px;
`