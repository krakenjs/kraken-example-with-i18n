'use strict';
var express = require('express');


module.exports = function spec() {

    return {
        onconfig: function (config, next) {
            next(null, config);
        }
    };

};