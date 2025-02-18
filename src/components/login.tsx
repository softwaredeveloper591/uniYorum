  import { useState } from 'react';

function Login({ setModalVisible }: { setModalVisible: (value: boolean) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.errors) {
        setError(data.errors.error);
      }
      if (data.user) {
        window.location.assign('/');
      }
    } catch (err) {
      setError('Failed to communicate with the server');
    }
  };
  
  return (
    
        <form  className="login__form" onSubmit={handleSubmit }>
        <a href="/" style={{color: "white"}}><h1 className="login__title title" style={{fontSize: "38px", fontWeight: "bold"}}>UniComm</h1></a>
        <h2 className="login__title">Login</h2>
        <div className="login__content">
            <div className="login__box">
              <i className="ri-mail-line login__icon"></i>
              <div className="login__box-input">
                <input type="email" placeholder="" value={email} id="email" name="email" onChange={(e) => setEmail(e.target.value)} required className="login__input"/>
                <label htmlFor="login-email" className="login__label">Email</label>
              </div>
            </div>
            <div className="login__box">
              <i className="ri-lock-2-line login__icon"></i>
              <div className="login__box-input">
                <input type="password" value={password} placeholder="" onChange={(e) => setPassword(e.target.value)} id="password" name="password" required className="login__input"/>
                <label htmlFor="login-pass" className="login__label">Password</label>
                <i className="ri-eye-off-line eye" id="eye"></i>
              </div>
            </div>
        </div>
        {error && <div className="login-error">{error}</div>}
        <div className="login__check">
          <a href="#" className="login__forgot" onClick={() => setModalVisible(true)} id="forgotPasswordLink">Forgot Password?</a>
        </div>
        <button type="submit" className="login__button">Login</button>
        <p className="login__register">
          Don't have an account? <a href="/register">Register</a>
        </p>
        </form>
        
  )
}

export default Login