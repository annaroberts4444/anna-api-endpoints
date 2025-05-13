const express = require('express')
const router = express.Router()
const MusicSchema = require('../models/Music.js')

router.get('/:id', (req, res) => {
    MusicSchema.findById(req.params.id)
      .then(song => {
        console.log("Successfully got one!");
        console.log(song);
        res.json(song);
      })
      .catch(err => {
        console.error("Error fetching song:", err);
        res.status(500).send("Internal server error");
      });
  });

router.post('/add', (req, res) => {
    const {name, artist, releaseyear} = req.body;
    const newSong = new Song({
        name,
        artist,
        releaseyear
      });
    
      newSong.save()
        .then(() => {
          console.log("we did it!!! are you proud of me?");
          res.status(201).send("User added!");
        })
        .catch(err => {
          console.error(err);
          res.status(500).send("Failed to add user.");
        });
  })

  router.put('/:id', (req, res) => {
    const updates = req.body;
  
    MusicSchema.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
      .then(updatedSong => {
        if (!updatedSong) {
          return res.status(404).send("Song not found");
        }
        console.log("Successfully updated!");
        res.json(updatedSong);
      })
      .catch(err => {
        console.error("Error updating song:", err);
        res.status(500).send("Internal server error");
      });
  });

  router.delete('/:id', (req, res) => {
    MusicSchema.findByIdAndDelete(req.params.id)
      .then(deletedSong => {
        if (!deletedSong) {
          return res.status(404).send("Song not found");
        }
        console.log("Successfully deleted!");
        res.json({ message: "Song deleted", deletedSong });
      })
      .catch(err => {
        console.error("Error deleting song:", err);
        res.status(500).send("Internal server error");
      });
  });