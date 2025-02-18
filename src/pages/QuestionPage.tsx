import React from 'react';
import NavBar from '../components/NavBar';
import "../assets/styles/questionDetails.css"; 
import "../assets/styles/home.css";
import QuestionDetails from '../components/QuestionDetails';

function QuestionPage() {
  return (
    <div>
        <NavBar user={{id: '1', userType: 'student'}} />
        <QuestionDetails /> 

    </div>
  )
}

export default QuestionPage