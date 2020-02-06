const got = require('got');
exports.get = () => got('http://whatthecommit.com/index.txt').then(response => response.body);