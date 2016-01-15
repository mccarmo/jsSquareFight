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
		automata.setState(8);
		automata.setState(9);
		automata.setState(10);

        automata.setInitState(0);
		automata.setFinalState(8);
        automata.setFinalState(9);	
		automata.setFinalState(10);
        automata.setTransition(new Transition({'ori':0,'dest':1,'symbol':'if'}));
        automata.setTransition(new Transition({'ori':1,'dest':2,'symbol':'('}));
        automata.setTransition(new Transition({'ori':2,'dest':3,'symbol':'!'}));
		automata.setTransition(new Transition({'ori':2,'dest':4,'symbol':'v3'}));
		automata.setTransition(new Transition({'ori':3,'dest':4,'symbol':'v3'}));
		automata.setTransition(new Transition({'ori':4,'dest':2,'symbol':'&&'}));
		automata.setTransition(new Transition({'ori':4,'dest':2,'symbol':'||'}));
		automata.setTransition(new Transition({'ori':4,'dest':5,'symbol':')'}));
		automata.setTransition(new Transition({'ori':5,'dest':6,'symbol':'{'}));
		automata.setTransition(new Transition({'ori':6,'dest':7,'symbol':'v3'}));
		automata.setTransition(new Transition({'ori':6,'dest':1,'symbol':'if'}));
		automata.setTransition(new Transition({'ori':7,'dest':6,'symbol':';'}));
		automata.setTransition(new Transition({'ori':7,'dest':8,'symbol':'}'}));
		automata.setTransition(new Transition({'ori':8,'dest':8,'symbol':'}'}));
		automata.setTransition(new Transition({'ori':0,'dest':9,'symbol':'v3'}));
		automata.setTransition(new Transition({'ori':9,'dest':10,'symbol':';'}));
		automata.setTransition(new Transition({'ori':10,'dest':9,'symbol':'v3'}));
		automata.setTransition(new Transition({'ori':8,'dest':10,'symbol':'v3'}));
		
        var ori  = 0;
        var dest, transition;
        for(var i=0;i<wordTypes.length;i++) {
            transition = automata.getTransition(ori,wordTypes[i]);		
            if(!transition=="") {
                dest = transition.getDestiny();
                ori = dest.getId(); 
            } 	
        }  
        return automata.isFinalState(ori);
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
    var initState, finalState = [];
	
    this.setState = function(id) {	    
	states.push(new State(id));		
    }	

    this.setInitState = function(id) {
        initState = new State({'id':id});
    }   

    this.setFinalState = function(id) {
        finalState.push(new State({'id':id}));
    } 	

    this.setTransition = function(transition) {
		transitions.push(transition);				
    }

    this.getTransition = function(ori,symbol) {
        var transition;
        transitions.map(function(t){	  
            if(symbol.indexOf("v3.")===0) {		
                if((t.getOrigin().getId()===ori && t.getSymbol()==='v3')) {    
                    console.log('ori: ' + ori+' symbol: '+t.getSymbol()+' mySymbol: '+symbol);
	            transition = t;
                    return;
	        }
            } else {
                if((t.getOrigin().getId()===ori && t.getSymbol()===symbol)) {
	            transition = t;
                    return;
	        }
            }		
        });
        return transition;		
    }

    this.isFinalState = function(ori) {		
	    var isFinal = false;
		finalState.map(function(f){
		   if((ori==f.getId())) {
		       isFinal = true;
			   return;
		   }
		});
        return isFinal; 
    }
}
