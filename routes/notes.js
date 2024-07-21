const notes = require("express").Router();
const uuid = require("../helpers/uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// GET Route for retrieving all the notes
//Not sure why we can just type "/" here and in the post route below
notes.get("/", (req, res) =>
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting a note
notes.post("/", (req, res) => {
  //The data returned by the request is in json (?) format, so this line destructures the requested object in the json file
  // and assignes its properties to the variables "title" and "text."
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid()
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Failed to post note.");
  }
});

//In this context, ".api" addresses a router object (the notes.js file inside routes), not an actual folder on my hard drive. Think of it as
//a "watched" folder that executes one or more functions when data gets dropped into it.
//SERVER: "I just got a request for '/api/notes.' That's not a real folder, it's a file with functions to execute. From that file, execute the
//readFromFile function, process it, and return the data to the client."
notes.get("/notes", (req, res) => { //return db.json file
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//I left this in because I think it's close. ChatGPT, however, doesn't seem to be able to diagnose why my Request URL is 
//"http://localhost:3001/api/notes/0c10." I belive that the handler is treating the id of the object i'm trying to delete
//as part of the url.

//optional
// notes.delete("/api/notes/:id", (req, res) => { //optional to delete note from the db and the note iteself
//   const {id} = req.params;
//   const data = readFromFile("./db/db.json");
//   const notes = JSON.parse(data);
  
//   const filteredNotes = data.filter(note => note.id !== id);
//   writeToFile("./db/db.json", filteredNotes);
//   res.json(filteredNotes);
// });

module.exports = notes;
