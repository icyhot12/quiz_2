import React from "react";
import { useState, useEffect } from "react"
import handleData from "./handleData";
import Question from "./Question";
import {nanoid} from "nanoid"

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
      .then((response) => response.json())
      .then((data) => {
        const constructedData = handleData(data.results)
        setData(constructedData)
      });
  }, [])

  console.log(data)

  function handleChoose(idQuestion, idAnswer) {
    setData(prevData => {
      let tempData = prevData
      tempData[idQuestion].options[idAnswer].isHeld =
      !tempData[idQuestion].options[idAnswer].isHeld
      return tempData
    })
  }
  // żeby naciskało się tylko jedno - po naciśnięciu czyścimy isHeld w całym Question i na koniec zaznaczamy tylko to jedno
  // żeby sprawdzić odpowiedzi to sprawdzamy czy w danym question isHeld = isCorrect i wg tego oznaczamy kolory

  const questionsElements = data.map((element,index) =>
    <Question 
    key={nanoid()}
    id={index}
    question={element.question}
    options={element.options}
    handleChoose={handleChoose}
    />
    )


  return (
    <div className="main-container">
      <div className="title">Quiz</div>
      <div className="questions-container">
        {questionsElements}
      </div>
      <div className="check-container">
        <button>Check your answers</button>
      </div>
    </div>
  );
}

export default App;
