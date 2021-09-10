'use strict';
module.exports = function (app) {
    var usersAccess = require('../controllers/usersAccess')
    
    app.route('/users/access')
        .get(usersAccess.list_users_access)
};