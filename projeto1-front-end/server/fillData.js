const { Client } = require('pg')

// Ler arquivos
const usersList = require('../src/user/users.js')
const addressList = require('../src/user/users_address.js');
const addressListValues = Object.values(addressList);
const productsList = require('../src/user/users_products_buyed.js');
const productsListValues = Object.values(productsList);
const accessList = require('../src/user/users_access.js');
const accessListValues = Object.values(accessList);
const carsList = require('../src/user/users_cars.js');
const carsListValues = Object.values(carsList);
const jobList = require('../src/user/users_job.js');
const jobListValues = Object.values(jobList); 


let users_accessInsertQuery = ` INSERT INTO users_access (user_id, access_id) VALUES`;
let users_addressInsertQuery = ` INSERT INTO users_address (user_id, address_id) VALUES`;
let user_carsInsertQuery = ` INSERT INTO users_cars (user_id, car_id) VALUES`;
let user_jobInsertQuery = ` INSERT INTO users_job (user_id, job_id) VALUES`;
let user_productsInsertQuery = ` INSERT INTO users_products (user_id, product_id) VALUES`;

let obj = [];
// for(let i = 0; i < 85; i++) {
//     let user =  Math.round(Math.random(1,usersList.length) * 100);
//     let product =  Math.round(Math.random(1,productsListValues.length) * 100);

//     if(!obj[user + '-' + product]){
//         obj[user + '-' + product] = true;
//         user_productsInsertQuery += ` (${user}, ${product}), `;
//     } else {
//         user =  Math.round(Math.random(1,usersList.length) * 100);
//         product =  Math.round(Math.random(1,productsListValues.length) * 100);
//         user_productsInsertQuery += ` (${user}, ${product}), `;
//     }
// }



// for(let i = 0; i < 85; i++) {
//     let user =  Math.ceil(Math.random(1,usersList.length) * 100);
//     let access =  Math.ceil(Math.random(1,accessListValues.length) * 100);

//     if(!obj[user + '-' + access]){
//         obj[user + '-' + access] = true;
//         users_accessInsertQuery += ` (${user}, ${access}), `;
//     } else {
//         user =  Math.ceil(Math.random(1,usersList.length) * 100);
//         access =  Math.ceil(Math.random(1,accessListValues.length) * 100);
//         users_accessInsertQuery += ` (${user}, ${access}), `;
//     }
// }

// for(let i = 0; i < 85; i++) {
//     let user =  Math.ceil(Math.random(1,usersList.length) * 100);
//     let address =  Math.ceil(Math.random(1,addressListValues.length) * 100);

//     if(!obj[user + '-' + address]){
//         obj[user + '-' + address] = true;
//         users_addressInsertQuery += ` (${user}, ${address}), `;
//     } else {
//         user =  Math.ceil(Math.random(1,usersList.length) * 100);
//         address =  Math.ceil(Math.random(1,addressListValues.length) * 100);
//         users_addressInsertQuery += ` (${user}, ${address}), `;
//     }
// }

// for(let i = 0; i < 85; i++) {
//     let user =  Math.ceil(Math.random(1,usersList.length) * 100);
//     let car =  Math.ceil(Math.random(1,carsListValues.length) * 100);

//     if(!obj[user + '-' + car]){
//         obj[user + '-' + car] = true;
//         user_carsInsertQuery += ` (${user}, ${car}), `;
//     } else {
//         user =  Math.ceil(Math.random(1,usersList.length) * 100);
//         car =  Math.ceil(Math.random(1,carsListValues.length) * 100);
//         user_carsInsertQuery += ` (${user}, ${car}), `;
//     }
// }

// for(let i = 0; i < 85; i++) {
//     let user =  Math.ceil(Math.random(1,usersList.length) * 100);
//     let job =  Math.ceil(Math.random(1,jobListValues.length) * 100);

//     if(!obj[user + '-' + job]){
//         obj[user + '-' + job] = true;
//         user_jobInsertQuery += ` (${user}, ${job}), `;
//     } else {
//         user =  Math.ceil(Math.random(1,usersList.length) * 100);
//         job =  Math.ceil(Math.random(1,carsListValues.length) * 100);
//         user_jobInsertQuery += ` (${user}, ${job}), `;
//     }
// }


// user_productsInsertQuery = user_productsInsertQuery.substr(0, user_productsInsertQuery.length - 2);
// users_accessInsertQuery = users_accessInsertQuery.substr(0, users_accessInsertQuery.length - 2);
// users_addressInsertQuery = users_addressInsertQuery.substr(0, users_addressInsertQuery.length - 2);
// user_carsInsertQuery = user_carsInsertQuery.substr(0, user_carsInsertQuery.length - 2);
// user_jobInsertQuery = user_jobInsertQuery.substr(0, user_jobInsertQuery.length - 2);

// const allQuerys = [
//     // user_productsInsertQuery,
//     users_accessInsertQuery,
//     users_addressInsertQuery,
//     user_carsInsertQuery,
//     user_jobInsertQuery
// ];

// Ler arquivos

// const db = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'React-Table-Project-DB',
//     password: 'admin',
//     port: 5432,
// })

// db.connect().then(async () => {
//     console.log('--- db connected')
//     db.query("SET search_path TO 'users_data';")

//     for (let i = 0; i < allQuerys.length; i++) {
//         await fillDataFunction(allQuerys[i])
//     }

//     db.end();
// })

// function fillDataFunction(query) {
//     console.log('-------------------------- comecando nova query --------------------------')
//     const executeQuery = new Promise(
//         (resolve, reject) => {

//             db.query(query, (err, result) => {
//                 if (err) {
//                     console.log('Erro ao executar insert')
//                     console.log(err)
//                     reject()
//                 } else {
//                     console.log('Insert executado com sucesso')
//                     console.log(result)
//                     resolve()
//                 }
//             })
//         }
//     )

//     return executeQuery
// }