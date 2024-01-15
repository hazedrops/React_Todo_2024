export function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
  return (
    <li>
      <label>
        <input
          type='checkbox'
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
      {/* Need to use '() =>' to pass the function at the time of click, not the
      result of the already executed function */}
      <button className='btn btn-danger' onClick={() => deleteTodo(id)}>
        Delete
      </button>
    </li>
  )
}
