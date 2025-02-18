import './App.css'
import LoginPage from './pages/loginPage'
import HomePage from './pages/homePage'
import {Routes, Route} from 'react-router-dom'
import UniPage from './pages/UniPage'
import QuestionPage from './pages/QuestionPage'
import RegisterPage from './pages/RegisterPage'

function App() {

  return (
    <div>
      {/* <Routes>
          <Route path="/" element={<LoginPage/>} />
      </Routes> */}
        {/* <HomePage /> */}
        {/* <UniPage /> */}
        {/* <QuestionPage /> */}
          {/* <RegisterPage /> */}
          <LoginPage />
    </div>
  )
}

export default App
