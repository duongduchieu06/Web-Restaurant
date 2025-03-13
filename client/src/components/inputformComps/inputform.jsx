import React, {useState} from "react";
import {InputText} from './style'

const InputForm = ( props ) => {
    const [valueInput, setValueInput] = useState("")
    const {placeholder = "nhập kí tự", ...rests} = props
    return (
        <InputText placeholder={placeholder} valueInput={valueInput} {...rests} />
    )

}

export default InputForm 