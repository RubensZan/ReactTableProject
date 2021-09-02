'use strict';
module.exports = function (app) {
    var users = require('../controllers/users');

    app.route('/users')
        .get((req, res) => res.send('users'))

    app.route('/users/list')
        .get(users.list_all_users)

};
