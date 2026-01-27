const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  eventname: {
    type: String,
    required: [true, "Event name is required."],
  },
  description: {
    type: String,
    required: [true, "Description is required."],
  },
  image: {
    type: String,
    default:
      "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-2200.jpg?semt=ais_hybrid&w=740&q=80",
  },
  promoter: {
    type: Schema.Types.ObjectId,
    ref: "Promoter",
    default: null,
  },
  artists: [{
    type: Schema.Types.ObjectId,
    ref: "Artist",
  }],
  date: {
    type: Date,
    required: [true, "Date is required."],
  },
  location: {
    type: String,
    required: [true, "Location is required."],
  },
  price: {
    type: String,
    required: [true, "Price is required."],
  },
  socialmedia: {
    type: String,
  },
  contacts: {
    type: String,
  },
});

module.exports = model("Event", eventSchema);
