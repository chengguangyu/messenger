/*
 * @(#)default.js
 */

/*
 * Author: Chengguang Yu
 * Created: 2017/06/06
 * Description: the config module
 */

// Default config.
var config = {
    "debug": true,

    "host": "0.0.0.0",
    "port": 6262,

    "users": [{
        "id": "chengguang.yu",
        "firstName": "Chengguang",
        "lastName": "Yu",
        "email": "chengguang.yu@gmail.com"
    },{
        "id": "james.liu",
        "firstName": "James",
        "lastName": "Liu",
        "email": "james.liu@gmail.com"
    }]
};

exports = module.exports = config;
