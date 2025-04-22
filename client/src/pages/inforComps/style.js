import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    margin-top: 130px;
    overflow-x: hidden;
    background-color: #A11D25;
    padding-bottom: 40px;
`

export const WrappedMenu = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Title = styled.span`
    font-size: 40px;
    font-weight: 700;
    color: #fff;
    
`

export const TextBehind = styled.div`
    font-size: 250px;
    font-weight: 700;
    opacity: 0.07;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // z-index: 1;
`

export const Wrapped = styled.div`
    width: 100%;
    padding: 45px 0;
`

export const WrappedContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    max-width: 1270px;
    margin: 30px auto;
`


export const Description = styled.div`
    display: flex;
    flex-direction: column;
`

