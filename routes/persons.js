import { Router } from 'express'
import {
  addPerson,
  findPersonById,
  generatePersonId,
  getPhoneBook,
  removePerson,
} from '../data.js'

const personsRouter = Router()

personsRouter.get('/', (request, response) => {
  response.json(getPhoneBook())
})

personsRouter.get('/:id', (request, response) => {
  const phoneBookEntity = findPersonById(request.params.id)

  if (!phoneBookEntity) {
    return response.status(404).json({ error: 'The phonebook was not found' })
  }

  response.json(phoneBookEntity)
})

personsRouter.delete('/:id', (request, response) => {
  removePerson(request.params.id)
  response.status(204).end()
})

personsRouter.post('/', (request, response) => {
  const { body } = request

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const existingName = getPhoneBook().find((person) => person.name === body.name)

  if (existingName) {
    return response.status(400).json({
      error: 'Name already exists',
    })
  }

  const phone = {
    id: generatePersonId(),
    name: body.name,
    number: body.number,
  }

  addPerson(phone)
  response.json(phone)
})

export default personsRouter