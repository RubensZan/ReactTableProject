const express = require('express')
const cors = require('cors');
const app = express();

// const router = express.Router(); 
// const bodyParser = require('body-parser')
const port = 3010;
const users_route = require("./routes/users")
const products_route = require("./routes/products")
const usersCars_route = require("./routes/usersCars")
const usersAccess_route = require("./routes/usersAccess")
const productsConsumers_route = require("./routes/productsUsers")

app.use(cors()); 

app.get('/', (req, res) => {
  res.send('Hey yo go!!!')
})

//users routes
users_route(app);
products_route(app); 
usersCars_route(app); 
productsConsumers_route(app);
usersAccess_route(app); 


app.listen(port, () => {
  console.log(`Nodemon listening at http://localhost:${port}`)
})