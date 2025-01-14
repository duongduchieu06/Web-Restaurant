import styled from 'styled-components'

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

