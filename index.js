var tokenizer = require('./tokenizer');
var parser = require('./parser');
var transformer = require('./transformer');

function compile(source){
    return transformer(parser(tokenizer(source)));
}

module.exports = compile;
