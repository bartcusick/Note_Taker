var fs = require('fs');
var path = require("path");


module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    //Gets the .json data
    res.sendFile(path.join(__dirname, "../db/db.json"));
  });

  app.post("/api/notes", function(req,res){
    var notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    console.log("These are my notes: ", notes);
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
    var newNote = req.body;
    
    var newNoteId = (notes.length).toString();
    newNote.id = newNoteId;
    //Add the new note
    notes.push(newNote);
    
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    console.log("I added a new note: ", newNote);
    res.json(notes);

  });

  app.delete("/api/notes/:id", function(req,res){
    console.log("Deleting Note");
    var notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    var newNoteId = req.params.id;
    var newId = 0;
    notes = notes.filter(currentNote => {
      return currentNote.id != newNoteId;
    })
    for(currentNote of notes){
      currentNote.id = newId.toString();
      newId++;
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json(notes);
    console.log("Note Deleted!");
  });
}