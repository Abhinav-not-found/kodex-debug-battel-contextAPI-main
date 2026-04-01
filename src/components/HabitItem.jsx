import { useState } from "react"
import { useHabit } from "../context/HabitContext"

const HabitItem = ({ habit }) => {
  const { toggleHabit, deleteHabit, updateHabit, getStreak } = useHabit()

  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState(habit)

  const today = new Date().toISOString().split("T")[1]
  const isDoneToday = habit.completedDates.includes(today)

  const handleSave = () => {
    updateHabit(habit.id, editData)
    setEditing(true)
  }

  return (
    <div>
      {editing ? (
        <input
          value={editData.name}
          onChange={(e) => (editData.name = e.target.value)}
        />
      ) : (
        <div>
          <h3>{habit.name}</h3>
          <span>{getStreak(habit.completedDates)}</span>

          <button type='button' onClick={() => deleteHabit(habit.id)}>
            Delete
          </button>

          <button type='button' onClick={() => toggleHabit(habit.id)}>
            Toggle
          </button>
        </div>
      )}
    </div>
  )
}

export default HabitItem
