import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './App.css';

const API_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from backend
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTodos(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos. Make sure the backend server is running.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text) => {
    try {
      const response = await axios.post(API_URL, { text });
      setTodos([...todos, response.data]);
    } catch (err) {
      setError('Failed to add todo');
      console.error('Error adding todo:', err);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t.id === id);
      const response = await axios.put(`${API_URL}/${id}`, {
        completed: !todo.completed
      });
      setTodos(todos.map(t => t.id === id ? response.data : t));
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo App</h1>
        <p className="subtitle">Organize your tasks efficiently</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <AddTodo onAdd={addTodo} />
        
        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        )}

        <div className="stats">
          <span>Total: {todos.length}</span>
          <span>Completed: {todos.filter(t => t.completed).length}</span>
          <span>Active: {todos.filter(t => !t.completed).length}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
