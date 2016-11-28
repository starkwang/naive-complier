function parser(str) {
    var i = 0;
    //var nextWord = _ => str[i++];
    function nextWord(){
        var next = str[i++];
        console.log(next);
        return next;
    }

    function Node(type){
        this.type = type;
        this.child = [];
    }

    var word = nextWord();
    var root = new Node('root');
    var p = root;
    if (Expr() && !word) {
        console.log('parse complete');
        return root;
    } else {
        return false;
    }

    /**
     * Expr -> Term Expr'
    **/
    function Expr() {
        console.log('Expr');
        var node = new Node('Expr');
        p.child.push(node);
        p = node;
        if(Term()){
            p = node;
            return EPrime();
        }else{
            return false;
        }
    }

    /**
     * Expr' -> + Term Expr'
     *       |  - Term Expr'
     *       |  null
    **/
    function EPrime() {
        console.log('EPrime');
        var node = new Node('EPrime');
        p.child.push(node);
        p = node;
        if (word == '+' || word == '-') {
            p.child.push(word);
            word = nextWord();
            if(Term()){
                p = node;
                return EPrime();
            }else{
                return false;
            }
        }else {
            return true;
        }
    }

    /** 
     * Term -> Factor Term'
    **/
    function Term(){
        console.log('Term');
        var node = new Node('Term');
        p.child.push(node);
        p = node;
        if(Factor()){
            p = node;
            return TPrime();
        }else{
            return false;
        }
    }

    /** 
     * Term' -> * Factor Term'
     *       |  / Factor Term'
     *       |  null
    **/
    function TPrime(){
        console.log('TPrime');
        var node = new Node('TPrime');
        p.child.push(node);
        p = node;
        if(word == '*' || word =='/'){
            p.child.push(word);
            word = nextWord();
            if(Factor()){
                p = node;
                return TPrime();
            }else{
                return false
            }
        }else{
            return true;
        }
    }

    /**
     * Factor -> num 
    **/
    function Factor(){
        console.log('Factor');
        var isNumber = /^\d+$/
        var node = new Node('Factor');
        p.child.push(node);
        p = node;
        if(isNumber.test(word)){
            p.child.push(word);
            word = nextWord();
            return true;
        }
    }
}

module.exports = parser;