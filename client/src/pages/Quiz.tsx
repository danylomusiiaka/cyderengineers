import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Axios from "axios";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
import styles from "../styles/quiz.module.css";
import { Test } from "../interfaces/Test";
import { triggerConfetti } from "../components/Confetti";

export default function Quiz() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const { apiUrl, user } = useAuth();
  const [warning, setWarning] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const [test, setTest] = useState<Test | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [answerStatus, setAnswerStatus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await Axios.get(`${apiUrl}/tests/${id}`);
        setTest(response.data);
        const answers = response.data.questions.map(
          (question: { options: string[] }) => question.options[0]
        );
        setCorrectAnswers(answers);
      } catch (err) {
        setError("Error fetching test data");
      }
      setLoading(false);
    };

    fetchTest();
  }, []);

  useEffect(() => {
    if (test) {
      const shuffleOptions = (options: string[]) => {
        for (let i = options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [options[i], options[j]] = [options[j], options[i]];
        }
        return options;
      };

      const currentQuestion = test.questions[currentIndex];
      setShuffledOptions(shuffleOptions([...currentQuestion.options]));
    }
  }, [test, currentIndex]);

  const checkAnswer = (selectedOption: string) => {
    const isOptionChosen = shuffledOptions.some((option) =>
      Object.keys(answerStatus).includes(option)
    );

    if (!isOptionChosen) {
      const isCorrect = selectedOption === correctAnswers[currentIndex];
      setAnswerStatus((prev) => ({
        ...prev,
        [selectedOption]: isCorrect,
        [correctAnswers[currentIndex]]: true,
      }));
    }
  };

  const handleNext = () => {
    const isOptionChosen = shuffledOptions.some((option) =>
      Object.keys(answerStatus).includes(option)
    );
    if (isOptionChosen) {
      setWarning("");
      if (currentIndex !== (test?.questions.length ?? 0) - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    } else {
      setWarning("Будь ласка оберіть варіант відповіді");
    }
  };

  const handleSubmitResults = () => {
    let count = 0;
    Object.values(answerStatus).forEach((value) => {
      if (value === false) {
        count++;
      }
    });
    const correctAnswersPercentage = (100 - (count / (test?.questions.length ?? 0)) * 100).toFixed(
      2
    );
    triggerConfetti();
    setResult(correctAnswersPercentage);
    Axios.post(`${apiUrl}/users/finish_test`, {
      testId: id,
      email: user.email,
      result: correctAnswersPercentage,
    })
      .then((response) => {
        const testIndex = user.completed_tests.findIndex((test) => test.testId === id);

        if (testIndex !== -1) {
          user.completed_tests[testIndex] = {
            ...user.completed_tests[testIndex],
            result: correctAnswersPercentage,
          };
        } else {
          user.completed_tests.push({ testId: id, result: correctAnswersPercentage });
        }
        console.log("Test result submitted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting test result:", error);
      });
  };

  console.log(answerStatus);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const currentQuestion = test?.questions[currentIndex];

  return (
    <div className={styles.questions}>
      {!result ? (
        <>
          <h2>
            Питання {currentIndex + 1}: {currentQuestion?.name}
          </h2>
          <div>
            <ul>
              {shuffledOptions.map((option: string, index: number) => (
                <li
                  key={index}
                  onClick={() => checkAnswer(option)}
                  className={
                    answerStatus[option] === true
                      ? styles.correct
                      : answerStatus[option] === false
                      ? styles.wrong
                      : ""
                  }
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
          {warning && <span>{warning}</span>}
          <div>
            <button onClick={() => setCurrentIndex(currentIndex - 1)} disabled={currentIndex === 0}>
              Назад
            </button>
            {currentIndex !== (test?.questions.length ?? 0) - 1 ? (
              <button onClick={() => handleNext()}>Далі</button>
            ) : (
              <button onClick={handleSubmitResults}>Завершити тестування</button>
            )}
          </div>
        </>
      ) : (
        <>
          <h2>Вітаємо з завершенням тесту {test?.name}!</h2>
          <p>Ваш результат: {result}</p>
          <button onClick={() => navigate("/")}>Повернутись на головну</button>
        </>
      )}
    </div>
  );
}
