import { Router } from 'express'
import { getPhoneBook } from '../data.js'

const infoRouter = Router()

infoRouter.get('/', (request, response) => {
  const currentDate = new Date()

  response.send(`
    <h3>Phonebook has info for ${getPhoneBook().length}</h3>
    <p>${currentDate.toLocaleDateString('pt-BR')}</p>
  `)
})

export default infoRouter