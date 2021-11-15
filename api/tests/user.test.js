const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { server } = require('../index')
const User = require('../models/User')
const { api, getUsers } = require('./helpers')

describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)

    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('works as expected creating a fresh username', async () => {
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'BaKaLLa',
      name: 'Jordi',
      password: 'tw1tch'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const usersAtEnd = await getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })
  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await getUsers()
    const newUser = {
      username: 'root',
      name: 'pepito',
      password: 'testing'
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)

    expect(result.body.error.errors.username.message).toContain(
      '`username` to be unique'
    )
    const usersAtEnd = await getUsers()
    expect(usersAtStart).toHaveLength(usersAtEnd.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
