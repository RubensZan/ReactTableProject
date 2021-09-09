'use strict';
module.exports = function (app) {
    var productsConsumer = require('../controllers/productsUsers');

    app.route('/products/consumers')
        .get(productsConsumer.list_all_consumers)

};