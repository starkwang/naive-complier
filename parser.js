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
    var root = {
        type: 'root',
        child: []
    }
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
        var node = {
            type: 'Expr',
            child: []
        }
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
        var node = {
            type: 'EPrime',
            child: []
        }
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
            //return Term() ? EPrime() : false;
        }else {
            return true;
        }
    }

    /** 
     * Term -> Factor Term'
    **/
    function Term(){
        console.log('Term');
        var node = {
            type: 'Term',
            child: []
        };
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
        var node = {
            type: 'TPrime',
            child: []
        }
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
            //return Factor() ? TPrime() : false;
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
        var node = {
            type: 'Factor',
            child: [word]
        }
        p.child.push(node);
        if(isNumber.test(word)){
            word = nextWord();
            return true;
        }
    }
}

var result = parser(['1', '+', '1', '*', '123']);

console.log(result);