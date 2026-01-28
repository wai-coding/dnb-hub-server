const { Schema, model } = require("mongoose");

const promoterSchema = new Schema({
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
  socialmedia: {
    type: String,
  },
  contacts: {
    type: String,
  },
  tickets: {
    type: String,
  },
});

module.exports = model("Promoter", promoterSchema);
