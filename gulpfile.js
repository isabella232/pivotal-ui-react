require('babel/register')({optional: ['es7.objectRestSpread', 'regenerator']});
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var requireDir = require('require-dir');
requireDir('./tasks');
