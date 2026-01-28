require("dotenv").config();
require("./db");

const express = require("express");

const app = express();

require("./config")(app);

// Routes
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
const artistsRoutes = require("./routes/artists.routes");
app.use("/artists", artistsRoutes);
const eventsRoutes = require("./routes/events.routes");
app.use("/events", eventsRoutes);
const promotersRoutes = require("./routes/promoters.routes");
app.use("/promoters", promotersRoutes);

require("./error-handling")(app);

module.exports = app;
