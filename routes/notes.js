const notes = require("express").Router();
const uuid = require("../helpers/uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// GET Route for retrieving all the notes
notes.get("/", (req, res) =>
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting a note
notes.post("/", (req, res) => {
  // Destructuring assignment for the items in req.body (to clarify, the request includes 
  //the body [which includes the data from the form] and assigns it to variables "title" and "text")
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

module.exports = notes;
