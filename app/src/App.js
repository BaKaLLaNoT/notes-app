import React from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { NoteDetail } from './components/NoteDetail'
import { useUsers } from './hooks/useUser'
import { useNotes } from './hooks/useNotes'
import Notes from './Notes'
import Login from './Login'

const Home = () => <h1>Home Page</h1>
const Users = () => <h1>Users</h1>

const App = () => {
  const { notes } = useNotes()
  const { user } = useUsers()
  const inlineStyles = {
    padding: 5
  }
  return (
    <BrowserRouter>
      <header>
        <Link to='/' style={inlineStyles}>Home</Link>
        <Link to='/notes' style={inlineStyles}>Notes</Link>
        <Link to='/users' style={inlineStyles}>Users</Link>
        {user
          ? <em>Logged as {user.name}</em>
          : <Link to='/login' style={inlineStyles}>Login</Link>}
      </header>
      <Routes>
        <Route path='/notes/:noteId' element={<NoteDetail notes={notes} />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/users' element={<Users />} />
        <Route path='/login' element={user ? <Navigate replace to='/' /> : <Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
