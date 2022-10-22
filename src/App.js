import React from "react";
import { useState, useEffect } from "react"
import handleData from "./handleData";
import Question from "./Question";

function App() {
  const [start, setStart] = useState(false)
  const [data, setData] = useState([])
  const [selectedCounter, setSelectedCounter] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [isChecked, setIsChecked] = useState(false)
  const [isReset, setIsReset] = useState(false)

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
      .then((response) => response.json())
      .then((data) => {
        const constructedData = handleData(data.results)
        setData(constructedData)
      });
  }, [isReset])

  function handleChoose(idQuestion, idAnswer) {
    setData(prevData => {
      let tempData = [].concat(prevData)
      tempData[idQuestion].options.map(answer => {
        return answer.isHeld = false
      })
      tempData[idQuestion].options[idAnswer].isHeld = true
      tempData[idQuestion].isChoosen = true
      return tempData
    })
  }

  function choosenCounter() {
    setSelectedCounter(0)
    for (let i = 0; i < data.length; i++) {
      if (data[i].isChoosen) {
        setSelectedCounter(prevCounter => prevCounter + 1)
      }
    }
  }

  useEffect(choosenCounter, [data])

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

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].options.length; j++) {
        if (data[i].options[j].isHeld === true &&
          data[i].options[j].isCorrect === true) {
          setCorrect(prevCorect => prevCorect + 1)
        }
      }
    }
    setIsChecked(true)
  }

  function startQuiz() {
    setStart(prevStart => !prevStart)
  }

  const questionsElements = data.map((element, index) =>
    <Question
      key={index}
      id={index}
      question={element.question}
      options={element.options}
      handleChoose={handleChoose}
      isChoosen={element.isChoosen}
      isChecked={element.isChecked}
    />
  )

  function resetQuiz() {
    setIsReset(prevReset => !prevReset)
    setStart(false)
    setSelectedCounter(0)
    setCorrect(0)
    setIsChecked(false)
  }

  return (
    !start ?
      <div className="start-container">
        <div className="start-tile">Welcome in Quiz Game</div>
        <div className="start-button">
          <button onClick={() => startQuiz()}>Start quiz!</button>
        </div>
      </div>
      :
      data.length > 1 ?
        <div className="main-container">
          <div className="title">Quiz</div>
          <div className="questions-container">
            {questionsElements}
          </div>
          <div className="check-container">
            {selectedCounter < 5 ?
              <div className="counter">Remaning answers: {5 - selectedCounter}</div>
              :
              null
            }
            {selectedCounter === 5 && !isChecked ?
              <button onClick={handleCheck}>Check your answers</button>
              :
              null
            }
            {isChecked ?
              <div>
                <div>Your score: {correct} </div>
                <button onClick={() => resetQuiz()}>Start new quiz!</button>
              </div>
              :
              null}
          </div>
        </div>
        :
        <div>Waiting for your quiz...</div>
  );
}

export default App;
