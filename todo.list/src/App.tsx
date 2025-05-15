import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  type Todo = {
    id: number;
    task: string;
    completed: boolean;
    timeEnd: number
  }
  const addTodo = () => {
    if (input.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now(),
      task: input,
      completed: false,
      timeEnd: 10
    }
    setTodo([...todo, newTodo]);
    setInput('');
  };
  const toggleTodo = (id: number) => {
    setTodo(todo.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  };
  const deleteTodo = (id: number) => {
    setTodo(todo.filter(todo => todo.id !== id))
  };
  useEffect(() => {
    const timeToTask = setInterval(() => {
      setTodo(prevTask => prevTask.map(task => ({ ...task, timeEnd: task.timeEnd - 1, }))
        .filter(task => task.timeEnd > 0)
      )
    }, 1000);
    return () => clearInterval(timeToTask);
  }, [])
  return (
    <>
      <div className="todo">
        <div className="container">
          <div className="todo__content">
            <h1 className="todo__title">Todo List</h1>
            <input value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text" className="todo__input"
              placeholder="Напишите задачу" />
            <button className='todo__btnAdd' onClick={addTodo}>Добавить задачу</button>
            <ul>
              {todo.map(t =>
                <li key={t.id}>
                  <span onClick={() => toggleTodo(t.id)}
                    className={`todo-item ${t.completed ? 'todo-completed' : ''}`}>
                    {t.task}
                    <span className='timeEnd'>
                      ⏳{t.timeEnd} сек
                    </span>
                    <input type='checkbox'
                      checked={t.completed}
                      className='todo__checkbox'
                      onChange={() => toggleTodo(t.id)}>
                    </input>
                  </span>
                  {t.completed && <button className='todo__btnDelAll' onClick={() => deleteTodo(t.id)}>Удалить</button>}
                </li>
              )}
            </ul>
            <button className='todo__allDel' onClick={() => setTodo([])}>Очистить список</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
