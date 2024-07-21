const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const api = require("./routes/index.js");

const PORT = process.env.PORT || 3001; //this opens port 3001 and ...
const app = express(); //this assigns "app" to express

//middleware I'm not sure I get why this is middleware. Is it because the app.use("/api", api) statement "opens" the "virtual folder" called api, 
//the routes to which are stored in another module (i.e. notest.js)? Why are .json and .urlencoded middleware? because they're functions (albeit
//functions that are built in to express) that perform some function on data before it is returned to the client?
app.use(express.json()); //massages json files into a form that express can use
app.use(express.urlencoded({ extended: true })); //encodes urls so express can read them (replaces spaces, extended chars, etc. with unicode vals.)
app.use("/api", api); //sets up a router to handle requests that being with "api" (which you can see are called in /public/assets/js/index.js)
app.use(express.static("public")); //tells "app" where to look for files not in the root directory; it's a kind of failsafe

//GET route for notes.html file
//SERVER: "I just got a request for '/public/notes.html'. Join my root path to that file's path, get the file, and send its contents 
//back to the client."
app.get("/notes", (req, res) => { //return notes.html file
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//SERVER: "Hey. I just got a request for a file that I can't find. Let's just send the client the homepage at index.html."
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => { 
  console.log(`App listening on port ${PORT}`);
})