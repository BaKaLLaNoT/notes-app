import React, { useState } from 'react'
import Note from './components/Note'
import NoteForm from './components/NoteForm'
import { useNotes } from './hooks/useNotes'
import { useUser } from './hooks/useUser'

const Notes = () => {
  const { notes, addNote, toggleImportanceOf } = useNotes()
  const { user, logout } = useUser()

  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const toggleImportanceOfNote = (id) => {
    toggleImportanceOf(id)
      .catch(() => {
        setErrorMessage(
          'Note was already removed from server'
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)
  return (
    <div>
      <h1>Notes</h1>
      {user ? <NoteForm addNote={addNote} handleLogout={logout} /> : null}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note, i) => (
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportanceOfNote(note.id)}
          />
        ))}
      </ul>
    </div>
  )
}

export default Notes
