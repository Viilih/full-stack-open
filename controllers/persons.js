import { Router } from "express";
import { Person } from "../models/person.js";

const personsRouter = Router();

personsRouter.get("/", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((err) => next(err));
});

personsRouter.get("/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end();
      }

      response.json(person);
    })
    .catch((err) => next(err));
});

personsRouter.delete("/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch((err) => next(err));
});

personsRouter.post("/", (request, response, next) => {
  const { body } = request;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const person = new Person({
    name: body.name,
    phoneNumber: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((err) => next(err));
});

personsRouter.put("/:id", (request, response, next) => {
  const { name, number } = request.body;

  const person = {
    name,
    phoneNumber: number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      if (!updatedPerson) {
        return response.status(404).end();
      }

      response.json(updatedPerson);
    })
    .catch((err) => next(err));
});

export default personsRouter;
