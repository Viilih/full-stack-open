let notes = [
  {
    id: '1',
    content: 'HTML is easy',
    important: true,
  },
  {
    id: '2',
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: '3',
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
]

let phoneBook = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

const generateId = (items) => {
  const maxId = items.length > 0
    ? Math.max(...items.map((item) => Number(item.id)))
    : 0

  return String(maxId + 1)
}

export const getNotes = () => notes

export const findNoteById = (id) => notes.find((note) => note.id === id)

export const addNote = (note) => {
  notes = notes.concat(note)
  return note
}

export const removeNote = (id) => {
  notes = notes.filter((note) => note.id !== id)
}

export const generateNoteId = () => generateId(notes)

export const getPhoneBook = () => phoneBook

export const findPersonById = (id) => phoneBook.find((person) => person.id === id)

export const addPerson = (person) => {
  phoneBook = phoneBook.concat(person)
  return person
}

export const removePerson = (id) => {
  phoneBook = phoneBook.filter((person) => person.id !== id)
}

export const generatePersonId = () => generateId(phoneBook)