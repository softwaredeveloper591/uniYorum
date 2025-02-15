import { useState } from 'react';
import '../assets/styles/login.css'
import ForgotPassword from '../components/forgotPassword'
import Login from '../components/login'

function LoginPage() {
  const [forgotModalVisible, setForgotModalVisible] = useState<boolean>(false);
  console.log(forgotModalVisible);
  return (
    <>
    <div className='login'>
        <img src="./src/assets/images/102.jpg" alt="login image" className='login__img' id='randomImage' />
        <Login setModalVisible={setForgotModalVisible}/>
    </div>
    <ForgotPassword setModalVisible={setForgotModalVisible} modalVisible={forgotModalVisible}/>
    </>
  )
}

export default LoginPage