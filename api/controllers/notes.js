const notesRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const Note = require('../models/Note')
const User = require('../models/User')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  response.json(notes)
})

notesRouter.post('/', userExtractor, async (request, response, next) => {
  const { content, important = false } = request.body
  const { userId } = request
  const user = await User.findById(userId)
  if (!content) {
    return response.status(400).json({
      error: 'required "content" field is missing'
    })
  }
  const newNote = new Note({
    content,
    date: new Date(),
    important,
    user: user._id
  })
  try {
    const savedNote = await newNote.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    response.json(savedNote)
  } catch (error) {
    next(error)
  }
})

notesRouter.get('/:id', (request, response, next) => {
  const { id } = request.params
  Note.findById(id)
    .then((note) => {
      return note ? response.json(note) : response.status(404).end()
    })
    .catch((err) => {
      next(err)
    })
})

notesRouter.put('/:id', userExtractor, (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then((result) => {
    response.json(result)
  })
})

notesRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params

  await Note.findByIdAndDelete(id)
  response.status(204).end()
})

module.exports = notesRouter
