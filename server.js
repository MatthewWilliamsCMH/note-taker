//p/u from activity 25; remove what you don't need
const express = require("express");
const fs = require("fs/promises");
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

//move these into the routes folder
app.get("./notes"), (req, res) => { //return notes.html file
  res.get
}

app.get("./api/notes"), (req, res) => { //return db.json file
  res.get
}

app.post("./api/notes"), (req, res) => { //post new note to db.json

app.delete("./api/notes/:id"), (req, res) => { //optional to delete note from the db and the note iteself

}

}

app.get("./*"), (req, res) => { //return index.html file

}
app.listen(PORT, () => console.log(`App listening on port ${PORT}`))