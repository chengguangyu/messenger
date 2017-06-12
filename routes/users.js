/*
 * @(#)users.js
 */

/*
 * Author: Chengguang Yu
 * Created: 2017/06/06
 * Description: The users route
 */
var express = require('express');
var config = require('../config/default');

var router = express.Router();

router.get('/', function(req, res, next) {
    res.json({
        success: true,
        message: 'returning all users',
        users: config.users
    });
});

module.exports = router;
