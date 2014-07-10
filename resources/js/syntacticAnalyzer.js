function SyntacticAnalyzer() {
  
   //Analyze the words one by one
   this.analyze  = function(wordTypes) {
	var automata = new Automata();

        automata.setState(0);
        automata.setState(1);
        automata.setState(2);
        automata.setState(3);
        automata.setState(4);
        automata.setState(5);
        automata.setState(6);
        automata.setState(7);

        automata.setInitState(0);
        automata.setFinalState(7);	
        automata.setTransition(new Transition({'ori':0,'dest':1,'symbol':'if'}));
        automata.setTransition(new Transition({'ori':1,'dest':2,'symbol':'('}));
        automata.setTransition(new Transition({'ori':1,'dest':3,'symbol':'('}));
        automata.setTransition(new Transition({'ori':2,'dest':3,'symbol':'!'}));
        automata.setTransition(new Transition({'ori':3,'dest':4,'symbol':'v3'}));
        automata.setTransition(new Transition({'ori':4,'dest':2,'symbol':'&&'}));
        automata.setTransition(new Transition({'ori':4,'dest':2,'symbol':'||'}));
        automata.setTransition(new Transition({'ori':4,'dest':5,'symbol':')'}));
        automata.setTransition(new Transition({'ori':5,'dest':6,'symbol':'{'}));
        automata.setTransition(new Transition({'ori':6,'dest':7,'symbol':'}'}));
        automata.setTransition(new Transition({'ori':6,'dest':1,'symbol':'if'}));

        var ori  = 0;
        var dest, transition;
        for(var i=0;i<wordTypes.length;i++) {
            transition = automata.getTransition(ori,wordTypes[i]);		
            if(!transition=="") {
                dest = transition.getDestiny();
                ori = dest.getId(); 
            } 	
        }  
        return true; //Syntactical Analyzer disabled :(, still in progress
        //return checkFinalState(automata,ori);
   }
}

function State(properties) {	
    var id = properties.id;

    this.getId = function() {
        return id;
    }	
}

function Transition(properties) {	
    var ori = new State({'id':properties.ori});		
    var dest = new State({'id':properties.dest});
    var symbol = properties.symbol;	
	
    this.getOrigin = function() {
	return ori;
    }
	
    this.getDestiny = function() {
	return dest;
    }
	
    this.getSymbol = function() {
	return symbol;
    }
}

function Automata() {
    var states = [];
    var transitions = [];	
    var initState, finalState;
	
    this.setState = function(id) {	    
	states.push(new State(id));		
    }	

    this.setInitState = function(id) {
        initState = new State({'id':id});
    }   

    this.setFinalState = function(id) {
        finalState = new State({'id':id});
    } 	

    this.setTransition = function(transition) {
	transitions.push(transition);				
    }

    this.getTransition = function(ori,symbol) {
        transitions.map(function(t){	
            if(symbol.indexOf("v3.")!=-1) {		
                if((t.getOrigin().getId()===ori && t.getSymbol()==='v3')) {
                    console.log(symbol);    
	            return t;
	        }
            } else {
                if((t.getOrigin().getId()===ori && t.getSymbol()===symbol)) {
	            return t;
	        }
            }		
        });
        return "";		
    }

    this.isFinalState = function(ori) {		
        return (ori==finalState.getId());
    }
}

function checkFinalState(automata,origin) {
    if(automata.isFinalState(origin)){
	console.log('Input ok.');
        return true;
    } else {
	console.log('Invalid input.');
        return false;
    }
}
