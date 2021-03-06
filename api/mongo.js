const mongoose = require('mongoose')
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

// conexion to MongoDB
mongoose
  .connect(connectionString)
  .then(() => {
    console.log('Database Connected!')
  })
  .catch((err) => {
    console.error(err)
  })

process.on('uncaughtException', (error) => {
  console.error(error)
  mongoose.disconnect()
})
