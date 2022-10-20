import React from "react";
import { decode } from "html-entities"

function Button(props) {
    const style = {
        // backgroundColor: props.isHeld ? "yellow" : "white"
    }
    return (
        <button
            onClick={() => props.handleChoose(props.idQuestion,props.idAnswer)}
            style={style}
        >
            {decode(props.value)}
        </button>
    )
}

export default Button