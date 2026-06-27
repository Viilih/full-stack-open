import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import notesRouter from './routes/notes.js'
import personsRouter from './routes/persons.js'
import infoRouter from './routes/info.js'

const app = express()

app.use(cors())
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan('tiny', {
  skip: (req) => req.method === 'POST',
}))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: (req) => req.method !== 'POST',
}))

app.use('/api/notes', notesRouter)
app.use('/api/persons', personsRouter)
app.use('/info', infoRouter)

app.get('/', (request, response) => {
  response.send('<h1>Hello Wolrld! </h1>')
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})