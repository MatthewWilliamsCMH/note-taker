const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const api = require("./routes/index.js");

//opens port 3001; process.env.PORT gets a port number from the environment in case a port other than 3001 is required in that environment
const PORT = process.env.PORT || 3001; 

//this creates an instance of express, "app", to give us access to its properties and methods
const app = express();

//middleware; the three below work on every route
app.use(express.json()); //allows express to understand json data in a request and puts it in a req.body
app.use(express.urlencoded({ extended: true })); //enables express to parse the query params in a url
app.use(express.static("public")); //tells "app" where to look for files not in the root directory; everything in this folder is visible 

//sets up a router to handle requests that begin with "api"
app.use("/api", api);

//GET route for notes.html file
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//wildcard handler for routes not found
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => { 
  console.log(`App listening on port ${PORT}`);
})