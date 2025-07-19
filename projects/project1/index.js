const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const chalk = require('chalk');
const notes = require('./notes');

const argv = yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "Add A New Note",
    builder: {
      title: {
        describe: "Note Title",
        demandOption: true,
        type: 'string'
      },
      body: {
        describe: "Note body",
        demandOption: true,
        type: "string",
      }
    },
    handler(argv){
      notes.addNotes(argv.title, argv.body);
    }
  })
  .command({
    command: "list",
    describe: "List all notes",
    handler() {
      notes.listNotes();
    },
  })
  .command({
    command: "remove",
    describe: "Remove a note",
    builder: {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      notes.removeNote(argv.title);
    },
  })
  .help()
  .parse();  // don't forget this!
