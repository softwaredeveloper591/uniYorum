import  "https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css";
import { Link } from 'react-router-dom';

export interface User {
    id: string;
    userType: 'student' | 'admin';
  }

function NavBar({ user }: { user: User | null }) {
  return (
    <nav className="nav" id="topNav">
      <div className="nav__container">
        <Link to="/" className="nav__logo">UniComm</Link>
        <ul className="nav__menu">
          <li className="nav__item">
            <Link to="/" className="nav__link">Home</Link>
          </li>
          {user ? (
            <>
              {user.userType === 'student' && (
                <li className="nav__item">
                  <Link to={`/profile/${user.id}`} className="nav__link">Profile</Link>
                </li>
              )}
              {user.userType === 'admin' && (
                <li className="nav__item">
                  <Link to="/displayFiles" className="nav__link">Registration Verification</Link>
                </li>
              )}
              <li className="nav__item">
                <Link to="/logout" className="nav__link">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav__item">
                <Link to="/login" className="nav__link">Login</Link>
              </li>
              <li className="nav__item">
                <Link to="/register" className="nav__link">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar