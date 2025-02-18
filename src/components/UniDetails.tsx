import { University, Question } from '../types/types'

function UniDetails({ university, questions }: { university: University, questions: Question[] }) {

    const autoResize = (textarea: HTMLTextAreaElement) => {
        textarea.style.height = 'auto'; // Reset the height to auto
        textarea.style.height = '40px'; // Set initial height to one line
    
        // Check if the content exceeds one line
        if (textarea.scrollHeight > 40) {
          textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to the scrollHeight
        }
      };

  return (
    <main className="main">
      <div className="main__content">
        <img src={`url('/background_images/${university.uni_id}.jpg')`} alt={`${university.uni_name} logo`}
         className="logo_img" id="logoImage"/>
        <h1 className="main__title">{university.uni_name}</h1>

        <div className="university-details"></div>

        <h2>Ask a Question</h2>
        <div className="submit-question">
          <form action="/askQuestion" method="POST">
            <input type="hidden" name="uni_id" value={university.uni_id} />
            <div className="form-group">
              <textarea
                onInput={(e) => autoResize(e.target as HTMLTextAreaElement)}
                className="form-control"
                name="question_text"
                rows={1}
                placeholder="Ask your question here..."
                maxLength={1000}
                required
              ></textarea>
            </div>
            <hr />
            <button type="submit" className="btn btn-primary">Submit Question</button>
          </form>
        </div>

        <h2>Questions</h2>
        <ul className="questions-list">
          {questions && questions.length ? (
            questions.reverse().map((question) => (
              <li key={question.question_id} className="question-item">
                <a href={`/question/${question.question_id}`} className="question-link">
                  {question.question_text} <br />
                  {question.Answers && question.Answers > 0 ? (
                    <span className="answer-count">Answers: {question.Answers}</span>
                  ) : (
                    <span className="answer-count">No answers yet</span>
                  )}
                  (Asked on {new Date(question.created_at).toDateString()})
                </a>
              </li>
            ))
          ) : (
            <li>No questions have been asked yet.</li>
          )}
        </ul>
      </div>
    </main>
  )
}

export default UniDetails