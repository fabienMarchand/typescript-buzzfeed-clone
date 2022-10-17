import React, { forwardRef } from "react";
import { Content, Question } from "../../interfaces";
import QuestionBlock from "./QuestionBlock";

const QuestionsBlock = (
  {
    quizItem,
    choosenAnswerItems,
    setChoosenAnswerItems,
    unanswerQuestionIds,
    setUnanswerQuestionIds,
  }: {
    quizItem: Content;
    choosenAnswerItems: string[];
    setChoosenAnswerItems: Function;
    unanswerQuestionIds: number[] | undefined;
    setUnanswerQuestionIds: Function;
  },
  ref: React.LegacyRef<HTMLHeadingElement> | undefined
) => {
  return (
    <>
      <h2 ref={ref} className="title-block">
        {quizItem.text}
      </h2>
      <div className="questions-container">
        {quizItem?.questions.map((question: Question, _index: number) => (
          <QuestionBlock
            key={_index}
            quizItemId={quizItem.id}
            choosenAnswerItems={choosenAnswerItems}
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

export default forwardRef(QuestionsBlock);
