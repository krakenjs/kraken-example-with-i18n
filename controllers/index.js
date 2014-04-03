'use strict';


var IndexModel = require('../models/index');


module.exports = function (app) {

    var model = new IndexModel();

    app.get('/', function (req, res) {
        res.render('index', model);
    });

    app.get('/setLocale/:locale', function (req, res) {
        res.cookie('locale', req.params.locale);
        res.redirect('/');
    });

};
