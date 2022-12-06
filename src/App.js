import React, { useState, useEffect } from 'react'
import './App.css'
import Form from './components/Form.js'

import TodoList from './components/TodoList.js'

function App() {
  //States
  const [inputText, setInputText] = useState('')
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('All')
  const [filteredTodos, setFilteredTodos] = useState([])

  //useEffect

  useEffect(() => {
    const filterHandler = () => {
      switch (status) {
        case 'completed':
          setFilteredTodos(todos.filter((todo) => todo.completed === true))
          break

        case 'uncompleted':
          setFilteredTodos(todos.filter((todo) => todo.completed === false))
          break

        default:
          setFilteredTodos(todos)
          break
      }
    }
    filterHandler()
    saveLocalTodos()
  }, [todos, status])

  //Functions

  //save to local

  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify([todos]))
  }

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      localStorage.setItem('todos', JSON.stringify([todos]))
    }
  }

  return (
    <div className='App'>
      <header>Raja's Todo List </header>
      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
      />
    </div>
  )
}

export default App
