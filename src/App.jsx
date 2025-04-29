import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { auth } from './main.jsx'
import { onAuthStateChanged } from 'firebase/auth'
import Dashboard from './components/Dashboard'
import FoodLog from './components/FoodLog'
import Profile from './components/Profile'
import Login from './components/Login'
import Navbar from './components/Navbar'

function App() {
  const [user, setUser] = useState(null)
  const [foods, setFoods] = useState([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const addFood = (newFood) => {
    setFoods([...foods, newFood])
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {user ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard foods={foods} setFoods={setFoods} />} />
            <Route path="/log" element={<FoodLog addFood={addFood} user={user} />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default App