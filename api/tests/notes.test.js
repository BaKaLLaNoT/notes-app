const mongoose = require('mongoose')

const { server } = require('../index')
const Note = require('../models/Note')
const { initialNotes, api, getAllContentFromNotes } = require('./helpers')

beforeEach(async () => {
  await Note.deleteMany({})

  for (const note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
  const { response } = await getAllContentFromNotes()
  expect(response.body).toHaveLength(initialNotes.length)
})

test('the first note is about first note', async () => {
  const { content } = await getAllContentFromNotes()
  expect(content).toContain('Primera Nota')
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'Proximamente async/await',
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const { content, response } = await getAllContentFromNotes()
  expect(response.body).toHaveLength(initialNotes.length + 1)
  expect(content).toContain(newNote.content)
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api.post('/api/notes').send(newNote).expect(400)

  const { response } = await getAllContentFromNotes()
  expect(response.body).toHaveLength(initialNotes.length)
})

test('a note can be deleted', async () => {
  const { response: firstResponse } = await getAllContentFromNotes()
  const { body: notes } = firstResponse
  const noteToDelete = notes[0]
  await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

  const { contents, response: secondResponse } = await getAllContentFromNotes()
  expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
  expect(contents).not.toContain(noteToDelete.content)
})

test('a note that do not exist can not be deleted', async () => {
  jest.setTimeout(10000)
  await api.delete('/api/notes/1234').expect(400)
  const { response } = await getAllContentFromNotes()
  expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
