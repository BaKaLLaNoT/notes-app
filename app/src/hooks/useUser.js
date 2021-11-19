import { useEffect, useState } from 'react'
import noteService from '../services/notes'
import loginService from '../services/login'

export const useUser = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const login = async ({ username, password }) => {
    const user = await loginService.login({ username, password })
    console.log(user)
    window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
    noteService.setToken(user.token)
    setUser(user)
  }

  const logout = () => {
    setUser(null)
    noteService.setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  return { user, login, logout }
}
