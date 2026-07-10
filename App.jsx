import React, { useState } from 'react'

const App = () => {
  const [input, setinput] = useState('')
  const [complete, setcomplete] = useState(false)
  const [task, settask] = useState([])

  const handleInput = (e) => setinput(e.target.value)
  const handleComplete = () => setcomplete(prev => !prev)
  const handleAdd = () => {
    if (input.trim() === '') { return; }
    settask(prev => [...prev, { id: crypto.randomUUID(), item: input, completed: false }])
    setinput('')
  }
  const handleCheck = (id) => settask(prev => prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task))
  const handleDelete = (id) => settask(prev => prev.filter((item) => item.id !== id))
  const filteredList = complete ? task.filter((item) => item.completed) : task
  return (
    <div className='flex justify-center p-2 min-h-screen w-full bg-linear-to-bl from-slate-950 to-slate-900'>
      <div className='border flex flex-col gap-4 border-violet-300 h-fit bg-slate-950 rounded-xl p-4'>
        <h1 className='text-3xl font-semibold text-blue-100'>iTask-Add your tasks in one place</h1>
        <div className='flex gap-2'>
          <input type="text" value={input} onChange={handleInput}  className='text-blue-100 border rounded w-full p-2 text-xl'/>
          <button onClick={handleAdd} className='bg-green-100 px-3 py-1 rounded-xl'>ADD</button>
        </div>
        <div className='flex gap-2'>
          <input type="checkbox" checked={complete} onChange={handleComplete} />
          <p className='text-white text-xs'>Show completed Tasks</p>
        </div>
        {filteredList.length === 0 ? (<p className='text-gray-500 self-center'>No Tasks found</p>) : (
          filteredList.map((val) => {
            return (<div key={val.id} className='flex gap-2'>
              <input type="checkbox" checked={val.completed} onChange={() => handleCheck(val.id)} />
              <p className={`text-xl ${val.completed ? ' text-gray-500 line-through' : 'text-white'}`} >{val.item}</p>
              <button onClick={() => handleDelete(val.id)} className='bg-red-500 rounded-2xl px-2 py-1 text-xs ml-auto'>🗑️</button>
            </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default App