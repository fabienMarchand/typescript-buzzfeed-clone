import React from "react";
import { Question } from "../../interfaces";

const QuestionBlock = ({
  question,
  setChoosenAnswerItems,
}: {
  question: Question;
  setChoosenAnswerItems: Function;
}) => {
  const handleClick = () => {
    setChoosenAnswerItems((prevState: string[]) => [...prevState, question.text]);
  };
  return (
    <div>
      <button className="question-block" onClick={handleClick}>
        <img src={question.image} alt={question.alt} />
        <h3>{question.text}</h3>
        <p>
          <a href={question.image}>{question.credit} </a>
          <a href="https://www.unsplash.com">Unsplash</a>
        </p>
      </button>
    </div>
  );
};

export default QuestionBlock;
