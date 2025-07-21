const express = require('express');
const app = express();
const mongoose = require('mongoose');

const PORT = 3000;

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/notesdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> console.log('mongodb connected')).catch((err) => console.log(err));

const noteSchema = new mongoose.Schema({
    title: String,
    body : String 
});

const Note = mongoose.model('Note',noteSchema);

app.get('/notes',async (req , res ) => {
const notes = await Note.find();
res.json(notes);
})

app.post('/notes',async (req , res) => {
const note = await Note.create(req.body);
res.status(201).json(note);
})

app.put('/notes/:id' , async (req , res ) => {
    const note = await Note.findByIdAndUpdate(req.params.id,req.body,{
        new: true
    });
    if(!note) return res.status(404).json({error : "Note Not Found!"});
    res.json(note)
})

app.delete('/notes/:id',async (req , res )=> {
    const note = await Note.findByIdAndDelete(req.params.id);
    res.json({message: "Note Deleted!"});
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));