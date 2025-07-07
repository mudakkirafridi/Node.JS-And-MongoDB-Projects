const express = require('express');
const app = express();

app.use(express.json());

let notes = [
  { id: 1, title: 'Shopping List', content: 'Buy eggs and milk' },
  { id: 2, title: 'Workout', content: 'Run 5km tomorrow' }
];

// GET all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// GET a single note by ID
app.get('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const note = notes.find(n => n.id === noteId);
  if (!note) {
    return res.status(404).send('Note not found');
  }
  res.json(note);
});

// POST a new note
app.post('/notes', (req, res) => {
  const newNote = {
    id: notes.length + 1,
    title: req.body.title,
    content: req.body.content
  };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// PUT to update a note
app.put('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const note = notes.find(n => n.id === noteId);
  if (!note) {
    return res.status(404).send('Note not found');
  }
  note.title = req.body.title || note.title;
  note.content = req.body.content || note.content;
  res.json(note);
});

// DELETE a note
app.delete('/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  notes = notes.filter(n => n.id !== noteId);
  res.send('Note deleted');
});

// Handle 404
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(3000, () => {
  console.log('Notes API running on http://localhost:3000');
});
