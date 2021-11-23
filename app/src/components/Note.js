import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'

  return (
    <>
      <td className='note'>
        <Link to={`/notes/${note.id}`}>{note.content}</Link>
      </td>
      <td>
        <Button onClick={toggleImportance}>{label}</Button>
      </td>
    </>
  )
}

export default Note
