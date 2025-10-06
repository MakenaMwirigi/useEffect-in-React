import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // countdown timer with useEffect
  useEffect(() => {
    // run timer only if time is still left
    if (timeRemaining > 0) {
      const timerId = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);

      // cleanup timeout on re-render
      return () => clearTimeout(timerId);
    } else {
      // when timer hits 0
      setTimeRemaining(10);       // reset for next question
      onAnswered(false);          // auto mark as wrong
    }
  }, [timeRemaining, onAnswered]); // dependencies

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);         // reset timer when answered
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;

