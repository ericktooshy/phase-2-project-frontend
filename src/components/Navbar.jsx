import { Link } from 'react-router-dom'
import { auth } from '../main.jsx'
import { signOut } from 'firebase/auth'

function Navbar() {
  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">FitFuel</Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-200">Dashboard</Link>
          <Link to="/log" className="text-white hover:text-blue-200">Log Food</Link>
          <Link to="/profile" className="text-white hover:text-blue-200">Profile</Link>
          <button onClick={handleLogout} className="text-white hover:text-blue-200">Logout</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar