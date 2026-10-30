import { useState , useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [tasks, setTask] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});
  const[text,setText]=useState("");
  function addTask(){
    if(!text.trim()) return;
    const task={id:crypto.randomUUID(), name: text, completed:false};
    setTask([...tasks,task]);
    setText("");

  }
  function startEditing(task) {
  setEditingId(task.id);
  setEditText(task.name);
}

useEffect(()=>{
  localStorage.setItem("tasks",JSON.stringify(tasks));
},[tasks]);
function saveEdit() {
  if (!editText.trim()) return;

  setTask(
    tasks.map((t) =>
      t.id === editingId
        ? { ...t, name: editText.trim() }
        : t
    )
  );

  setEditingId(null);
  setEditText("");
}

function cancelEdit() {
  setEditingId(null);
  setEditText("");
}
  return (
    <>
    <h1>MY TODO APP</h1>
    <div className="task-input-container">
      <input className="task-input" type="text" value={text} onKeyDown={(e)=>{if(e.key=="Enter") addTask();}} placeholder="Enter your task" onChange={(event)=>setText(event.target.value)}></input>  
      <button onClick={addTask} className='add-task-btn'>+</button>
      </div>
      <ul>{
        tasks.map((task)=><li key={task.id} className='task-item'><input type="checkbox" onChange={()=>{setTask(
          tasks.map((t)=>{
            if(t.id===task.id) return {...t,completed:!t.completed}
          else return t; })
        )}} checked={task.completed}/><span className={`task-name ${task.completed ? "completedTask" : "notCompletedTask"}`}>

          {editingId === task.id ? (
  <>
    <input
      type="text"
      value={editText}
      onChange={(event) => setEditText(event.target.value)}
    />
    <button onClick={saveEdit}>Save</button>
    <button onClick={cancelEdit}>Cancel</button>
  </>
) : (
  <>
    <span
      className={
        task.completed ? "completedTask" : "notCompletedTask"
      }
    >
      {task.name}
    </span>
    <div className='task-actions'>

    </div>
  </>
)}
          </span>    <button onClick={() => startEditing(task)}>✏️</button>
<button onClick={()=>{setTask(tasks.filter((t)=>t.id!==task.id))}}>🗑️</button></li>)
        }
      </ul>
    </>
  )
}


export default App
