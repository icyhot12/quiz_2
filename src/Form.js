import React, { useEffect } from "react";
import { useState } from "react"

function Form(props) {

    const [formData, setFormData] = useState({
        questionNumber: "5",
        questionCategory: "any",
        questionDif: "any"
    })

    function handleChange(e, type) {
        if (type === "number") {
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    questionNumber: e.target.value
                }
            })
        } else if (type === "category") {
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    questionCategory: e.target.value
                }
            })
        } else if (type === "dif") {
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    questionDif: e.target.value
                }
            })
        }
    }

    useEffect(() => {
        props.handleApi(formData)
    },[formData])

    return (
        <div className="form-selection">
            <form>
                <label>
                    Number of questions:
                    <input type="number" step="1" min="1" max="10" value={formData.questionNumber} onChange={(e) => handleChange(e, "number")}></input>
                </label>
                <label>
                    Category:
                    <select value={formData.questionCategory} onChange={(e) => handleChange(e, "category")}>
                        <option value="any">Any Category</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals &amp; Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science &amp; Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="30">Science: Gadgets</option>
                        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                        <option value="32">Entertainment: Cartoon &amp; Animations</option>
                    </select>
                </label>
                <label>
                    Difficulty:
                    <select value={formData.questionDif} onChange={(e) => handleChange(e, "dif")}>
                        <option value="any">Any</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </label>
            </form>
        </div>
    )
}

export default Form