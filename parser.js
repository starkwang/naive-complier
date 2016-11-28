function parser(token) {
    var i = 0;
    function nextWord() {
        return token[i++];
    }

    function Node(type, operator, child) {
        this.type = type;
        this.operator = '';
        this.child = [];
    }

    var word = nextWord();
    var root = new Node('root');
    var p = root;

    if (Expr() && !word) {
        return root;
    } else {
        return false;
    }

    /**
     * Expr -> Term + Expr
     *      |  Term - Expr
     *      |  Term
     **/
    function Expr() {
        var node = new Node('Expr');
        p.child.push(node);
        p = node;
        if (Term()) {
            p = node;
            if (word == '+' || word == '-') {
                node.operator = word;
                word = nextWord();
                p = node;
                return Expr();
            } else {
                return true;
            }
        }
    }

    /** 
     * Term -> Factor * Term
     *      |  Factor / Term
     *      |  Factor
     **/
    function Term() {
        var node = new Node('Term');
        p.child.push(node);
        p = node;
        if (Factor()) {
            word = nextWord();
            p = node;
            if (word == '*' || word == '/') {
                p.operator = word;
                word = nextWord();
                return Term();
            }
            return true;
        }
    }

    /** 
     * Factor -> (Expr)
     *        |  num
     **/
    function Factor() {
        var node = new Node('Factor');
        p.child.push(node);
        p = node;
        if (word == '(') {
            word = nextWord();
            if (Expr()) {
                return word == ')';
            }
        } else if (isNumber(word)) {
            p.child.push(word);
            return true;
        }
    }

    function isNumber(word) {
        return /^\d+$/.test(word);
    }

}

module.exports = parser;
