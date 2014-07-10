function LexicalAnalyzer() {
   var context = this; 
   var characters = [];
   var wordTypes = [];
   
   //Analyze the words one by one
   this.analyze  = function(text) {	
	//Categorizing the words (operators, reserved words, etc)
	return context.categorize(text);		
   }
   
   //Caregorizing the words
   this.categorize = function(words) {
       for(var i=0;i<words.length;i++) {
           var word = words[i];
           var tipoPalavra = context.getWordType(word);
           switch(tipoPalavra) {
               case 'p':			       
                   wordTypes.push("reserved_word");
                   break;				
               case 'l':				   
                   wordTypes.push("logical_operator");
                   break;
               case 'i':				   
                   wordTypes.push("identifier");
                   break;		
               default:
                   console.log('Lexical error! Unexpected character: ' + word);
                   return false;
           }
        }		
        return true;
   }
   
   //Return the word type.
   this.getWordType = function(word) {
       if(word==="if" || word==="else" || word==="{" || word==="}" || word==="(" || word===")" || word===";") {
	       return "p";
	   } else if(word==="!" || word==="&&" || word==="||" ) {
	       return "l";
	   } else if(word.indexOf("v3.")!=-1) {
		   return "i";
	   } else {
		   return 0; //lexical error
	   }
   }
}
