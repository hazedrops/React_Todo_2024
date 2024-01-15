import { useEffect, useState } from 'react'
import './styles.css'
import { NewTodoForm } from './NewTodoForm'
import { TodoList } from './TodoList'

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem('ITEMS')

    if (localValue == null) return [] // We don't have any value yet!

    return JSON.parse(localValue)
  })

  // Anytime the todo's changed call the () => {} function
  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {
          id: crypto.randomUUID(),
          title,
          completed: false
        },
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
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
      <NewTodoForm onSubmit={addTodo} />
      <h1 className='header'>Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )
}
