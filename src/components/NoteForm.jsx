import { useEffect, useState } from 'react'
import noteService from '../services/notes'

const { create, setToken } = noteService

export function NoteForm({ setNotes, setErrorMessage, notes, token }) {
  const [newNote, setNewNote] = useState('')

  const handleNoteChange = event => setNewNote(event.target.value)

  const addNote = async event => {
    setToken(token)

    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    if (newNote === '') return
    try {
      const res = await create(noteObject)
      setNotes([...notes, res])
    } catch (err) {
      setErrorMessage(err.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }

    setNewNote('')
  }

  return (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">Save</button>
    </form>
  )
}
