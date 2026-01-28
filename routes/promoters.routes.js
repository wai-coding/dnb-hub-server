const router = require("express").Router();
const PromoterModel = require("../models/Promoter.model");
const { isAuthenticated } = require("../middlewares/jwt.middleware");

//route to create a new promoter (/create)
router.post("/create", isAuthenticated, (req, res) => {
  if (req.body.image && req.body.image.trim() === "") {
    delete req.body.image;
  }
  PromoterModel.create(req.body)
    .then((promoterCreated) => {
      res.status(201).json({
        message: "Promoter created successfully!",
        data: promoterCreated,
      });
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: err });
    });
});

//Route to get all promoters (/)
router.get("/", async (req, res) => {
  try {
    const data = await PromoterModel.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
});

// Route to get a specific promoter by id (/:promoterId)
router.get("/:promoterId", async (req, res) => {
  try {
    const foundOnePromoter = await PromoterModel.findById(req.params.promoterId);
    console.log("Promoter found", foundOnePromoter);
    res.status(200).json(foundOnePromoter);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: err });
  }
});

//Route to update a specific promoter by id (/:promoterId)
router.put("/:promoterId", isAuthenticated, (req, res) => {
  const { promoterId } = req.params;
  if (req.body.image && req.body.image.trim() === "") {
    delete req.body.image;
  }
  PromoterModel.findByIdAndUpdate(promoterId, req.body, { new: true })
    .then((updatedPromoter) => {
      console.log("Promoter updated", updatedPromoter);
      res.status(200).json(updatedPromoter);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});

//Route to delete a specific promoter by id (/:promoterId)
router.delete("/:promoterId", isAuthenticated, (req, res) => {
  PromoterModel.findByIdAndDelete(req.params.promoterId)
    .then((data) => {
      console.log("Promoter deleted", data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err });
    });
});

module.exports = router;

