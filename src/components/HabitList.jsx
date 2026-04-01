import { useState } from "react"
import { useHabit } from "../context/HabitContext"

const HabitList = () => {
  const { habits, showAll, setShowAll, toggleHabit, deleteHabit, updateHabit } =
    useHabit()
  const [editingHabit, setEditingHabit] = useState(null)

  const today = new Date().toISOString().split("T")[0]

  const completedToday = habits.filter((h) =>
    h.completedDates.includes(today),
  ).length

  const progressPercent =
    habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0

  const topCategory = habits.reduce((acc, h) => {
    acc[h.category] = (acc[h.category] || 0) + 1
    return acc
  }, {})

  const categoryKeys = Object.keys(topCategory)

  const mainFocus =
    categoryKeys.length > 0
      ? categoryKeys.reduce((a, b) => (topCategory[a] < topCategory[b] ? b : a))
      : null

  if (habits.length === 0) {
    return (
      <div className='max-w-md mx-auto mt-12 p-8 rounded-lg border border-slate-200 bg-slate-50 text-center'>
        <h3 className='text-lg font-semibold text-slate-700'>No habits yet</h3>
        <p className='text-slate-500 mt-1 text-sm'>
          Start your journey by adding a new habit above.
        </p>
      </div>
    )
  }

  const visibleHabits = showAll ? habits : habits.slice(0, 3)

  const highPriorityCount = habits.filter((h) => h.priority === "high").length

  const handleComplete = (habitId) => {
    toggleHabit(habitId)
  }

  const handleDelete = (habitId) => {
    deleteHabit(habitId)
  }

  const handleEdit = (habit) => {
    setEditingHabit(habit)
  }

  const handleSaveEdit = () => {
    if (editingHabit) {
      updateHabit(editingHabit.id, editingHabit)
      setEditingHabit(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingHabit(null)
  }

  return (
    <div className='max-w-md mx-auto mt-6 px-4 pb-20'>
      <div className='bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-sm'>
        <div className='flex justify-between items-end mb-4'>
          <div>
            <span className='text-xs font-semibold text-slate-400 uppercase tracking-wide'>
              Daily Progress
            </span>
            <h2 className='text-xl font-bold text-slate-800'>
              {completedToday === habits.length
                ? "All caught up!"
                : "Keep going"}
            </h2>
          </div>
          <div className='text-right'>
            <span className='text-sm font-medium text-slate-600'>
              {completedToday} / {habits.length}
            </span>
          </div>
        </div>
        <div className='w-full bg-slate-100 h-2 rounded-full overflow-hidden'>
          <div
            className='bg-indigo-600 h-full transition-all duration-500'
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className='grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-slate-100'>
          <div>
            <p className='text-[11px] text-slate-400 font-bold uppercase'>
              Focus
            </p>
            <p className='text-sm font-semibold text-slate-700'>
              {mainFocus
                ? mainFocus.charAt(0).toUpperCase() + mainFocus.slice(1)
                : "None"}
            </p>
          </div>
          <div>
            <p className='text-[11px] text-slate-400 font-bold uppercase'>
              Priority
            </p>
            <p className='text-sm font-semibold text-slate-700'>
              {highPriorityCount} High Tasks
            </p>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between mb-3'>
        <h3 className='text-xs font-bold uppercase text-slate-500'>
          Your Routine
        </h3>
      </div>
      <div className='space-y-3'>
        {visibleHabits.map((habit) => (
          <div
            key={habit.id}
            className='p-4 bg-white rounded-lg border border-slate-200 transition-all shadow-sm'
          >
            {editingHabit?.id === habit.id ? (
              <div className='space-y-4'>
                <div className='space-y-3'>
                  <input
                    type='text'
                    value={editingHabit.name}
                    onChange={(e) =>
                      setEditingHabit({ ...editingHabit, name: e.target.value })
                    }
                    className='w-full px-3 py-2 rounded-md border border-slate-300 focus:border-indigo-500 outline-none text-sm'
                  />
                  <div className='grid grid-cols-2 gap-2'>
                    <input
                      type='number'
                      value={editingHabit.goal}
                      onChange={(e) =>
                        setEditingHabit({
                          ...editingHabit,
                          goal: e.target.value,
                        })
                      }
                      className='w-full px-3 py-2 rounded-md border border-slate-300 focus:border-indigo-500 outline-none text-sm'
                      placeholder='Goal'
                    />
                    <select
                      value={editingHabit.unit}
                      onChange={(e) =>
                        setEditingHabit({
                          ...editingHabit,
                          unit: e.target.value,
                        })
                      }
                      className='w-full px-3 py-2 rounded-md border border-slate-300 bg-white focus:border-indigo-500 outline-none text-sm'
                    >
                      <option value='mins'>Minutes</option>
                      <option value='pages'>Pages</option>
                      <option value='reps'>Reps</option>
                      <option value='liters'>Liters</option>
                    </select>
                  </div>
                </div>
                <div className='flex gap-2 justify-end'>
                  <button
                    type='button'
                    onClick={handleSaveEdit}
                    className='w-full px-3 py-1.5 text-sm bg-[#432DD7] text-white rounded'
                  >
                    Save changes
                  </button>
                  <button
                    type='button'
                    onClick={handleCancelEdit}
                    className='w-fit px-3 py-1.5 text-sm border border-slate-300 rounded text-slate-600 hover:bg-slate-50'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className='space-y-4'>
                <div className='flex justify-between items-start'>
                  <div className='flex-1'>
                    <div className='flex gap-2 items-center mb-1'>
                      <span className='text-[10px] font-bold uppercase text-indigo-600'>
                        {habit.category}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          habit.priority === "high"
                            ? "text-red-600 bg-red-50"
                            : habit.priority === "medium"
                              ? "text-amber-600 bg-amber-50"
                              : "text-green-600 bg-green-50"
                        }`}
                      >
                        {habit.priority}
                      </span>
                    </div>
                    <h3 className='text-lg font-bold text-slate-800'>
                      {habit.name}
                    </h3>
                  </div>
                  <div className='text-right ml-4'>
                    <div className='flex items-center justify-end text-slate-700'>
                      <span className='text-sm font-bold'>
                        {habit.completedDates.length}
                      </span>
                      <span className='ml-1 text-orange-500 font-black text-xs'>
                        ^^
                      </span>
                    </div>
                    <p className='text-[10px] text-slate-400 font-semibold uppercase tracking-tight'>
                      Streak
                    </p>
                  </div>
                </div>
                <div className='flex items-center justify-between pt-4 border-t border-slate-100'>
                  <div className='text-xs'>
                    <span className='text-slate-400 block font-medium uppercase'>
                      Goal
                    </span>
                    <span className='font-semibold text-slate-700'>
                      {habit.goal} {habit.unit}
                    </span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='flex gap-1'>
                      <button
                        type='button'
                        onClick={() => handleEdit(habit)}
                        className='p-1.5 text-slate-600 hover:text-blue-900 transition-colors'
                        title='Edit'
                      >
                        Edit
                      </button>
                      <button
                        type='button'
                        onClick={() => handleDelete(habit.id)}
                        className='p-1.5 text-slate-700 hover:text-red-500 transition-colors'
                        title='Delete'
                      >
                        Delete
                      </button>
                    </div>
                    <button
                      type='button'
                      onClick={() => handleComplete(habit.id)}
                      className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                        habit.completedDates.includes(today)
                          ? "bg-slate-100 text-slate-500 hover:bg-neutral-100"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      {habit.completedDates.includes(today)
                        ? "Completed"
                        : "Complete"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default HabitList
