'use strict';
const modelFunc = require('../models/products');

exports.list_all_products = async function (req, res) {
    let result = await modelFunc(); 
    let myResult = []; 
    if (!result.err)
        myResult = result.data; 
    res.json(myResult);
};