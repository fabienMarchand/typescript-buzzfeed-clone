import { forwardRef, useEffect, useState } from "react";
import { Answer } from "../../interfaces";

const QuestionsBlock = (
  {
    answerOptions,
    choosenAnswers,
  }: {
    answerOptions: Answer[] | undefined;
    choosenAnswers: string[];
  },
  ref: HTMLDivElement | any
) => {
  const [result, setResult] = useState<Answer | null>();

  useEffect(() => {
    answerOptions?.forEach((answer: Answer) => {
      if (
        choosenAnswers.includes(answer.combination[0]) &&
        choosenAnswers.includes(answer.combination[1]) &&
        choosenAnswers.includes(answer.combination[2])
      ) {
        setResult(answer);
      }
    });
  }, [choosenAnswers]);

  return (
    <div ref={ref} className="answer-block">
      <h2>{result?.text}</h2>
      <img src={result?.image} alt={result?.alt} />
    </div>
  );
};

export default forwardRef(QuestionsBlock);
