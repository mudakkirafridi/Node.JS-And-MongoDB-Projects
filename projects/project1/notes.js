const fs = require('fs').promises;
const chalk = require('chalk');

const NOTES_FILE = 'notes.json';


// load Notes from notes file 
async function loadNotes() {
    try {
        const data = await fs.readFile(NOTES_FILE,"utf8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// save notes 
async function saveNotes(notes) {
    await fs.writeFile(NOTES_FILE, JSON.stringify(notes, null , 2));
}

// add notes 
exports.addNotes = async (title , body) => {
const notes = await loadNotes();
const duplicate = notes.find((note)=> note.title === title);
if (duplicate) {
    console.log(chalk.red("Note Title Taken!"));
} else {
    notes.push({title, body});
      await saveNotes(notes);
    console.log(chalk.green("Note Added!"));
}
}

// list notes
exports.listNotes = async() => {
    const notes = await loadNotes();
    console.log(chalk.blue("Your Notes:"));
    notes.forEach((note)=> console.log(`- ${note.title}`));
}

// remove notes 
exports.removeNote = async (title)=> {
const notes = await loadNotes();
const filtered = notes.filter((note)=> note.title !== title);
if (filtered.length < notes.length) {
    await saveNotes(filtered);
    console.log(chalk.green("Note removed!"));
} else {
    console.log(chalk.red("Note not found!"));
}
}
