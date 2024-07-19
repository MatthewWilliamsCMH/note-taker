const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const api = require('./routes/index.js');

// const { <process name> } = require("<./helpers/filename>");
// app.use(<constant from above>)

const PORT = process.env.PORT || 3002; //this opens port 3001 and ...
const app = express(); //this assigns "app" to express

//middleware
app.use(express.json()); //processing json files
app.use(express.urlencoded({ extended: true })); //handling urls
app.use("/api", api); //sets up a router to handle requests that being with "api" (which you can see are called in /public/assets/js/index.js)
app.use(express.static("public")); //tell app where to look for files not in the root directory

//get route for home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//get route for notes file
app.get("/notes", (req, res) => { //return notes.html file
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//in this context, ".api" is addresses a router object, not an actual folder on my hard drive
//think of it as a "watched" folder that executes some function when something gets dropped into it
app.get("/api/notes"), (req, res) => { //return db.json file
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
};

app.post("/api/notes"), (req, res) => { //post new note to db.json 
  const { title, text,  } = req.body;
};

// //optional
// //app.delete("./api/notes/:id"), (req, res) => { //optional to delete note from the db and the note iteself
// //   res.delete
// // };

// app.get("./*"), (req, res) => { //return index.html file
//   app.get
// }
app.listen(PORT, () => { 
  console.log(`App listening on port ${PORT}`)
})