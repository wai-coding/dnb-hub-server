const { Schema, model } = require("mongoose");

const artistSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
    unique: true,
  },
  bio: {
    type: String,
    required: [true, "Bio is required."],
  },
  image: {
    type: String,
  },
  bookings: {
    type: String,
  },
  socialmedia: {
    type: String,
  },
  promomix: {
    type: String,
  },
  promosong: {
    type: String,
  },
});

module.exports = model("Artist", artistSchema);
