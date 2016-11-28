var parser = require('./parser2');
var transformer = require('./transformer');

var ast = parser(['1', '*', '(', '2', '+', '3', ')', '*', '4', '/', '5']);
var result = transformer(ast);

console.log(JSON.stringify(ast));
console.log(result);


var a = {
    "type": "Expr",
    "child": [{
        "type": "Term",
        "operator": "*",
        "child": [{
            "type": "Factor",
            "child": ["1"]
        }, {
            "type": "Term",
            "operator": "*",
            "child": [{
                "type": "Factor",
                "child": [{
                    "type": "Expr",
                    "operator": "+",
                    "child": [{
                        "type": "Term",
                        "child": [{ "type": "Factor", "child": ["2"] }]
                    }, {
                        "type": "Expr",
                        "child": [{
                            "type": "Term",
                            "child": [{ "type": "Factor", "child": ["3"] }]
                        }, ")"]
                    }]
                }]
            }, {
                "type": "Term",
                "operator": "/",
                "child": [{
                    "type": "Factor",
                    "child": ["4"]
                }, {
                    "type": "Term",
                    "child": [{
                        "type": "Factor",
                        "child": ["5"]
                    }]
                }]
            }]
        }]
    }, null]
}
