const express = require ('express');
const path = require ('path');
const fs = require ('fs');

const app = express();
const PORT = process.env.PORT || 3002;
const myPath = path.join(__dirname, './public');

app.use (express.urlencoded({extended: true}));
app.use (express.json());
app.use(express.static('public'));



app.get ('/notes', (req, res) =>{
    res.sendFile(path.join(myPath, 'notes.html'));
});

app.get ('/api/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, '/db/db.json'));
});


app.get('/api/notes/:id', (req, res) =>{
    let savedText = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(savedText[Number(req.params.id)]);
    
}); 


app.get ('*', (req, res) =>{
    res.sendFile(path.join (__dirname, 'index.html'))
});

app.post('/api/notes', (req, res) =>{
    let savedText = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let newText = req.body;
    let newID = (savedText.length).toString();
    newText.id = newID;
    savedText.push(newText);

    fs.writeFileSync('./db/db.json', JSON.stringify(savedText));
    res.json(savedText);
});

app.delete ('/api/notes/:id', (req, res) =>{
    let savedText = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let textID = req.params.id;
    let newID = 0;
    console.log(`Deleting note ${textID}`)
    savedText = savedText.filter(myNote =>{
        return myNote.id != textID;
    })

        for (myNote of savedText) {
        myNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync('./db/db.json', JSON.stringify(savedText));
    res.json(savedText);
})

app.listen(PORT, () => {
    console.log (`Listening to localhost on port ${PORT}. Thanks for visiting!`)
})