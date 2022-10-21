import React from "react";
import { useState, useEffect } from "react"
import handleData from "./handleData";
import Question from "./Question";
import { nanoid } from "nanoid"

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

  function handleChoose(idQuestion, idAnswer) {
    setData(prevData => {
      let tempData = [].concat(prevData)
      tempData[idQuestion].options.map(answer => {
        return answer.isHeld = false
      })
      tempData[idQuestion].options[idAnswer].isHeld = true
      return tempData
    })
  }

  function handleCheck() {
    setData(prevData => {
      let tempData = [].concat(prevData)
      tempData.map(element => 
        element.options.map(answer => {
          return answer.isChecked = true
        })
        )
        return tempData
    })
  }

  const questionsElements = data.map((element, index) =>
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
        <button onClick={handleCheck}>Check your answers</button>
      </div>
    </div>
  );
}

export default App;
