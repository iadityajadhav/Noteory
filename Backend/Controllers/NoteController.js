const NoteModel = require('../Models/notes')

const addNote = async (req, res) => {
    const { title, description } = req.body
    const note = new NoteModel({ user: req.userId, title, description })
    await note.save()
    res.status(201).json(note)
}

const findNote = async (req, res) => {
    const notes = await NoteModel.find({ user: req.userId })
    res.json(notes)
}

const updateNote = async (req, res) => {
    const { title, description } = req.body
    const note = await NoteModel.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        { title, description },
        { new: true }
    )
    res.json(note)
}

const deleteNote = async (req, res) => {
    await NoteModel.findOneAndDelete({ _id: req.params.id, user: req.userId })
    res.json({ message: 'Note deleted' })
}

module.exports = {addNote, findNote, updateNote, deleteNote}