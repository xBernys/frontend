import { useEffect, useState } from 'react'
import { Note } from './components/Note'
import { Notification } from './components/Notification'
import noteServices from './services/notes'
import { LoginForm } from './components/LoginForm'
import { NoteForm } from './components/NoteForm'

const { getByUserIdNotes, getAll, update, remove, setToken } = noteServices

export default function App() {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [query, setQuery] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const notes = await getByUserIdNotes(user.id)
          setNotes(notes.data)
        } catch (err) {
          setErrorMessage(err)
        }
      }
    }
    fetchData()
  }, [query, user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const toggleImportanceOf = async id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { important: !note.important }
    try {
      const updated = await update(id, changedNote)

      setNotes(notes.map(note => (note.id !== id ? note : updated)))
    } catch (error) {
      setErrorMessage(`Note '${note.content}' was already removed from server`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDeleteNote = id => remove(id).then(_ => setQuery(!query))

  const hanldeLogOutClick = e => {
    window.localStorage.clear('loggedNoteappUser')
    setUser(null)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  if (errorMessage === 'token expired') {
    window.localStorage.clear('loggedNoteappUser')
    setUser(null)
    setErrorMessage(null)
  }

  return (
    <div>
      <h1>Notes</h1>
      {!errorMessage ? null : <Notification message={errorMessage} />}
      {!user ? (
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
      ) : (
        <div>
          <button onClick={hanldeLogOutClick}>log out</button>
          <div>
            <p>{user.name}</p>{' '}
            <NoteForm
              token={user.token}
              notes={notes}
              setErrorMessage={setErrorMessage}
              setNotes={setNotes}
            />
          </div>
          <div>
            <button
              onClick={() => {
                setShowAll(!showAll)
              }}
            >
              hola mundo
              {showAll ? 'show important' : 'show all'}
            </button>
          </div>
          <ul className="ul-notes">
            {notesToShow.map(note => (
              <Note
                toggleImportance={() => toggleImportanceOf(note.id)}
                deleteNote={() => handleDeleteNote(note.id)}
                key={note.id}
                note={note}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
