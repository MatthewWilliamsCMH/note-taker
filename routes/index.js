const router = require("express").Router();

// Import our modular router ([)where the paths for the /api/ requests are stored)for /notes
const notesRouter = require("./notes");

router.use("/notes", notesRouter);

module.exports = router;
