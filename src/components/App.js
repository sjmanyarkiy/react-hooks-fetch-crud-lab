import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

 function handleAddQuestion(addedQuestion){
    console.log(addedQuestion)

    const addedItem = [...questions, addedQuestion]

    setQuestions(addedItem)
  }


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onQuestionAdd={handleAddQuestion}/> : <QuestionList />}
    </main>
  );
}

export default App;
