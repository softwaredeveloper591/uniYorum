import React from 'react'
import NavBar from '../components/NavBar'
import { useState,useEffect } from 'react';
import { University } from '../types/types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import "../assets/styles/studentProfile.css";






function StudentProfile() {
    const [profilePicture, setProfilePicture] = useState<string>( '/default_profile.png');
    const [showButtons, setShowButtons] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
          alert('Invalid file type. Please upload an image file (PNG, JPG, JPEG).');
          event.target.value = ''; // Reset the input
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfilePicture(e.target?.result as string);
          setShowButtons(true);
        };
        reader.readAsDataURL(file);
      }
    };
  
      
    const handleConfirm = () => {
      const fileInput = document.getElementById('profilePictureInput') as HTMLInputElement;
      const file = fileInput.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('profilePicture', file);
  
        axios.post('/uploadProfilePicture', formData)
          .then((response) => {
            if (response.data.error) {
              console.error(response.data.error);
            } else {
              navigate(0); // Reload the page to show the new profile picture
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    };

    const handleCancel = () => {
      navigate(0); // Reload the page to revert changes
    };

    const toggleAnswerVisibility = (event: React.MouseEvent<HTMLHeadingElement>) => {
      const answerDetails = event.currentTarget.nextElementSibling as HTMLElement;
      if (answerDetails.style.display === 'none' || answerDetails.style.display === '') {
        answerDetails.style.display = 'block';
      } else {
        answerDetails.style.display = 'none';
      }
    };

    interface Student{
        id: number,
        username: string,
        email: string,
        University: University,
        Department: string
    }

    const uni:University ={
        uni_id: 103,
        uni_name: "noname",
        il_id:3,
        status:0
      }

    const student: Student = {
        id: 1,
        username: 'John Doe',
        email: 'john.doe@example.com',
        University: uni,
        Department: "nodep"
      };
    
    interface User{
        userType: String,
        id: number
    };
    
    const questionAnswersMap: { [key: string]: string[] } = {
      "What is the admission process?": [
        "The admission process involves submitting an online application, providing academic transcripts, and attending an interview.",
        "You need to fill out the application form, submit your previous academic records, and pass the entrance exam."
      ],
      "What are the tuition fees?": [
        "The tuition fees for undergraduate programs range from $5,000 to $10,000 per year.",
        "Graduate program tuition fees range from $8,000 to $15,000 per year."
      ],
      "What scholarships are available?": [
        "We offer merit-based scholarships, need-based scholarships, and sports scholarships.",
        "International students can apply for the Global Excellence Scholarship."
      ],
      "What is the campus life like?": [
        "Campus life is vibrant with various student clubs, sports facilities, and cultural events.",
        "There are numerous extracurricular activities and events organized throughout the year."
      ],
      "What are the accommodation options?": [
        "We offer on-campus dormitories, off-campus apartments, and homestay options.",
        "Students can choose from single, double, or shared rooms in the dormitories."
      ],
      "What are the research opportunities?": [
        "Students can participate in research projects with faculty members and access state-of-the-art laboratories.",
        "We have research centers focused on various fields such as engineering, science, and humanities."
      ],
      "What is the student-to-faculty ratio?": [
        "The student-to-faculty ratio is 15:1, ensuring personalized attention and support.",
        "Small class sizes allow for better interaction between students and professors."
      ],
      "What are the internship opportunities?": [
        "We have partnerships with leading companies and organizations that offer internships to our students.",
        "Students can gain practical experience through internships in various industries."
      ],
      "What is the graduation rate?": [
        "The graduation rate is 85%, with most students completing their programs within the expected time frame.",
        "Our support services and academic advising help students stay on track for graduation."
      ],
      "What are the job placement rates?": [
        "The job placement rate for graduates is 90%, with many securing positions in top companies.",
        "Our career services provide job search assistance, resume workshops, and interview preparation."
      ]
    };
    
    

    const user:User ={userType: 'student', id: 1}

    useEffect(() => {
        document.body.style.backgroundImage = `url('/${student.University.uni_id}.jpg')`;
      }, [student.University.uni_id]);

  return (
    <div>
        <NavBar user={{userType: 'student', id: "1"}}/>
        <div className="profile-container">
        <h1>Profile</h1>
        <div className="user-details-container">
            <div className="profile-picture" id="profilePictureContainer">
                <img src={profilePicture} alt="Profile Picture" id="profilePicture" />
                {user && student.id === user.id && (
            <div className="overlay" id="overlay">
              <label htmlFor="profilePictureInput" id="uploadButton">
                <i className="ri-camera-fill"></i> Upload Picture
              </label>
            </div>
          )}
        </div>

        <input
          type="file"
          id="profilePictureInput"
          name="profilePicture"
          accept="image/png, image/jpeg"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {user && student.id === user.id && showButtons && (
          <div id="buttonContainer">
            <button id="confirmButton" onClick={handleConfirm}>
              Confirm
            </button>
            <button id="cancelButton" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}
        <div className="user-details">
          <h2>User Details</h2>
          <p>
            <strong>Name:</strong> {student.username}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          {/* Add more user details as required */}
        </div>
      </div>

      <div className="university-details">
        <h2>University Details</h2>
        <p>
          <strong>University:</strong>
          <a href={`/university/${student.University.uni_name.replace(/ /g, '_')}`} className="university-link">
            {student.University.uni_name}
          </a>
        </p>
        <p>
          <strong>Department:</strong> {student.Department}
        </p>
      </div>

      <div className="answers-details">
        <h2>Answered Questions</h2>
        {Object.keys(questionAnswersMap).map((question) => (
          <div className="question" key={question}>
            <h3 className="question-text" onClick={toggleAnswerVisibility}>
              • {question}
            </h3>
            <div className="answer-details">
              {questionAnswersMap[question].map((answer, index) => (
                <p key={index}>
                  <strong>Answer:</strong> {answer}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default StudentProfile