const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// GET Route for retrieving all the notes
notes.get('/', (req, res) =>
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  })
);

// POST Route for saving new note
notes.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title: title,
      text: text,
      id: uuidv4(),
    };

    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      let oldNotes = JSON.parse(data);
      oldNotes.push(newNote);
      const oldNotesString = JSON.stringify(oldNotes, null, 4);
      updatedNotes(oldNotesString);
    })

    function updatedNotes(oldNotesString) {
      fs.writeFile('./db/db.json', oldNotesString, (err) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log('\nFile Contents of file after append:',
            fs.readFileSync('./db/db.json', 'utf8'));
        }
      });
    }
    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

// DELETE Route for deleting a note
notes.delete('/:id', (req, res) => {
  // Variable assignment to hold id value
  let id = req.params.id;

  if (id) {
    // Read database and remove selected entry from the array
    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      let allNotes = JSON.parse(data);
      for (let i = 0; i < allNotes.length; i++) {
        if (allNotes[i].id === id) {
          allNotes.splice(i, 1);
        }
      }
      // Stringify new array and pass to updatedNotes function
      const updatedString = JSON.stringify(allNotes, null, 4);
      updatedNotes(updatedString);
    })

    // Write file for updated notes following deletion
    function updatedNotes(updatedString) {
      fs.writeFile('./db/db.json', updatedString, (err) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log('\nFile Contents of file after append:',
            fs.readFileSync('./db/db.json', 'utf8'));
        }
      });
    }

    const response = {
      status: 'success'
    };

    res.json(response);
  } else {
    res.json('Error in deleting note');
  }
});

module.exports = notes;