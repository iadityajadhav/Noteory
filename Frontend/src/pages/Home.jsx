import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleSuccess, handleError } from '../utils'

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('')
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState({ title: '', description: '' })
  const [isEditing, setIsEditing] = useState(false)
  const [editNoteId, setEditNoteId] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser')
    setLoggedInUser(user)
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      const response = await fetch('https://noteory-api.vercel.app/auth/notes', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
      const data = await response.json()
      setNotes(data)
    } catch (err) {
      handleError('Failed to fetch notes')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    handleSuccess('User Logged out')
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  const handleNoteChange = (e) => {
    const { name, value } = e.target
    setNewNote((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddNote = async () => {
    try {
      const response = await fetch('https://noteory-api.vercel.app/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(newNote)
      })

      if (!response.ok) throw new Error('Failed to add note')

      const addedNote = await response.json()
      handleSuccess('Note added')
      setNotes((prev) => [...prev, addedNote])
      setNewNote({ title: '', description: '' })
    } catch (err) {
      handleError('Error adding note')
    }
  }

  const handleEdit = (note) => {
    setNewNote({ title: note.title, description: note.description })
    setIsEditing(true)
    setEditNoteId(note._id)
  }

  const handleUpdateNote = async () => {
    try {
      const response = await fetch(`https://noteory-api.vercel.app/api/notes/${editNoteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(newNote)
      })

      if (!response.ok) throw new Error('Failed to update')

      const updatedNote = await response.json()

      setNotes((prev) =>
        prev.map((note) => (note._id === editNoteId ? updatedNote : note))
      )
      handleSuccess('Note updated')
      setNewNote({ title: '', description: '' })
      setIsEditing(false)
      setEditNoteId(null)
    } catch (err) {
      handleError('Error updating note')
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://noteory-api.vercel.app/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })

      if (!response.ok) throw new Error('Failed to delete')

      handleSuccess('Note deleted')
      setNotes((prev) => prev.filter((note) => note._id !== id))
    } catch (err) {
      handleError('Error deleting note')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a192f] text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-[#112240] rounded-xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-cyan-400">Welcome, {loggedInUser}</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white"
          >
            Logout
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-[#00bcd4]">
          {isEditing ? 'Edit Note' : 'Add Note'}
        </h2>

        <div className="space-y-4 mb-6">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newNote.title}
            onChange={handleNoteChange}
            className="w-full px-4 py-2 rounded-md bg-[#0f1f38] text-white outline-none"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={newNote.description}
            onChange={handleNoteChange}
            className="w-full px-4 py-2 rounded-md bg-[#0f1f38] text-white outline-none"
          />
          {isEditing ? (
            <button
              onClick={handleUpdateNote}
              className="w-full bg-[#008b8b] hover:bg-[#00b4b4] text-white px-4 py-2 rounded-md"
            >
              Update Note
            </button>
          ) : (
            <button
              onClick={handleAddNote}
              className="w-full bg-[#008b8b] hover:bg-[#00b4b4] text-white px-4 py-2 rounded-md"
            >
              Add Note
            </button>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4 text-[#00bcd4]">Your Notes</h2>

        {notes.length === 0 ? (
          <p className="text-gray-400">No notes yet.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="bg-[#173554] rounded-lg p-4 mb-4 shadow-sm"
            >
              <h3 className="text-lg font-bold mb-1">{note.title}</h3>
              <p className="text-sm text-gray-300 mb-3">{note.description}</p>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="bg-[#008b8b] hover:bg-[#00b4b4] text-white px-3 py-1 rounded-md text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

        <ToastContainer />
      </div>
    </div>
  )
}

export default Home
