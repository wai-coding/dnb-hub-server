const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173";

module.exports = (app) => {
  // Required for proxy hosting (Heroku, etc.)
  app.set("trust proxy", 1);

  app.use(
    cors({
      credentials: true,
      origin: [FRONTEND_URL]
    })
  );

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
