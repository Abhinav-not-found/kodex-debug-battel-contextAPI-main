import { useForm } from "react-hook-form"
import { useHabit } from "../context/HabitContext"

const HabitForm = () => {
  const { addHabit } = useHabit()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      goal: "",
      unit: "mins",
      date: new Date().toISOString().split("T")[0],
      category: "mindset",
      motivation: "",
      priority: "medium",
    },
  })

  const onCommit = (values) => {
    const payload = {
      ...values,
      id: crypto.randomUUID(),
      completed: false,
      completedDates: [],
    }

    addHabit(payload)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onCommit)} className='space-y-4'>
      <div className='flex flex-col gap-1.5 '>
        <label htmlFor='name' className='text-xs font-semibold text-slate-600'>
          Habit Name
        </label>
        <input
          placeholder='e.g. Morning Exercise'
          className='w-full px-3 py-2 rounded-md border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-placeholder text-sm text-slate-800'
          type='text'
          {...register("name", { required: "Habit name is required" })}
        />
        {errors.name && (
          <span className='text-red-500 text-xs'>{errors.name.message}</span>
        )}
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col gap-1.5'>
          <label
            htmlFor='goal'
            className='text-xs font-semibold text-slate-600'
          >
            Daily Goal
          </label>
          <input
            placeholder='30'
            className='w-full px-3 py-2 rounded-md border border-slate-300 focus:border-indigo-500 outline-none text-sm'
            type='number'
            {...register("goal", { required: "Daily goal is required" })}
          />
          {errors.goal && (
            <span className='text-red-500 text-xs'>{errors.goal.message}</span>
          )}
        </div>
        <div className='flex flex-col gap-1.5'>
          <label
            htmlFor='unit'
            className='text-xs font-semibold text-slate-600'
          >
            Unit
          </label>
          <select
            {...register("unit")}
            className='w-full px-3 py-2 rounded-md border border-slate-300 bg-white focus:border-indigo-500 outline-none text-sm text-slate-700'
          >
            <option value='minutes'>Minutes</option>
            <option value='pages'>Pages</option>
            <option value='reps'>Reps</option>
            <option value='liters'>Liters</option>
          </select>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col gap-1.5'>
          <label
            htmlFor='date'
            className='text-xs font-semibold text-slate-600'
          >
            Start Date
          </label>
          <input
            className='w-full px-3 py-2 rounded-md border border-slate-300 focus:border-indigo-500 outline-none text-sm text-slate-700'
            type='date'
            {...register("date")}
          />
        </div>
        <div className='flex flex-col gap-1.5'>
          <label
            htmlFor='category'
            className='text-xs font-semibold text-slate-600'
          >
            Category
          </label>
          <select
            {...register("category")}
            className='w-full px-3 py-2 rounded-md border border-slate-300 bg-white focus:border-indigo-500 outline-none text-sm text-slate-700'
          >
            <option value='health'>Health</option>
            <option value='focus'>Focus</option>
            <option value='growth'>Growth</option>
            <option value='mindset'>Mindset</option>
          </select>
        </div>
      </div>
      <div className='flex flex-col gap-1.5'>
        <label
          htmlFor='motivation'
          className='text-xs font-semibold text-slate-600'
        >
          Motivation
        </label>
        <textarea
          {...register("motivation")}
          rows='2'
          placeholder='Why is this important to you?'
          className='w-full px-3 py-2 rounded-md border border-slate-300 focus:border-indigo-500 outline-none transition-all resize-none text-sm text-slate-700'
        ></textarea>
      </div>
      <div className='flex flex-col gap-1.5'>
        <label
          htmlFor='priority'
          className='text-xs font-semibold text-slate-600'
        >
          Priority Level
        </label>
        <div className='grid grid-cols-3 gap-2'>
          <label
            htmlFor='priority-low'
            className='flex items-center gap-2 cursor-pointer'
          >
            <input
              id='priority-low'
              className='w-4 h-4 text-indigo-600 border-slate-300'
              type='radio'
              value='low'
              {...register("priority")}
            />
            <span className='text-sm text-slate-600'>Low</span>
          </label>
          <label
            htmlFor='priority-medium'
            className='flex items-center gap-2 cursor-pointer'
          >
            <input
              id='priority-medium'
              className='w-4 h-4 text-indigo-600 border-slate-300'
              type='radio'
              value='medium'
              {...register("priority")}
            />
            <span className='text-sm text-slate-600'>Medium</span>
          </label>
          <label
            htmlFor='priority-high'
            className='flex items-center gap-2 cursor-pointer'
          >
            <input
              id='priority-high'
              className='w-4 h-4 text-indigo-600 border-slate-300'
              type='radio'
              value='high'
              {...register("priority")}
            />
            <span className='text-sm text-slate-600'>High</span>
          </label>
        </div>
      </div>
      <button
        type='submit'
        className='w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors active:bg-indigo-800 mt-2'
      >
        Create Habit
      </button>
    </form>
  )
}

export default HabitForm
