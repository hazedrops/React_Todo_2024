import { useState } from 'react'
import './styles.css'

export default function App() {
  const [newItem, setNewItem] = useState('')
  const [todos, setTodos] = useState([])

  function handleSubmit(e) {
    e.preventDefault()

    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title: newItem,
          completed: false,
        },
      ]
    })

    setNewItem('')
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed } // Creating brand new todo - todo.completed = completed not working since this syntax is mutating the state (state is immutable)
        }

        return todo // If ids not matching just return the todo as it is with no change
      })
    })
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='new-item-form'>
        <div className='form-row'>
          <label htmlFor='item'>New Item</label>
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            type='text'
            id='item'
          />
        </div>
        <button className='btn'>Add</button>
      </form>
      <h1 className='header'>Todo List</h1>
      <ul className='list'>
        {todos.length === 0 && 'No Todos'}
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type='checkbox'
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title}
              </label>
              <button
                className='btn btn-danger'
                onClick={() => deleteTodo(todo.id)} // Need to use '() =>' to pass the function at the time of click, not the result of the already executed function
              >
                Delete
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
