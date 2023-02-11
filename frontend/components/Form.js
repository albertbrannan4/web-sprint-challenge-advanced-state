import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { inputChange, postQuiz } from "../state/action-creators";

export function Form(props) {
  const [disable, setDisable] = useState(true);
  const { newQuestion, newTrueAnswer, newFalseAnswer } = props.form;

  const onChange = (evt) => {
    const { name, value } = evt.target;
    props.inputChange(name, value.trim());
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    props.postQuiz(newQuestion, newTrueAnswer, newFalseAnswer);
  };
  useEffect(() => {
    if (newQuestion && newTrueAnswer && newFalseAnswer) {
      return setDisable(false);
    } else {
      return setDisable(true);
    }
  }, [props.form]);
  console.log(props);
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
        required
      />
      <input
        maxLength={50}
        onChange={onChange}
        name="newTrueAnswer"
        id="newTrueAnswer"
        value={props.form.newTrueAnswer}
        placeholder="Enter true answer"
        required
      />
      <input
        maxLength={50}
        onChange={onChange}
        name="newFalseAnswer"
        id="newFalseAnswer"
        value={props.form.newFalseAnswer}
        placeholder="Enter false answer"
        required
      />
      {disable && (
        <button disabled id="submitNewQuizBtn">
          Submit new quiz
        </button>
      )}
      {!disable && <button id="submitNewQuizBtn">Submit new quiz</button>}
      {/* <button id="submitNewQuizBtn">Submit new quiz</button> */}
    </form>
  );
}

export default connect((st) => st, { inputChange, postQuiz })(Form);
