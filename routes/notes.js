import { Router } from 'express'
import {
  addNote,
  findNoteById,
  generateNoteId,
  getNotes,
  removeNote,
} from '../data.js'

const notesRouter = Router()

notesRouter.get('/', (request, response) => {
  response.json(getNotes())
})

notesRouter.get('/:id', (request, response) => {
  const note = findNoteById(request.params.id)

  if (!note) {
    return response.status(404).json({ error: 'The resource was not found!' })
  }

  response.json(note)
})

notesRouter.delete('/:id', (request, response) => {
  removeNote(request.params.id)
  response.status(204).end()
})

notesRouter.post('/', (request, response) => {
  const { body } = request

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateNoteId(),
  }

  addNote(note)
  response.json(note)
})

export default notesRouter