const express = require('express')
const cors = require('cors');
const app = express();

// const router = express.Router(); 
// const bodyParser = require('body-parser')
const port = 3010;

const usersAndProducts_route = require ("./routes/listUsersAndProducts")


app.use(cors());
app.use(getAccessUsers); 

app.get('/',(req, res) => {
  // console.log(req.get('User-Agent'));
  // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // console.log(ip);
  res.send(`Hey yo go!!!`)
})

usersAndProducts_route(app); 

app.listen(port, () => {
  console.log(`Nodemon listening at http://localhost:${port}`)
})

function getAccessUsers(req, res, next){
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let date = new Date();
  
  console.log(ip);
  console.log(req.get('User-Agent'));
  console.log(req.originalUrl);
  console.log(date);
  req.date = date; 

  if (req.ip && req.get('User-Agent') && req.originalUrl && req.date)
    next(); 
  else{
    console.log("ERRO!");
  }
}