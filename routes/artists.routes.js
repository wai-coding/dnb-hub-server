const router = require("express").Router();
const ArtistModel = require("../models/Artist.model");

//Route to create a new artist (/create)
router.post("/create", (req, res) => {
  ArtistModel.create(req.body)
    .then((artistCreated) => {
      res
        .status(201)
        .json({ message: "Artist created successfully!", data: artistCreated });
    })
    .catch((err) => {
      res.status(500).json({ errorMesage: err });
    });
});

//Route to get all artists (/)
router.get("/", async (req, res) => {
  try {
    const data = await ArtistModel.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
});

// Route to get a specific artist by id (/:artistId)
router.get("/:artistId", async (req, res) => {
  try {
    const foundOneArtist = await ArtistModel.findById(req.params.artistId);
    console.log("Artist found", foundOneArtist);
    res.status(200).json(foundOneArtist);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

//Route to update a specific artist by id (/:artistId)
router.put("/:artistId", (req, res) => {
  const { artistId } = req.params;
  ArtistModel.findByIdAndUpdate(artistId, req.body, { new: true })
    .then((updatedArtist) => {
      console.log("Artist updated", updatedArtist);
      res.status(200).json(updatedArtist);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});

//Route to delete a specific artist by id (/:artistId)
router.delete("/:artistId", (req, res) => {
  ArtistModel.findByIdAndDelete(req.params.artistId)
    .then((data) => {
      console.log("Artist deleted", data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});

module.exports = router;
