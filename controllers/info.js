import { Router } from "express";
import { Person } from "../models/person.js";

const infoRouter = Router();

infoRouter.get("/", (request, response, next) => {
  const currentDate = new Date();

  Person.countDocuments({})
    .then((personCount) => {
      response.send(`
        <h3>Phonebook has info for ${personCount}</h3>
        <p>${currentDate.toLocaleDateString("pt-BR")}</p>
      `);
    })
    .catch((err) => next(err));
});

export default infoRouter;
