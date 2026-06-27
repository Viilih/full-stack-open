import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ quiet: true });

const password = process.argv[2];

const connectionString =
  process.env.MONGODB_URI ||
  (password
    ? `mongodb+srv://gnlnascimento:${encodeURIComponent(password)}@cluster0.xmtblus.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
    : undefined);

if (!connectionString) {
  console.error("Missing MongoDB connection string.");
  console.error(
    "Set MONGODB_URI in .env or run this script with the database password as an argument.",
  );
  process.exit(1);
}

mongoose.set("strictQuery", false);

// The connection should always use IPv4 (MongoDB Atlas supports only IPv4)
mongoose
  .connect(connectionString, { family: 4 })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB", error.message);
  });
