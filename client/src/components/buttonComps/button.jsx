import React, {useState} from "react";
import {Button} from "antd"

const ButtonComps = ({
    size,
    styleButton,
    styletextButton,
    textButton,
    disable,
    ...rests
}) => {
    return (
        <Button
            style={{
                ...styleButton,
                background: disable ? "#ccc" : styleButton.background,
            }}    
            size={size}
            {...rests}
        >
            <span style={styletextButton}>{textButton}</span>
        </Button>
    )
}

export default ButtonComps