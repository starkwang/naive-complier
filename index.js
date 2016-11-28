var tokenizer = require('./tokenizer');
var parser = require('./parser');
var transformer = require('./transformer');

var token = tokenizer('11 * ( 22 + 33 * (1+2) ) * 44 / 55');
var ast = parser(token);
var result = transformer(ast);

console.log(result);
