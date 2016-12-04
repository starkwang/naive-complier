function tokenizer(str) {
    var token = '';
    var result = [];

    var status;
    str.split('').forEach((char, index) => {
        if (!isTargetChar(char)) {
            throw new Error();
        }
        if (isNumber(char)) {
            if (status != 'char' && token.length > 0) {
                result.push(token);
                token = char;
            } else {
                token += char;
            }
            status = 'char';
        }
        if (isOperator(char)) {
            if (status != 'op' && token.length > 0) {
                result.push(token);
            }
            token = char;
            status = 'op';
        }
        if (isParen(char)) {
            if (status != 'paren' && token.length > 0) {
                result.push(token);
            }
            token = char;
            status = 'paren';
        }
        if (index == str.length - 1) {
            result.push(token);
        }
    });
    return result;
}

function isNumber(char) {
    return /^\d+$/.test(char);
}

function isOperator(char) {
    return ['+', '-', '*', '/'].indexOf(char) != -1;
}

function isParen(char) {
    return ['(', ')'].indexOf(char) != -1;
}

function isTargetChar(char) {
    return isNumber(char) || isOperator(char) || isParen(char) || char == ' ';
}

module.exports = tokenizer;