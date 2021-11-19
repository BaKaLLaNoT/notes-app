import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks/useField'

export default function LoginForm ({
  handleSubmit
}) {
  const username = useField({ type: 'text' })
  const password = useField({ type: 'password' })
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          {...username}
          name='Username'
          placeholder='Username'
        />
      </div>
      <div>
        <input
          {...password}
          name='Password'
          placeholder='Password'
        />
      </div>
      <button id='form-login-button'>Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string
}
