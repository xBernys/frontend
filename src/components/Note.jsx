import { useState } from 'react'

export function Note({ note, toggleImportance, deleteNote }) {
  const label = note.important ? 'make not important' : 'make important'

  const [editing, setEditing] = useState(false)

  const handleDoubleClick = () => {
    setEditing(true)
  }

  return (
    <div className="note">
      <button contentEditable={editing} onDoubleClick={handleDoubleClick}>
        {note.content}
      </button>
      <button onClick={toggleImportance}>{label}</button>
      <button onClick={deleteNote}>❌</button>
    </div>
  )
}
