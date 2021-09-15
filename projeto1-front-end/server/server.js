const express = require('express')
const cors = require('cors');
const app = express();

// const router = express.Router(); 
// const bodyParser = require('body-parser')
const port = 3010;

const usersAndProducts_route = require ("./routes/listUsersAndProducts");
const requisitionHandler = require("./models/requisitionsInsert");
const requisitionsHistory_route = require("./routes/listRequisitionHistory"); 

app.use(cors());
app.use(getAccessUsers); 

app.get('/',(req, res) => {
  // console.log(req.get('User-Agent'));
  // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // console.log(ip);
  res.send(`Hey yo go!!!`)
})

usersAndProducts_route(app); 
requisitionsHistory_route(app); 

app.listen(port, () => {
  console.log(`Nodemon listening at http://localhost:${port}`)
})

/**
 * @function getAccessUsers
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
 * @summary checks the requisition user ip, user agent, req url and date, and calls insertion requisition table function. 
 */
function getAccessUsers(req, res, next){
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let ts = Date.now();
  let date_ob = new Date(ts);
  let year = date_ob.getFullYear();
  let month = date_ob.getMonth() + 1;
  let day = date_ob.getDate();
  let hour = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  let userDate = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
  
  if (ip.substr(0, 7) == "::ffff:")
    ip = ip.substr(7);
  else if(ip.substr(0, 2) == "::")
    ip = ip.substr(2);  


  req.date = userDate; 
  req.ip_config = ip; 
  if (req.ip && req.get('User-Agent') && req.originalUrl && req.date)
    requisitionHandler(req.ip_config, req.get('User-Agent'), req.originalUrl, req.date); 
  next();
}