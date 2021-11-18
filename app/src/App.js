import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'
import { NoteDetail } from './components/NoteDetail'
import Notes from './Notes'
import noteService from './services/notes'

const Home = () => <h1>Home Page</h1>
const Users = () => <h1>Users</h1>

const App = () => {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes)
      })
  }, [])

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
        <Route path='/notes/:noteId' element={<NoteDetail notes={notes} />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/users' element={<Users />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <Outlet />
    </BrowserRouter>
  )
}

export default App
