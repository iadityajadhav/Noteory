const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('../Models/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('../Routes/AuthRouter');
const NoteRouter = require('../Routes/NoteRouter');
const serverless = require('serverless-http');

dotenv.config();
connectDB();

const app = express();

app.get('/ping', (req, res) => {
  res.send("PONG from Vercel!");
});

app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/auth', AuthRouter);
app.use('/api/notes', NoteRouter);

module.exports = app;
module.exports.handler = serverless(app);
