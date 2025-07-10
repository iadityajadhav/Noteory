const { Schema, model } = require('mongoose')

const NoteSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const NoteModel = model("notes", NoteSchema, 'notes')

module.exports = NoteModel