import NavBar from '../components/NavBar'
import { User } from '../components/NavBar'

const user: User = {
  id: '1',
  userType: 'student'
}

function homePage() {
  return (
    <>
    <NavBar user={user} />
    </>
  )
}

export default homePage