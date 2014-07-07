function SyntacticAnalyzer() {
   var context = this; 
   var token = '';
   var index = 0;
   var characters = [];
   var wordTypes = [];
   
   //Analyze the words one by one
   this.analyze  = function(text,wordTypes) {
		var lines = text.split(" ");
		
		context.wordTypes = wordTypes;
		
		//Store the words one by one
		for (var i=0; i < lines.length; i++) {		  	
		    if(lines[i].trim()!="") {
		        characters.push(lines[i]);		  
		    }
		}
		context.getToken();		
		return context.program();
   }
   
   //Check the program... ;)
   this.program = function() {
       if(wordTypes[index]=="reserved_word") {
	           	
	   } else if(wordTypes[index]=="identifier") {
	   
	   }
	   return true;
   }
   
   //Return current token and increment the index
   this.getToken = function() {
       token = characters[index]; 
	   index++;
	   console.log(token);
   }
}