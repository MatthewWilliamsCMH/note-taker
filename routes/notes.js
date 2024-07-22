const router = require("express").Router();
const uuid = require("../helpers/uuid");
const { readAndAppend, readFromFile, writeToFile } = require("../helpers/fsUtils");

// GET Route for retrieving all the notes
//The slash is just the terminator for the path that's been built by the earlier calls
router.get("/", (req, res) =>
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting a note
router.post("/", (req, res) => {
  //destructures the requested data in the json file and assigns its properties to the variables "title" and "text."
  const { title, text } = req.body;

  if (title && text) {
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

//optional
// router.delete("/:id", (req, res) => {
//   const id = req.params["id"];

//   const data = readFromFile("./db/db.json");
//   const notes = JSON.parse(data);
  
//   const filteredNotes = notes.filter(note => note.id !== id);
//   writeToFile("./db/db.json", filteredNotes);
//   res.json(filteredNotes);
// });

module.exports = router;