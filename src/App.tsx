import './App.css'
import LoginPage from './pages/loginPage'
import HomePage from './pages/homePage'
import {Routes, Route} from 'react-router-dom'
import UniPage from './pages/UniPage'
import QuestionPage from './pages/QuestionPage'
import RegisterPage from './pages/RegisterPage'
import AdminShowFilesPage from './pages/AdminShowFilesPage'
import AdminFileContentPage from './pages/AdminFileContentPage'

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
          {/* <LoginPage /> */}
          {/* <AdminShowFilesPage /> */}
          <AdminFileContentPage />
    </div>
  )
}

export default App
