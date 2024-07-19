const nt = require("express").Router();
// const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// GET Route for retrieving all the feedback
nt.get("/", (req, res) =>
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting note
nt.post("/", (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      // id: uuidv4()
    };

    readAndAppend(newNote, "./db/db.json");  //should this be ../db/db.json?

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Failed to post note.");
  }
});

module.exports = nt;
