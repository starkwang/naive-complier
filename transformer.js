function transformer(root) {
    return transformExpr(root.child[0]);
}

function transformExpr(Expr) {
    var p = Expr;
    var result = transformTerm(p.child[0]);
    while (p.child[1].child.length > 0) {
        var operator = p.child[1].operator;
        var lastParam = transformTerm(p.child[1].child[0]);
        result = `(${operator} ${result} ${lastParam})`;
        p = p.child[1];
    }
    return result;
}

function transformTerm(Term) {
    var p = Term;
    var result = transformFactor(p.child[0]);
    while (p.child[1].child.length > 0) {
        var operator = p.child[1].operator;
        var lastParam = transformFactor(p.child[1].child[0]);
        result = `(${operator} ${result} ${lastParam})`;
        p = p.child[1];
    }
    return result;
}

function transformFactor(Factor) {
    if (Factor.child[0].type == 'Expr') {
        return transformExpr(Factor.child[0]);
    } else {
        return Factor.child[0]
    }
}

module.exports = transformer;
