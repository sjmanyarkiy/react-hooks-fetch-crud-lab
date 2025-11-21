import React from "react";

function QuestionItem({ question, onQuestionDelete, onQuestionUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(() => onQuestionDelete(question) )

    console.log("deleted!")
  }

  function handleUpdate(event){
    event.preventDefault();
    console.log("update clicked!")

    const newIndex = parseInt(event.target.value);

   fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        correctIndex : newIndex
      })
    })
    .then(res => res.json())
    .then((updatedQuestion) => {
      console.log("From QuestionItem: ", updatedQuestion)
      onQuestionUpdate(updatedQuestion)
   })
    // .then((updatedQuestion) => console.log(updatedQuestion))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdate}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
