const router = require("express").Router();
const ArtistModel = require("../models/Artist.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

// POST /create
router.post("/create", isAuthenticated, (req, res) => {
  if (req.body.image && req.body.image.trim() === "") {
    delete req.body.image;
  }
  ArtistModel.create(req.body)
    .then((artistCreated) => {
      res
        .status(201)
        .json({ message: "Artist created successfully!", data: artistCreated });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err });
    });
});

// GET /
router.get("/", async (req, res) => {
  try {
    const data = await ArtistModel.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
});

// GET /:artistId
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

// PUT /:artistId
router.put("/:artistId", isAuthenticated, (req, res) => {
  const { artistId } = req.params;
  if (req.body.image && req.body.image.trim() === "") {
    delete req.body.image;
  }
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

// DELETE /:artistId
router.delete("/:artistId", isAuthenticated, (req, res) => {
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
