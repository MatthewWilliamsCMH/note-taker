const router = require("express").Router();

//import the router (where the paths for the /api requests are stored)for /notes)
const notesRouter = require("./notes.js");

//set up "/notes" as the address; "/notes" comes from the url; "./notes" above is the file
router.use("/notes", notesRouter);

module.exports = router;
