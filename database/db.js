import mongoose from "mongoose";
import { MONGODB_URI } from "../utils/config.js";
import logger from "../utils/logger.js";

if (!MONGODB_URI) {
  logger.error("Missing MongoDB connection string.");
  logger.error(
    "Set MONGODB_URI in .env or run this script with the database password as an argument.",
  );
  process.exit(1);
}

mongoose.set("strictQuery", false);

// The connection should always use IPv4 (MongoDB Atlas supports only IPv4)
mongoose
  .connect(MONGODB_URI, { family: 4, serverSelectionTimeoutMS: 10000 })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB", error.message);
  });
