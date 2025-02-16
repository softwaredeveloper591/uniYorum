import './App.css'
import LoginPage from './pages/loginPage'
import HomePage from './pages/homePage'
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <div>
      {/* <Routes>
          <Route path="/" element={<LoginPage/>} />
      </Routes> */}
        <HomePage />
    </div>
  )
}

export default App
