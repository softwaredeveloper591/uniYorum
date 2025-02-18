import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUniversities } from '../redux/universitiesSlice';
import { AppDispatch } from '../redux/store';
import { University } from '../types/types';
import "../assets/styles/register.css";


const universityNames = [
    "İstanbul University",
    "Hacettepe University",
    "Ankara University",
    "Boğaziçi University",
    "Middle East Technical University",
    "Ege University",
    "İzmir Institute of Technology",
    "Koç University",
    "Sabancı University",
    "Bilkent University",
    "Yıldız Technical University",
    "Marmara University",
    "Dokuz Eylül University",
    "Gazi University",
    "Çukurova University",
    "Uludağ University",
    "Atatürk University",
    "Karadeniz Technical University",
    "Akdeniz University",
    "Erciyes University"
  ];
  
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


function RegisterPage() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [university, setUniversity] = useState('');
    const [faculty, setFaculty] = useState('');
    const [department, setDepartment] = useState('');
    const [studentFile, setStudentFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const randomImageNumber = Math.floor(Math.random() * 12) + 1;
        document.body.style.backgroundImage = `url("background_images/${randomImageNumber}.jpg")`;
    }, []);

    // const universities = useSelector((state: RootState) => state.universities.universities);

    const universities:University[]= universityNames.map((name, index) => ({
          uni_id: 100 + index,
          uni_name: name,
          il_id: getRandomInt(1, 81),
          status: 1,
        })); 
        
    const dispatch=useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchUniversities());
    }, []);

        

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
        setStudentFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        const formData = new FormData();
        formData.append('email', email);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('university', university);
        formData.append('faculty', faculty);
        formData.append('department', department);
        if (studentFile) {
          formData.append('studentFile', studentFile);
        }
    
        try {
          await axios.post('/register', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        } catch (err) {
          setError('Failed to register. Please try again.');
        } finally {
          setLoading(false);
        }
      };

  return (
    <div className="register">
      <img src="" alt="register image" className="register__img" id="randomImage" />
      <form onSubmit={handleSubmit} className="register__form" id="register__form">
        <Link to="/" style={{ color: 'white' }}>
          <h1 className="register__title title" style={{ fontSize: '38px', fontWeight: 'bold' }}>UniComm</h1>
        </Link>
        <h2 className="register__title">Register</h2>

        <div className="register__content">
          <div className="register__box">
            <i className="ri-mail-line register__icon"></i>
            <div className="register__box-input">
              <input
                type="email"
                placeholder=" "
                id="email"
                name="email"
                required
                className="register__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="register-email" className="register__label">Email</label>
            </div>
          </div>

          <div className="register__box with-gap">
            <i className="ri-user-3-line register__icon"></i>
            <div className="register__box-input">
              <input
                type="text"
                placeholder=" "
                id="username"
                name="username"
                required
                className="register__input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="register-username" className="register__label">Username</label>
            </div>
          </div>

          <div className="register__box">
            <i className="ri-lock-2-line register__icon"></i>
            <div className="register__box-input">
              <input
                type="password"
                placeholder=" "
                id="password"
                name="password"
                required
                className="register__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="register-pass" className="register__label">Password</label>
              <i className="ri-eye-off-line eye" id="eye"></i>
            </div>
          </div>

          <div className="register__box with-gap">
            <i className="ri-book-line register__icon"></i>
            <div className="register__box-input">
              <select
                id="university"
                name="university"
                required
                className="custom-select register__input"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              >
                <option value="">Select University</option>
                {universities.map((university) => (
                  <option key={university.uni_id} value={university.uni_id}>
                    {university.uni_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="register__box with-gap">
            <i className="ri-book-line register__icon"></i>
            <div className="register__box-input">
              <select
                id="faculty"
                name="faculty"
                required
                className="custom-select register__input"
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
              >
                <option value="">Select Faculty</option>
                <option value="1">Random</option>
              </select>
            </div>
          </div>

          <div className="register__box with-gap">
            <i className="ri-book-line register__icon"></i>
            <div className="register__box-input">
              <select
                id="department"
                name="department"
                required
                className="custom-select register__input"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                <option value="1">Random</option>
              </select>
            </div>
          </div>

          <div className="register__box with-gap">
            <i className="ri-file-line register__icon"></i>
            <div className="register__box-input">
              <input
                type="file"
                name="studentFile"
                id="studentFile"
                required
                className="register__input"
                accept=".pdf"
                onChange={handleFileChange}
              />
              <label htmlFor="studentFile" className="register__label" id="fileLabel">
                Upload your E-devlet Student Document
              </label>
            </div>
          </div>

          <button type="submit" className="register__button">Register</button>
          {loading && <p className="loading-message centered-message" style={{ color: 'yellow', marginTop: '-20px' }}>Verifying student...</p>}
          {error && <p className="error-message centered-message" style={{ color: 'red', marginTop: '-20px' }}>{error}</p>}
        </div>
        <p className="register__login">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage