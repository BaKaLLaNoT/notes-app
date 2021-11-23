import React, { useState } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useNavigate } from 'react-router-dom'
import { useUser } from './hooks/useUser'

export default function Login () {
  const navigate = useNavigate()
  const { user, login } = useUser()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      login({ username, password })
      setUsername('')
      setPassword('')
      navigate('/notes')
    } catch (e) {
      setErrorMessage('Wrong credentials!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>
  }

  if (user) {
    return <p>User is logged</p>
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}
