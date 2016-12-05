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

    if (Expr() && !nextWord()) {
        return root;
    } else {
        return false;
    }

    /**
     * Expr -> Term ExprTail
     **/
    function Expr() {
        var node = new Node('Expr');
        p.child.push(node);
        p = node;
        if (!Term()) {
            return false
        } else {
            p = node;
            return ExprTail();
        }
    }

    /** 
     * ExprTail -> + Term ExprTail
     *          |  - Term ExprTail
     *          |  null
     **/
    function ExprTail() {
        var node = new Node('ExprTail');
        p.child.push(node);
        p = node;
        if (word == '+' || word == '-') {
            p.operator = word;
            word = nextWord();
            if (!Term()) {
                return false;
            } else {
                p = node;
                return ExprTail();
            }
        }
        return true;
    }

    /**
     * Term -> Factor TermTail
     **/
    function Term() {
        var node = new Node('Term');
        p.child.push(node);
        p = node;
        if (!Factor()) {
            return false;
        } else {
            p = node;
            return TermTail();
        }
    }

    /**
     * TermTail -> * Factor TermTail
     *          |  / Factor TermTail
     *          |  null
     **/
    function TermTail() {
        var node = new Node('TermTail');
        p.child.push(node);
        p = node;
        if (word == '*' || word == '/') {
            p.operator = word;
            word = nextWord();
            if (!Factor()) {
                return false;
            } else {
                p = node;
                return TermTail();
            }
        }
        return true;
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
            if (!Expr()) {
                return false;
            } else if(word != ')') {
                return false;
            }
            word = nextWord();
            return true;
        } else if (isNumber(word)) {
            p.child.push(word);
            word = nextWord();
            return true;
        }
        return false;
    }

    function isNumber(word) {
        return /^\d+$/.test(word);
    }

}

module.exports = parser;
