import dotenv from "dotenv";

dotenv.config({ quiet: true });

const password = process.argv[2];

export const PORT = process.env.PORT || 3001;

export const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
