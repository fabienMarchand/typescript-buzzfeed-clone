import React from "react";
import { Question } from "../../interfaces";

const QuestionBlock = ({
  quizItemId,
  choosenAnswerItems,
  question,
  setChoosenAnswerItems,
  unanswerQuestionIds,
  setUnanswerQuestionIds,
}: {
  quizItemId: number;
  choosenAnswerItems: string[];
  question: Question;
  setChoosenAnswerItems: Function;
  unanswerQuestionIds: number[] | undefined;
  setUnanswerQuestionIds: Function;
}) => {
  const handleClick = () => {
    setChoosenAnswerItems((prevState: string[]) => [
      ...prevState,
      question.text,
    ]);
    setUnanswerQuestionIds(
      unanswerQuestionIds?.filter((id: number) => id !== quizItemId)
    );
  };

  const validPick =
    !choosenAnswerItems?.includes(question.text) &&
    !unanswerQuestionIds?.includes(quizItemId);

  return (
    <div>
      <button className="question-block" onClick={handleClick} disabled={validPick}>
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
