const express = require('express')
const router = express.Router(); 
const bodyParser = require('body-parser')
const app = express()
const port = 3010

const users_route = require("./routes/users")


app.get('/', (req, res) => {
  res.send('Hey yo go!!!')
})

//users routes
users_route(app);


app.listen(port, () => {
  console.log(`Nodemon listening at http://localhost:${port}`)
})