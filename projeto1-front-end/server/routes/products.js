'use strict';
module.exports = function (app) {
    var products = require('../controllers/products');

    app.route('/products')
        .get((req, res) => res.send('products'))

    app.route('/products/list')
        .get(products.list_all_products)

};