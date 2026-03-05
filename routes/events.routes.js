const router = require("express").Router();
const mongoose = require("mongoose");
const EventModel = require("../models/Event.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

// POST /create
router.post("/create", isAuthenticated, (req, res) => {
  const eventData = { ...req.body };
  if (eventData.promoter === "") {
    eventData.promoter = null;
  }
  if (eventData.image && eventData.image.trim() === "") {
    delete eventData.image;
  }
  EventModel.create(eventData)
    .then((eventCreated) => {
      res
        .status(201)
        .json({ message: "Event created successfully!", data: eventCreated });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err });
    });
});

// GET /
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.artistId) {
      if (!mongoose.Types.ObjectId.isValid(req.query.artistId)) {
        return res.status(400).json({ message: "Invalid artistId" });
      }
      filter.artists = req.query.artistId;
    }
    if (req.query.promoterId) {
      if (!mongoose.Types.ObjectId.isValid(req.query.promoterId)) {
        return res.status(400).json({ message: "Invalid promoterId" });
      }
      filter.promoter = req.query.promoterId;
    }
    const data = await EventModel.find(filter).populate("promoter").populate("artists");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
});

// GET /:eventId
router.get("/:eventId", async (req, res) => {
  try {
    const foundOneEvent = await EventModel.findById(req.params.eventId).populate("promoter").populate("artists");
    console.log("Event found", foundOneEvent);
    res.status(200).json(foundOneEvent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

// PUT /:eventId
router.put("/:eventId", isAuthenticated, (req, res) => {
  const { eventId } = req.params;
  const eventData = { ...req.body };
  if (eventData.promoter === "") {
    eventData.promoter = null;
  }
  if (eventData.image && eventData.image.trim() === "") {
    delete eventData.image;
  }
  EventModel.findByIdAndUpdate(eventId, eventData, { new: true })
    .populate("promoter")
    .populate("artists")
    .then((updatedEvent) => {
      console.log("Event updated", updatedEvent);
      res.status(200).json(updatedEvent);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});

// DELETE /:eventId
router.delete("/:eventId", isAuthenticated, (req, res) => {
  EventModel.findByIdAndDelete(req.params.eventId)
    .then((data) => {
      console.log("Event deleted", data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});

module.exports = router;
