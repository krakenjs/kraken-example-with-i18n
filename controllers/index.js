'use strict';


var IndexModel = require('../models/index');


module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res) {
        res.render('index', model);
    });

    router.get('/setLocale/:locale', function (req, res) {
        console.info('in here');
        res.cookie('locale', req.params.locale);
        res.redirect('/');
    });

};
