'use strict';

exports.list_all_users = function (req, res) {
    //tratativa de dados
    //  // busca de dados
    //  // tratativa dos valores

    const result = [{ user: 'carlos' }];

    res.json(result);
};