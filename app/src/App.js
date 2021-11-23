import React from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { NoteDetail } from './components/NoteDetail'
import { useUser } from './hooks/useUser'
import Notes from './Notes'
import Login from './Login'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Notes App</title>
      </Helmet>
      <h1>Home Page</h1>
    </>
  )
}

const Users = () => <h1>Users</h1>

const App = () => {
  const { user } = useUser()

  const inlineStyles = {
    padding: 5
  }
  return (
    <BrowserRouter>
      <header>
        <Link to='/' style={inlineStyles}>Home</Link>
        <Link to='/notes' style={inlineStyles}>Notes</Link>
        <Link to='/users' style={inlineStyles}>Users</Link>
        {
          user
            ? <em>Logged as {user.name}</em>
            : (
              <Link to='/login' style={inlineStyles}>Login</Link>
              )
        }
      </header>
      <Routes>
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/notes/:noteId' element={<NoteDetail />} />
        <Route path='/users' element={user ? <Users /> : <Navigate to='/login' />} />
        <Route path='/' element={<Home />} />
        <Route element={<h1>Not found</h1>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
