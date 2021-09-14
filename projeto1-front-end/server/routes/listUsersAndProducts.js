'use strict';
module.exports = function (app) {
    var usersAndProducts = require('../controllers/usersAndProducts');

    app.route('/listUsersAndProducts')
        .get(usersAndProducts.listUsersAndProducts)
        

};