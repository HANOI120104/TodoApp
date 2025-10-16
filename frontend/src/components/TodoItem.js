import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <span className={todo.completed ? 'completed' : ''}>
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-btn"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
