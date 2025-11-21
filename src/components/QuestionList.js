import React, { useState, useEffect } from "react";
import QuestionItem from './QuestionItem'

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, [])

  function handleAddQuestion(addedQuestion){
    console.log(addedQuestion)

    const addedItem = [...questions, addedQuestion]

    setQuestions(addedItem)
  }

  function handleDelete(deletedQuestion){
    console.log("Item deleted", deletedQuestion)

    const removedItems = questions.filter((question) => question.id !== deletedQuestion.id);
    setQuestions(removedItems)
  }

  function handleQuestionUpdate(updatedItem){
    console.log("From QuestionList: ", updatedItem);
    const updatedQuestions = questions.map((question) => {
      if( question.id === updatedItem.id){
        return updatedItem;
      }
      else {
        return question;
      }
    })

    setQuestions(updatedQuestions)
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
        {questions.map((question) => {
          return <QuestionItem key={question.id} question={question} onQuestionDelete={handleDelete} onQuestionUpdate={handleQuestionUpdate}/>
        })}
      </ul>
    </section>
  );
}

export default QuestionList;
