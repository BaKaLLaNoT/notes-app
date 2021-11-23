import React from 'react'
import { useParams } from 'react-router-dom'
import { useNotes } from '../hooks/useNotes'

export const NoteDetail = () => {
  const { noteId } = useParams()
  const { notes } = useNotes()

  const note = notes.find(note => note.id === noteId)
  if (!note) { return null }

  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user?.name}</div>
      <div>
        <strong>{note.important ? 'important' : ''}</strong>
      </div>
    </div>
  )
}
