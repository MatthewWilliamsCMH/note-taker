const express = require("express");
const path = require('path');
const fs = require("fs/promises");
const api = require('./routes/index.js');
// const { <process name> } = require("<./helpers/filename>");
// app.use(<constant from above>)

const PORT = process.env.PORT || 3001; //this opens port 3001 and ...
const app = express(); //this assigns "app" to express

//middleware
app.use(express.json()); //processing json files
app.use(express.urlencoded({ extended: true })); //handling urls
app.use("./api", api);

app.use(express.static("public")); //tell app where to look for files not in the root directory

//routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//move these into the routes folder
app.get("./notes"), (req, res) => { //return notes.html file
  res.sendFile(path.join(__dirname, "./public.notes.html"));
};

app.get("./api/notes"), (req, res) => { //return db.json file
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
};

app.post("./api/notes"), (req, res) => { //post new note to db.json
//get real variables for this
  const { email, feedbackType, feedback } = req.body;
};

//optional
//app.delete("./api/notes/:id"), (req, res) => { //optional to delete note from the db and the note iteself
//   res.delete
// };

app.get("./*"), (req, res) => { //return index.html file
  app.get
}
app.listen(PORT, () => console.log(`App listening on port ${PORT}`))