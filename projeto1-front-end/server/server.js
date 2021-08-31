const express = require('express')
const router = express.Router(); 
const app = express()
const port = 3010

app.get('/', (req, res) => {
  res.send('Hey yo go!!!')
})

app.listen(port, () => {
  console.log(`Example nodemon listening at http://localhost:${port}`)
})