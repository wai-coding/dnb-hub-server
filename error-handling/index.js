module.exports = (app) => {
  // 404 handler
  app.use((req, res, next) => {
    res.status(404).json({ message: "This route does not exist" });
  });

  // Global error handler
  app.use((err, req, res, next) => {
    console.error("ERROR", req.method, req.path, err);

    if (!res.headersSent) {
      res
        .status(500)
        .json({
          message: "Internal server error. Check the server console",
        });
    }
  });
};
