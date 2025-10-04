import React, { useState } from 'react';
import './Quiz.css';
import { Data } from '../assets/Data2'; // make sure your file exports "Data"

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(Data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    const allOptions = document.querySelectorAll("li");
    allOptions.forEach((li) => li.classList.remove("correct", "wrong"));

    if (index + 1 < Data.length) {
      setIndex(index + 1);
      setQuestion(Data[index + 1]);
      setLock(false);
    } else {
      alert("Quiz Completed! 🎉 Your Score: " + score + "/" + Data.length);
    }
  };

  const handlePrevious = () => {
    const allOptions = document.querySelectorAll("li");
    allOptions.forEach((li) => li.classList.remove("correct", "wrong"));

    if (index > 0) {
      setIndex(index - 1);
      setQuestion(Data[index - 1]);
      setLock(false);
    } else {
      alert("You're already on the first question! 🥰");
    }
  };

  const checkAns = (ele, ans) => {
    if (lock) return;
    setLock(true);

    if (question.ans === ans) {
      ele.target.classList.add("correct");
      setScore(score + 1);
    } else {
      ele.target.classList.add("wrong");
      const allOptions = ele.target.parentElement.querySelectorAll("li");
      allOptions[question.ans - 1].classList.add("correct");
    }
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      <h2>{index + 1}. {question.Question}</h2>

      <ul>
        <li onClick={(ele) => checkAns(ele, 1)}>{question.option1}</li>
        <li onClick={(ele) => checkAns(ele, 2)}>{question.option2}</li>
        <li onClick={(ele) => checkAns(ele, 3)}>{question.option3}</li>
        <li onClick={(ele) => checkAns(ele, 4)}>{question.option4}</li>
      </ul>

      <div className="btn-container">
        <button onClick={handlePrevious} className="btn" disabled={index === 0}>
          Previous
        </button>
        <button onClick={handleNext} className="btn" disabled={!lock}>
          Next
        </button>
      </div>

      <div className="index">{index + 1} of {Data.length} Questions</div>
    </div>
  );
};

export default Quiz;

