import NavBar from '../components/NavBar'
import { User } from '../components/NavBar'
import "../assets/styles/home.css";
import Universities from '../components/Universities';
import { useEffect } from 'react';

const user: User = {
  id: '1',
  userType: 'student'
}



function HomePage() {
  useEffect(() => {
    const randomImageNumber = Math.floor(Math.random() * 12) + 1;
    document.body.style.backgroundImage = `url("background_images/${randomImageNumber}.jpg")`;
  }, []);
  
  return (
    <div >
      <NavBar user={user} />
      <Universities />
    </div>
  )
}

export default HomePage