import { useState } from "react";

  function ForgotPassword({ setModalVisible, modalVisible }: { setModalVisible: (value: boolean) => void, modalVisible: boolean }) {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/forgotPassword', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setError('Password reset link has been sent.');
      }
    } catch (err) {
      setError('Failed to communicate with the server');
    }
  };


  return (
    <div>
        {modalVisible && ( 
        <div id="forgotPasswordModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
            <h2>Forgot Password</h2>
            <form id="forgotPasswordForm" onSubmit={handleSubmit}>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} 
            id="forgotPasswordEmail" className="forgot_password__input" required/>
            <button type="submit">Submit</button>
            {error && <div className="forgot-password error">{error}</div>}
            </form>
          </div>
      </div>
      )}
    </div>
  )
}

export default ForgotPassword