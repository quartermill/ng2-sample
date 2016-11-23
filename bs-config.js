"use strict";

var proxy = require('http-proxy-middleware');

var apiProxy = proxy('/services', {target : 'http://dev.quartermillsoftware.com:8080'});

/// Export configuration options
module.exports = {
    "server" : true,
	"host"  : "dev.quartermillsoftware.com",
	"url"   : "dev.quartermillsoftware.com",
	"port"  : 3000,
	"middleware" : [apiProxy]
}

