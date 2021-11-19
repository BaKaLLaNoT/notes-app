import React, { lazy } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, useRouteMatch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { NoteDetail } from './components/NoteDetail'
import { useUser } from './hooks/useUser'
import { useNotes } from './hooks/useNotes'
import Login from './Login'

const LazyNotes = lazy(() => import('./Notes'))

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
  const { notes } = useNotes()
  const { user } = useUser()

  const inlineStyles = {
    padding: 5
  }
  const match = useRouteMatch('/notes/:id')
  return (
    <BrowserRouter>
      <header>
        <Link to='/' style={inlineStyles}>
          Home
        </Link>
        <Link to='/notes' style={inlineStyles}>
          Notes
        </Link>
        <Link to='/users' style={inlineStyles}>
          Users
        </Link>
        {
          user
            ? <em>Logged as {user.name}</em>
            : (
              <Link to='/login' style={inlineStyles}>
                Login
              </Link>
              )
        }
      </header>
      <Routes>
        <Route
          path='/login' render={() => {
            return user ? <Navigate to='/' /> : <Login />
          }}
        />
        <Route exact path='/notes'>
          <LazyNotes />
        </Route>
        <Route
          path='/notes/:noteId' render={() => {
            const note = match
              ? notes.find(note => note.id === match.params.id)
              : null
            return <NoteDetail note={note} />
          }}
        />
        <Route path='/users'>
          {user ? <Users /> : <Navigate to='/login' />}
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route>
          <h1>Not found</h1>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
