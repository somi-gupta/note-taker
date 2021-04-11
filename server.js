// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// html routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html'))); 
// these first app.get requests are for the html pages
app.get("/assets/css/styles.css", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"));
  });
  
  app.get("/assets/js/index.js", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
  });
  
  app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
  });
  
  app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

let dataFilePath = ('./db/db.json');
let data = fs.readFileSync(dataFilePath);
let dataEl = JSON.parse(data);


// api routes
app.get('/api/notes', (req, res) => {res.send(dataEl)})
app.post('/api/notes', (req,res) => {
  const newNote = req.body;
  const newID = uuidv4()
  const val = "id";
  newNote[val]=newID;
  console.log(newNote);
  dataEl.push(newNote);
  let parsedNewNote = JSON.stringify(dataEl, null, 2);
  fs.writeFile(dataFilePath, parsedNewNote, (err) => err ? console.log(err) : console.log('Success!')) 
  res.send(dataEl)
})
app.delete('/api/notes/:id',(req, res) => { dataEl
  const idEl = req.params.id 
  var index = dataEl.indexOf(idEl);
  dataEl.splice(index);
  res.send("Deleted")
  })

//listening to PORT
  app.listen(PORT, function () {
    console.log('Express server listening');
});
  