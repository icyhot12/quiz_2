import React from "react";
import { decode } from "html-entities"

function Button(props) {
    let style = {}

    function styler() {
        if (props.isHeld) {
            style = {
                backgroundColor: "yellow"
            }
        }

        if (props.isChecked && props.isHeld && props.isCorrect) {
            style = {
                backgroundColor: "green"
            }
        }

        if (props.isChecked && props.isHeld && !props.isCorrect) {
            style = {
                backgroundColor: "red"
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