const router = require("express").Router();
const EventModel = require("../models/Event.model");

//route to create a new event (/create)
router.post("/create", (req, res) => {
  EventModel.create(req.body)
    .then((eventCreated) => {
      res
        .status(201)
        .json({ message: "Event created successfully!", data: eventCreated });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err });
    });
});

//Route to get all events (/)
router.get("/", async (req, res) => {
  try {
    const data = await EventModel.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
});

// Route to get a specific event by id (/:eventId)
router.get("/:eventId", async (req, res) => {
  try {
    const foundOneEvent = await EventModel.findById(req.params.eventId);
    console.log("Event found", foundOneEvent);
    res.status(200).json(foundOneEvent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

//Route to update a specific event by id (/:eventId)
router.put("/:eventId", (req, res) => {
  const { eventId } = req.params;
  EventModel.findByIdAndUpdate(eventId, req.body, { new: true })
    .then((updatedEvent) => {
      console.log("Event updated", updatedEvent);
      res.status(200).json(updatedEvent);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});

//Route to delete a specific event by id (/:eventId)
router.delete("/:eventId", (req, res) => {
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
