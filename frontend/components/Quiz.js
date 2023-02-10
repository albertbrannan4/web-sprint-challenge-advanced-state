import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchQuiz, selectAnswer } from "../state/action-creators";
function Quiz(props) {
  useEffect(() => {
    props.fetchQuiz();
  }, []);
  console.log(props.quiz);
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

            <button id="submitAnswerBtn">Submit answer</button>
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
export default connect(mapStateToProps, { fetchQuiz, selectAnswer })(Quiz);
