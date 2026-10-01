const fs = require('fs');

// Fetch existing notes safely
const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync('notes-data.json', 'utf8');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

// Save notes to JSON file
const saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes, null, 2));
};

// Add a new note
const addNote = (title, body) => {
  const notes = fetchNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    const note = { title, body };
    notes.push(note);
    saveNotes(notes);
    return note;
  }
  return null;
};

// Get all notes
const getAll = () => {
  return fetchNotes();
};

// Read a single note by title
const getNote = (title) => {
  const notes = fetchNotes();
  return notes.find((note) => note.title === title);
};

// Remove a note by title
const removeNote = (title) => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);
  return notes.length !== filteredNotes.length;
};

// Helper function to format note output
const logNote = (note) => {
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};