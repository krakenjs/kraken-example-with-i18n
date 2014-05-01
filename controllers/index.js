'use strict';


var IndexModel = require('../models/index');


module.exports = function (app) {

    var model = new IndexModel();

    app.get('/', function (req, res) {
        console.info('***********res.locals', res.locals);
        res.render('index', model);
    });

    app.get('/setLocale/:locale', function (req, res) {
        console.info('in here');
        res.cookie('locale', req.params.locale);
        res.redirect('/');
    });

};
