import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchQuiz, selectAnswer, postAnswer } from "../state/action-creators";
function Quiz(props) {
  const [disable, setDisable] = useState(true);
  useEffect(() => {
    if (!props.quiz) props.fetchQuiz();
  }, []);
  useEffect(() => {
    if (props.selectedAnswer) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [props.selectedAnswer]);

  const submitAnswer = () => {
    const { selectedAnswer } = props;
    const { quiz_id } = props.quiz;

    props.postAnswer(quiz_id, selectedAnswer);
  };

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div
                className={
                  props.selectedAnswer === props.quiz.answers[0].answer_id
                    ? "answer selected"
                    : "answer"
                }
              >
                {props.quiz.answers[0].text}
                <button
                  onClick={() =>
                    props.selectAnswer(props.quiz.answers[0].answer_id)
                  }
                >
                  {props.selectedAnswer === props.quiz.answers[0].answer_id ? (
                    <p>SELECTED</p>
                  ) : (
                    <p>Select</p>
                  )}
                </button>
              </div>

              <div
                className={
                  props.selectedAnswer === props.quiz.answers[1].answer_id
                    ? "answer selected"
                    : "answer"
                }
              >
                {props.quiz.answers[1].text}
                <button
                  onClick={() =>
                    props.selectAnswer(props.quiz.answers[1].answer_id)
                  }
                >
                  {props.selectedAnswer === props.quiz.answers[1].answer_id ? (
                    <p>SELECTED</p>
                  ) : (
                    <p>Select</p>
                  )}
                </button>
              </div>
            </div>

            <button
              disabled={disable}
              onClick={() => submitAnswer()}
              id="submitAnswerBtn"
            >
              Submit answer
            </button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    message: state.message,
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
  };
};
export default connect(mapStateToProps, {
  fetchQuiz,
  selectAnswer,
  postAnswer,
})(Quiz);
