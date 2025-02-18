import React from 'react'
import { User, University, Question, Answer } from '../types/types'
import { useNavigate } from 'react-router-dom'

function QuestionDetails() {

    const autoResize = (textarea: HTMLTextAreaElement) => {
        textarea.style.height = 'auto'; // Reset the height to auto
        textarea.style.height = '40px'; // Set initial height to one line
    
        // Check if the content exceeds one line
        if (textarea.scrollHeight > 40) {
          textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to the scrollHeight
        }
      };

    const university: University = {
        uni_id: 101,
        uni_name: 'Example University',
        il_id: 34,
        status: 1,
      };
      
      const question: Question = {
        question_id: 1,
        question_text: 'What is the admission process?',
        created_at: new Date(),
        Answers: 5,
      };
      
      const answers: Answer[] = [
        {
          answer_id: 1,
          answer_text: 'The admission process is straightforward.',
          created_at: new Date(),
          likes: 10,
          dislikes: 2,
          Student: {
            id: 1,
            username: 'student1'
          },
        },
        // Add more answers here
      ];



    const user: User = {
        userType: 'student',
        uni_id: 101,
        username: 'currentUser'
      };

    const navigate=useNavigate();

  return (
    <main className="main">
      <div className="main__content">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/university/${university.uni_name.replace(/ /g, '_')}`)}
          className="btn btn-secondary"
        >
          <i className="ri-arrow-left-line"></i> Back to University Page
        </button>

        <div className="question-details">
          <h2>{question.question_text}</h2>
          <p>Asked on {new Date(question.created_at).toDateString()}</p>

          {user && user.userType === 'student' && user.uni_id === university.uni_id && (
            <div className="submit-answer">
              <form action="/answerQuestion" method="POST">
                <input type="hidden" name="question_id" value={question.question_id} />
                <div className="form-group">
                  <div className="profile-info">
                    <img
                      src={user.profilePicture ? user.profilePicture : '/default_profile.png'}
                      alt={`${user.username}'s Profile Picture`}
                      className="profile-picture"
                    />
                    <textarea
                      onInput={(e) => autoResize(e.target as HTMLTextAreaElement)}
                      className="form-control"
                      name="answer_text"
                      rows={1}
                      placeholder="Write your answer here..."
                      maxLength={1000}
                      required
                    ></textarea>
                  </div>
                  <hr />
                </div>
                <button style={{ float: 'right' }} type="submit" className="btn btn-success">Submit Answer</button>
              </form>
            </div>
          )}

          <h3>Answers</h3>
          <ul className="answers-list">
            {answers && answers.length ? (
              answers.reverse().map((answer) => (
                <li key={answer.answer_id} className="answer-item">
                  <div className="profile-info">
                    <a href={`/profile/${answer.Student.id}`} className="profile-link">
                      <img
                        src={answer.Student.profilePicture ? answer.Student.profilePicture : '/default_profile.png'}
                        alt={`${answer.Student.username}'s Profile Picture`}
                        className="profile-picture"
                      />
                    </a>
                    <div className="profile-name">
                      <a href={`/profile/${answer.Student.id}`} className="profile-link" style={{ fontWeight: 'bold' }}>
                        {answer.Student.username}
                      </a>
                      (Answered on {new Date(answer.created_at).toDateString()})
                    </div>
                  </div>
                  <p>{answer.answer_text}</p>
                  <div className="voting" data-answer-id={answer.answer_id}>
                    <button className="btn like-button"><i className="ri-thumb-up-line"></i></button>
                    <span className="like-count" style={{ paddingLeft: '1px', paddingRight: '4px' }}>{answer.likes}</span>
                    <button className="btn dislike-button"><i className="ri-thumb-down-line"></i></button>
                    <span className="dislike-count" style={{ paddingLeft: '1px', paddingRight: '2px' }}>{answer.dislikes}</span>
                  </div>
                </li>
              ))
            ) : (
              <li style={{ marginLeft: '10px' }}>No answers yet.</li>
            )}
          </ul>
        </div>
      </div>
    </main>
  )
}

export default QuestionDetails