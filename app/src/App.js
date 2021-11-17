import React from 'react'
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import Notes from './Notes'

const Home = () => <h1>Home Page</h1>

const Users = () => <h1>Users</h1>

const App = () => {
  const inlineStyles = {
    padding: 5
  }

  return (
    <BrowserRouter>
      <header>
        <Link to='/' style={inlineStyles}>Home</Link>
        <Link to='/notes' style={inlineStyles}>Notes</Link>
        <Link to='/users' style={inlineStyles}>Users</Link>
      </header>
      <Routes>
        <Route path='/notes' element={Notes} />
        <Route path='/users'><Users /></Route>
        <Route path='/'><Home /></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
