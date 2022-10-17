import React from "react";
import { Content, Question } from "../../interfaces";
import QuestionBlock from "./QuestionBlock";

const QuestionsBlock = ({
  quizItem,
  choosenAnswerItems,
  setChoosenAnswerItems,
  unanswerQuestionIds,
  setUnanswerQuestionIds,
}: {
  quizItem: Content;
  choosenAnswerItems: string[],
  setChoosenAnswerItems: Function;
  unanswerQuestionIds: number[] | undefined;
  setUnanswerQuestionIds: Function;
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
            quizItemId = {quizItem.id}
            choosenAnswerItems= {choosenAnswerItems}
            question={question}
            setChoosenAnswerItems={setChoosenAnswerItems}
            unanswerQuestionIds={unanswerQuestionIds}
            setUnanswerQuestionIds={setUnanswerQuestionIds}
          />
        ))}
      </div>
    </>
  );
};

export default QuestionsBlock;
