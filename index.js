const express = require('express')
const app = express()
const port = process.env.APP_PORT || 8080
const router = require('./app/router')

app.use(express.json())

app.use('/api', router);
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

module.exports = app;