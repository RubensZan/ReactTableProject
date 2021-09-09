'use strict';
module.exports = function (app) {
    var usersCars = require('../controllers/usersCars')
    
    app.route('/users/cars')
        .get(usersCars.list_users_cars)
};
