const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// GET Route for retrieving all the notes
notes.get('/', (req, res) =>
  fs.readFileSync('../db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
notes.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title: title,
      text: text,
      noteId: uuidv4(),
    };

    fs.appendFile(newNote, )
    readAndAppend(newNote, '../db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

module.exports = fb;