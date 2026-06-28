import cors from "cors";
import express from "express";
import morgan from "morgan";
import "./database/db.js";
import infoRouter from "./controllers/info.js";
import notesRouter from "./controllers/notes.js";
import personsRouter from "./controllers/persons.js";
import {
  errorHandler,
  unknownEndpoint,
  requestLogger,
} from "./utils/middleware.js";
import blogRouter from "./controllers/blog.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/notes", notesRouter);
app.use("/api/persons", personsRouter);
app.use("/api/blogs", blogRouter);
app.use("/info", infoRouter);

app.get("/", (request, response) => {
  response.send("<h1>Hello Wolrld! </h1>");
});

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
