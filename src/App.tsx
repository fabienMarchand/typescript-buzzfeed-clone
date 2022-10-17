import { useState, useEffect } from "react";

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
    if (unanswerQuestionIds) {
      if (unanswerQuestionIds.length <= 0 && choosenAnswerItems.length >= 1) {
        setShowAnswer(true);
        const answerBlock = document.getElementById("answer-block");
        answerBlock?.scrollIntoView({ behavior: "smooth" });
      }

      const highestId = Math.min(...unanswerQuestionIds);
      const highestElement = document.getElementById(String(highestId));
      highestElement?.scrollIntoView({ behavior: "smooth" });
    }
  }, [unanswerQuestionIds, choosenAnswerItems]);

  console.log(choosenAnswerItems);

  return (
    <div className="app">
      <Title title={quiz?.title} subtitle={quiz?.subtitle} />
      {quiz?.content.map((content: Content, id: Content["id"]) => (
        <QuestionsBlock
          key={id}
          quizItem={content}
          choosenAnswerItems={choosenAnswerItems}
          setChoosenAnswerItems={setChoosenAnswerItems}
          unanswerQuestionIds={unanswerQuestionIds}
          setUnanswerQuestionIds={setUnanswerQuestionIds}
        />
      ))}
      {showAnswer && (
        <AnswerBlock
          answerOptions={quiz?.answers}
          choosenAnswers={choosenAnswerItems}
        />
      )}
    </div>
  );
};

export default App;
