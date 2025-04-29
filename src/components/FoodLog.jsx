import { useState } from 'react'
import { db } from '../firebase.js'
import { ref, push } from 'firebase/database'

function FoodLog({ addFood, user }) {
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newFood = {
      ...formData,
      calories: parseFloat(formData.calories),
      protein: parseFloat(formData.protein),
      carbs: parseFloat(formData.carbs),
      fats: parseFloat(formData.fats),
      userId: user.uid,
      id: Date.now()
    }

    try {
      await push(ref(db, 'foods'), newFood)
      addFood(newFood)
      setFormData({ name: '', calories: '', protein: '', carbs: '', fats: '' })
    } catch (error) {
      console.error('Error adding food:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Log Food</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-medium">Food Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Calories (kcal)</label>
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Protein (g)</label>
            <input
              type="number"
              name="protein"
              value={formData.protein}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Carbs (g)</label>
            <input
              type="number"
              name="carbs"
              value={formData.carbs}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Fats (g)</label>
            <input
              type="number"
              name="fats"
              value={formData.fats}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Log Food
        </button>
      </form>
    </div>
  )
}

export default FoodLog