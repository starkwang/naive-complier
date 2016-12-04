function transformer(root) {
    return transformExpr(root.child[0]);
}

function transformExpr(Expr) {
    if (Expr.operator) {
        // Expr -> Expr + Term
        //      |  Expr - Term
        return `(${Expr.operator} ${transformTerm(Expr.child[0])} ${transformExpr(Expr.child[1])})`;
    } else {
        // Expr -> Term
        return transformTerm(Expr.child[0]);
    }
}

function transformTerm(Term) {
    if (Term.operator) {
        // Term -> Term * Factor
        //      |  Term / Factor
        return `(${Term.operator} ${transformFactor(Term.child[0])} ${transformTerm(Term.child[1])})`;
    } else {
        // Term -> Factor
        return transformFactor(Term.child[0]);
    }
}

function transformFactor(Factor) {
    if (Factor.child[0].type == 'Expr') {
        // Factor -> (Expr)
        return transformExpr(Factor.child[0])
    } else {
        // Factor -> num
        return Factor.child[0];
    }
}

module.exports = transformer;
