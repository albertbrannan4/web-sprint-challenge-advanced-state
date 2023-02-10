import React from "react";
import { connect } from "react-redux";
import { inputChange, postQuiz } from "../state/action-creators";

export function Form(props) {
  const onChange = (evt) => {
    const { name, value } = evt.target;
    props.inputChange(name, value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const { newQuestion, newTrueAnswer, newFalseAnswer } = props.form;
    props.postQuiz(newQuestion, newTrueAnswer, newFalseAnswer);
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        name="newQuestion"
        id="newQuestion"
        value={props.form.newQuestion}
        placeholder="Enter question"
      />
      <input
        maxLength={50}
        onChange={onChange}
        name="newTrueAnswer"
        id="newTrueAnswer"
        value={props.form.newTrueAnswer}
        placeholder="Enter true answer"
      />
      <input
        maxLength={50}
        onChange={onChange}
        name="newFalseAnswer"
        id="newFalseAnswer"
        value={props.form.newFalseAnswer}
        placeholder="Enter false answer"
      />
      <button id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  );
}

export default connect((st) => st, { inputChange, postQuiz })(Form);
