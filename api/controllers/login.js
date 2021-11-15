const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body
  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)
  if (!(user && passwordCorrect)) {
    response.status(401).json({
      error: 'invalid user or password'
    })
  }
  const userForToken = { id: user._id, username: user.username }
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 7 // Caduca en 7 dias (60s * 60min * 24h *  7dias)
  })

  // Por defecto el status es un 200 OK y no hace falta indicar hacer el response.status(200)
  response.send({ name: user.name, username: user.username, token })
})

module.exports = loginRouter
