import React from "react";
import { decode } from "html-entities"

function Button(props) {
    let style = {}

    function styler() {
        if (props.isHeld) {
            style = {
                backgroundColor: "#2982ff"
            }
        }

        if (props.isChecked && props.isHeld && props.isCorrect) {
            style = {
                backgroundColor: "#218838"
            }
        }

        if (props.isChecked && props.isHeld && !props.isCorrect) {
            style = {
                backgroundColor: "#c82333"
            }
        }
    }

    styler()

    return (
        <button
            onClick={!props.isChecked ? () => props.handleChoose(props.idQuestion, props.idAnswer): null}
            style={style}
        >
            {decode(props.value)}
        </button>
    )
}

export default Button