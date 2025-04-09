import { Button } from "antd";
import styled from "styled-components";

export const HeaderTitle = styled.div`
    font-size: 20px;
    font-weight: 700;
`;

export const ButtonAdd = styled(Button)`
    display: flex;
    align-items: center;
    margin-top: 30px;
    background-color: #fff !important;
    color: #000 !important;
    font-weight: 700 ;
    &:hover {
        color: #f6ac00 !important;
    }
`;