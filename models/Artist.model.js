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
    default:
      "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2200.jpg?semt=ais_hybrid&w=740&q=80",
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
