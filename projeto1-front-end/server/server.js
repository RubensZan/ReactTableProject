const express = require('express')
const cors = require('cors');
const app = express();

// const router = express.Router(); 
// const bodyParser = require('body-parser')
const port = 3010;
const users_route = require("./routes/users")
const products_route = require("./routes/products")

app.use(cors()); 

app.get('/', (req, res) => {
  res.send('Hey yo go!!!')
})

//users routes
users_route(app);
products_route(app); 



app.listen(port, () => {
  console.log(`Nodemon listening at http://localhost:${port}`)
})