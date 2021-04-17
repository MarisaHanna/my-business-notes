const express = require ('express');
const path = require ('path');
const fs = ('fs');

const app = express();
const PORT = process.env.PORT || 3050;


app.use (express.urlencoded({extended: true}));
app.use (express.json());


app.get ('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, 'notes.html'));
});

app.get ('/api/notes', (req, res) =>{
    res.sendFile(path.join(_dirname, '/db/db.json'));
});


app.post('/api/notes', (req, res) =>{
    let savedText = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(savedText[Number(req.params.id)]);
}); 


app.post('/api/notes', (req, res) =>{
    let savedText = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let newText = req.body;
    let newID = (savedText.lenght).toString();
    newText.id = newID;
    savedText.push(newText);

    fs.writeFileSync('./db/db.json', JSON.stringify(savedText));
    res.json(savedText);
});

app.listen(PORT, () => {
    console.log (`Listening to localhost on port ${PORT}. Thanks for visiting!`)
})