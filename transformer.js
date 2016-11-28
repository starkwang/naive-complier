function transformer(root) {
    return transformExpr(root.child[0]);
}

function transformExpr(Expr) {
    if (Expr.operator) {
        return `(${Expr.operator} ${transformTerm(Expr.child[0])} ${transformExpr(Expr.child[1])})`;
    } else {
        return transformTerm(Expr.child[0]);
    }
}

function transformTerm(Term) {
    if (Term.operator) {
        return `(${Term.operator} ${transformFactor(Term.child[0])} ${transformTerm(Term.child[1])})`;
    } else {
        return transformFactor(Term.child[0]);
    }
}

function transformFactor(Factor) {
    if (Factor.child[0].type == 'Expr') {
        return transformExpr(Factor.child[0])
    } else {
        return Factor.child[0];
    }
}

module.exports = transformer;
