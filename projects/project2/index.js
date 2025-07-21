const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory storage
let notes = [];
let idCounter = 1;

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// GET all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// POST create note
app.post("/notes", (req, res) => {
  const note = {
    id: idCounter++,
    title: req.body.title,
    body: req.body.body,
  };
  notes.push(note);
  res.status(201).json({ message: "Note created!", note });
});

// PUT update note
app.put("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find((n) => n.id === id);
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }
  note.title = req.body.title || note.title;
  note.body = req.body.body || note.body;
  res.json({ message: "Note updated", note });
});

// DELETE note
app.delete("/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter((n) => n.id !== id);
  res.json({ message: "Note deleted" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
