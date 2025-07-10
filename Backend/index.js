const express = require('express')
const app = express()
const dotenv = require('dotenv')
const connectDB = require('./Models/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')
const NoteRouter = require('./Routes/NoteRouter')

const PORT = process.env.PORT
dotenv.config()
connectDB()

app.get('/ping', (req, res) => {
    res.send("PONG")
})

app.use(bodyParser.json())
app.use(cors({
  origin: '*', // allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use('/auth', AuthRouter)
app.use('/api/notes', NoteRouter)

app.listen(process.env.PORT, () => {
    console.log(`MERN-Miniproject app is listening on Port : ${PORT}`)
})