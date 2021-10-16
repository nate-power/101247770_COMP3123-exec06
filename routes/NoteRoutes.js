const express = require('express');
const noteModel = require('../models/NotesModel');
const app = express();

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save

app.post('/notes', async (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to save the note
    
    try {
        const note = new noteModel(req.body)
        await note.save();
        res.send("Note Saved!\n" + note );
        } catch (err) {
        res.status(500).send(err);
        }
    
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
app.get('/notes', async (req, res) => {
    // don't need to check req.body for this

    //TODO - Write your code here to returns all note    
    try {
        const notes = await noteModel.find({});
        res.send(notes);
      } catch (err) {
        res.status(500).send(err);
      }
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
app.get('/notes/:noteId', async (req, res) => {
    // don't need to check req.body for this

    //TODO - Write your code here to return onlt one note using noteid
    try {
        const note = await noteModel.find({_id: req.params.noteId})
        res.send(note);
      } catch (err) {
        res.status(500).send(err);
      }
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
app.put('/notes/:noteId', async (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to update the note using noteid    
    try {
        delete req.body.dateAdded; // dont update dateAdded
        const note = await noteModel.findByIdAndUpdate(req.params.noteId, req.body);
        res.send(note);
      } catch (err) {
        res.status(500).send(err);
      }
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
app.delete('/notes/:noteId', async (req, res) => {
    // don't need to check req.body for this

    //TODO - Write your code here to delete the note using noteid    
    try {
        const note = await noteModel.findByIdAndDelete(req.params.noteId)
        if (!note) {
            res.status(404).send("No note found!");
        }
        res.status(200).send("Note deleted\n" + note);
      } catch (err) {
        res.status(500).send(err);
      }
});

module.exports = app;