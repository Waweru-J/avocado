const notFoundHandler = (req, res, next) => {
  console.log(`Requested URL: ${req.originalUrl}`);
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.error("Error caught by errorHandler middleware:", err);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

module.exports = { notFoundHandler, errorHandler };
