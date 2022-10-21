import shuffle from "./shuffle.js"
import { nanoid } from "nanoid"

function handleData(data) {
    let questions = []
    let correctAnswers = []
    let incorrectAnswers = []
    let fullAnswers = new Array(data.length)
    let mixedAnswers = new Array(data.length)

    for (let i = 0; i < data.length; i++) {

        questions.push(data[i].question)
        correctAnswers.push(data[i].correct_answer)
        incorrectAnswers.push(data[i].incorrect_answers)
        fullAnswers[i] = [...incorrectAnswers[i], correctAnswers[i]]
        mixedAnswers[i] = shuffle(fullAnswers[i])
    }

    const quizData = questions.map((element,index) => 
        ({
            id:nanoid(),
            question:element,
            correctAnswer: correctAnswers[index],
            options: setOptions(mixedAnswers[index],correctAnswers[index])
        }))

    function setOptions(allAnswers,correctAnswer) {
        return allAnswers.map(element => {
            return {
                id:nanoid(),
                value: element,
                isHeld: false,
                isChecked: false,
                isCorrect: element === correctAnswer ? true : false,
            }
        })
    }

        return quizData
}

export default handleData