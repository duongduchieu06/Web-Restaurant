import React from "react";
import {InputText} from './style'

const InputForm = ( props ) => {
    const {placeholder = "Nhập kí tự", ...rests} = props
    const handleOnchangeInput = (e) => {
        props.onChange(e.target.value)
    }
    return (
        <InputText placeholder={placeholder} value={props.value} {...rests} onChange={handleOnchangeInput} />
    )

}

export default InputForm 