import styled from "styled-components";
import {Input} from "antd"

export const InputText = styled(Input)`
    border-top: none;
    border-right: none;
    border-left: none;
    width: 100px;
    outline: none;
    &:focus {
        background-color:rgb(253, 231, 231);
    }
`