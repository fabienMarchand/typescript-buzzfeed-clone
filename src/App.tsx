import { useState, useEffect, createRef } from "react";

import Title from "./components/Title";
import { QuizData, Content } from "../interfaces";
import QuestionsBlock from "./components/QuestionsBlock";
import AnswerBlock from "./components/AnswerBlock";

const App = () => {
  const [quiz, setQuiz] = useState<QuizData | null>();
  const [choosenAnswerItems, setChoosenAnswerItems] = useState<string[]>([]);
  const [unanswerQuestionIds, setUnanswerQuestionIds] = useState<
    number[] | undefined
  >([]);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  type ReduceType = {
    id?: {};
  };

  const refs = unanswerQuestionIds?.reduce<ReduceType | any>((acc, id) => {
    acc[id as unknown as keyof ReduceType] = createRef<HTMLDivElement | null>();
    return acc;
  }, {});

  const answerRef = createRef<HTMLDivElement | null>();

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/quiz-item");
      const json = await response.json();
      setQuiz(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const unanswerIds = quiz?.content?.map(({ id }: Content) => id);
    setUnanswerQuestionIds(unanswerIds);
  }, [quiz]);

  useEffect(() => {
    if (choosenAnswerItems.length > 0 && unanswerQuestionIds) {
      if (showAnswer && answerRef.current) {
        answerRef.current.scrollIntoView({ behavior: "smooth" });
      }

      if (unanswerQuestionIds.length <= 0 && choosenAnswerItems.length >= 1) {
        setShowAnswer(true);
      } else {
        const highestId = Math.min(...unanswerQuestionIds);
        refs[highestId].current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [unanswerQuestionIds, choosenAnswerItems.length, showAnswer, answerRef, refs]);

  console.log(choosenAnswerItems);

  return (
    <div className="app">
      <Title title={quiz?.title} subtitle={quiz?.subtitle} />
      {refs &&
        quiz?.content.map((content: Content) => (
          <QuestionsBlock
            key={content.id}
            quizItem={content}
            choosenAnswerItems={choosenAnswerItems}
            setChoosenAnswerItems={setChoosenAnswerItems}
            unanswerQuestionIds={unanswerQuestionIds}
            setUnanswerQuestionIds={setUnanswerQuestionIds}
            ref={refs[content.id]}
          />
        ))}
      {showAnswer && (
        <AnswerBlock
          answerOptions={quiz?.answers}
          choosenAnswers={choosenAnswerItems}
          ref={answerRef}
        />
      )}
    </div>
  );
};

export default App;
