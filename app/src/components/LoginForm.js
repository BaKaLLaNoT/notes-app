import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

export const useField = ({ type }) => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }
  return { type, value, onChange }
}

export default function LoginForm ({
  handleSubmit
}) {
  const username = useField({ type: 'text' })
  const password = useField({ type: 'password' })
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group id='username'>
        <Form.Control
          {...username}
          name='Username'
          placeholder='Username'
        />
      </Form.Group>
      <Form.Group id='password'>
        <Form.Control
          {...password}
          name='Password'
          placeholder='Password'
        />
      </Form.Group>
      <Button id='form-login-button'>Login</Button>
    </Form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string
}
