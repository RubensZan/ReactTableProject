'use strict';
const modelFunc = require('../models/users');

exports.list_all_users = async function (req, res) {
    let result = await modelFunc(); 
    console.log("fim do controler");

    res.json(result);
};