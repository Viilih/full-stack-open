import { Router } from "express";
import { Phonebook } from "../database/schemas/pbSchema.js";

const personsRouter = Router();

personsRouter.get("/", (request, response, next) => {
  Phonebook.find({})
    .then((phonebooks) => {
      response.json(phonebooks);
    })
    .catch((err) => next(err));
});

personsRouter.get("/:id", (request, response, next) => {
  Phonebook.findById(request.params.id)
    .then((pb) => {
      if (!pb) {
        return response.status(404).end();
      }

      response.json(pb);
    })
    .catch((err) => next(err));
});

personsRouter.delete("/:id", (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then((result) => response.status(204).end())
    .catch((err) => next(err));
});

personsRouter.post("/", (request, response, next) => {
  const { body } = request;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  // Fazer depois essa verificação

  //const existingName = getPhoneBook().find((person) => person.name === body.name)

  // if (existingName) {
  //   return response.status(400).json({
  //     error: 'Name already exists',
  //   })
  // }

  const phoneBook = new Phonebook({
    name: body.name,
    phoneNumber: body.number,
  });

  phoneBook
    .save()
    .then((savedPhonebook) => {
      response.json(savedPhonebook);
    })
    .catch((err) => next(err));
  // const phone = {
  //   id: generatePersonId(),
  //   name: body.name,
  //   number: body.number,
  // }
});

export default personsRouter;
