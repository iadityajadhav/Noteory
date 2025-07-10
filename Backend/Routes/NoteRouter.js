const express = require('express')
const router = express.Router()
const NoteModel = require('../Models/notes')
const auth = require('../Middlewares/auth') // JWT verification middleware
const {addNote, findNote, updateNote, deleteNote} = require('../Controllers/NoteController')

// Create Note
router.post('/', auth, addNote)

// Get All Notes for Logged-in User
router.get('/', auth, findNote)

// Update Note
router.put('/:id', auth, updateNote)

// Delete Note
router.delete('/:id', auth, deleteNote)

module.exports = router
