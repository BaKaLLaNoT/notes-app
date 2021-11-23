import React, { Suspense } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { NoteDetail } from './components/NoteDetail'
import { useUser } from './hooks/useUser'
import Notes from './Notes'
import Login from './Login'
import { Nav, Navbar } from 'react-bootstrap'

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
    <Suspense fallback={<span>Loading component..</span>}>
      <div className='container'>
        <Navbar collapseOnSelect expand='lg'>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse>
            <Nav>
              <Nav.Link><Link to='/' style={inlineStyles}>Home</Link></Nav.Link>
              <Nav.Link><Link to='/notes' style={inlineStyles}>Notes</Link></Nav.Link>
              <Nav.Link><Link to='/users' style={inlineStyles}>Users</Link></Nav.Link>
              {
          user
            ? <em>Logged as {user.name}</em>
            : (
              <Nav.Link><Link to='/login' style={inlineStyles}>Login</Link></Nav.Link>
              )
        }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes>
          <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
          <Route path='/notes' element={<Notes />} />
          <Route path='/notes/:noteId' element={<NoteDetail />} />
          <Route path='/users' element={user ? <Users /> : <Navigate to='/login' />} />
          <Route path='/' element={<Home />} />
          <Route element={<h1>Not found</h1>} />
        </Routes>
      </div>
    </Suspense>
  )
}

export default App
