import React from "react";
import { Content, Question } from "../../interfaces";
import QuestionBlock from "./QuestionBlock";

const QuestionsBlock = ({
  quizItem,
  setChoosenAnswerItems,
}: {
  quizItem: Content;
  setChoosenAnswerItems: Function;
}) => {
  return (
    <>
      <h2 className="title-block" id={String(quizItem.id)}>
        {quizItem.text}
      </h2>
      <div className="questions-container">
        {quizItem?.questions.map((question: Question, _index: number) => (
          <QuestionBlock
            key={_index}
            question={question}
            setChoosenAnswerItems={setChoosenAnswerItems}
          />
        ))}
      </div>
    </>
  );
};

export default QuestionsBlock;
