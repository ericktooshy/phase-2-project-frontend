import { useState, useEffect } from 'react'
import { db } from '../main.jsx'
import { ref, onValue } from 'firebase/database'

function Dashboard({ foods, setFoods }) {
  const [search, setSearch] = useState('')
  const [dailyTotals, setDailyTotals] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 })

  useEffect(() => {
    const foodsRef = ref(db, 'foods')
    onValue(foodsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const foodList = Object.values(data)
        setFoods(foodList)
        const totals = foodList.reduce((acc, food) => ({
          calories: acc.calories + (food.calories || 0),
          protein: acc.protein + (food.protein || 0),
          carbs: acc.carbs + (food.carbs || 0),
          fats: acc.fats + (food.fats || 0)
        }), { calories: 0, protein: 0, carbs: 0, fats: 0 })
        setDailyTotals(totals)
      }
    })
  }, [setFoods])

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-1/3 pr-4">
        <input
          type="text"
          placeholder="Search foods..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 rounded-md border"
        />
        <div className="space-y-2">
          {filteredFoods.map(food => (
            <div key={food.id} className="p-2 bg-white rounded shadow">
              <h3 className="font-bold">{food.name}</h3>
              <p>Calories: {food.calories}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/3">
        <h2 className="text-2xl font-bold mb-4">Daily Nutrition</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-bold">Calories</h3>
            <p>{dailyTotals.calories} kcal</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-bold">Protein</h3>
            <p>{dailyTotals.protein}g</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-bold">Carbs</h3>
            <p>{dailyTotals.carbs}g</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-bold">Fats</h3>
            <p>{dailyTotals.fats}g</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard