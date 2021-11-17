import React, { useState } from 'react'

const Home = () => <h1>Home Page</h1>

const Notes = () => <h1>Notes</h1>

const Users = () => <h1>Users</h1>

const App = () => {
  const [page, setPage] = useState(() => {
    const { pathname } = window.location
    const page = pathname.slice(1)
    return page
  })

  const getContent = () => {
    if (page === 'users') {
      return <Users />
    } else if (page === 'notes') {
      return <Notes />
    } else {
      return <Home />
    }
  }

  const toPage = page => event => {
    event.preventDefault()
    window.history.pushState(null, '', `/${page}`)
    setPage(page)
  }

  const inlineStyles = {
    padding: 5
  }

  return (
    <div>
      <header>
        <a href='#' onClick={toPage('home')} style={inlineStyles}>Home</a>
        <a href='#' onClick={toPage('notes')} style={inlineStyles}>Notes</a>
        <a href='#' onClick={toPage('users')} style={inlineStyles}>Users</a>
      </header>{getContent()}
    </div>
  )
}

export default App
