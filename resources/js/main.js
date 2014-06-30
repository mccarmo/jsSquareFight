var squareMap = [];
var squareTypes = ['#fff','#000']; //#fff - nothing / #000 - obstacle
var squareSize = 30;
var canvasSize = 600;	
var canvas = '';

//Function to draw the agents...
function drawSquare(square, context) { 
    //Ray Of Sight	
    context.beginPath();
    context.arc(square.getX()+squareSize/2, square.getY()+squareSize/2, square.getRangeOfSight(), 0, 2 * Math.PI, false);         
    context.lineWidth = 1;
    context.strokeStyle = square.getColor();
    context.stroke();  
    //Bullets
    for(var i=0;i<square.getBullets().length;i++) {
        var bullet = square.getBullets()[i];
		//updating bullet trajectory
		if((Math.pow((bullet.currPosition.x - square.getX()),2) + Math.pow((bullet.currPosition.y - square.getY()),2)) < Math.pow(square.getRangeOfSight(),2)) {		 
			bullet.currPosition.x += bullet.power*bullet.direction.x;
			bullet.currPosition.y += bullet.power*bullet.direction.y;
			context.beginPath();
			context.arc(bullet.currPosition.x+squareSize/2,bullet.currPosition.y+squareSize/2, 5, 0, 2 * Math.PI, false);  							
			context.lineWidth = 1;
			context.strokeStyle = square.getColor();
			context.fill();
			context.stroke();
			context.fillStyle = "blue";
			context.font = "bold "+squareSize/2+"px Arial";
			context.fillText('bullet x: ' + bullet.currPosition.x + ', y: ' + bullet.currPosition.y, bullet.currPosition.x, bullet.currPosition.y);
			context.font = "bold "+squareSize/2+"px Arial";
			context.fillText('target x: ' + bullet.targetPosition.x + ', y: ' + bullet.targetPosition.y, bullet.currPosition.x, bullet.currPosition.y-15)
		} else {			
			square.getBullets().splice(i,1); //Remove the bullet from the array			
		}		        
    }
    //Agent	
    context.beginPath();
    context.rect(square.getX(), square.getY(), squareSize, squareSize);
    context.fillStyle = square.getColor();
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    context.stroke();
    //Life
    context.fillStyle = "blue";
    context.font = "bold "+squareSize/2+"px Arial";
    context.fillText(square.getLife(), square.getX()+5, square.getY()+15);	
}

//Function to create the room
function createRandomSimulatorRoom() {
    for (var x = 0; x < (canvasSize+1); x += squareSize) {
        for (var y = 0; y < (canvasSize+1); y += squareSize) { 								
            if(x == 0 || y == 0 || x >= canvasSize-squareSize || y >= canvasSize-squareSize) {
                squareMap.push([x,y,'#000',1]);
			} 		
        }
    }    	
}  

//Function to draw the room
function drawDirtyRoomTiles(context) {
    for (var i = 0; i < squareMap.length; i++) {  
        context.beginPath();
        context.rect(squareMap[i][0],squareMap[i][1], squareSize, squareSize);
        context.fillStyle = squareMap[i][2];
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#bbb';					
        context.stroke(); 		
   } 
}		
	
//Function to check for bullet impact on targets
function detectBulletCollision(bullet) {
	for (var i = 0; i < squareList.length; i++) {
		
	}
}

//Function to check for agents impact between each other
function detectAgentCollision(square) {
	for (var i = 0; i < squareList.length; i++) {
		if(square.getId()!=squareList[i]) {
			//if()
		}
	}
}

//Function to animate the game!
function animate(squareList, canvas, context) {	
    //Clear
    context.clearRect(0, 0, canvas.width, canvas.height);
			
    drawDirtyRoomTiles(context);
    
    //Agent brain goes here...
    squareList.map(function(v){
        v.chooseDestiny(squareMap); 
        drawSquare(v, context);
    });

    //Request new frame
    requestAnimFrame(function() {
        setTimeout(function() {
	    animate(squareList, canvas, context);
        }, 10);
    });
}

//Function to generate the requested game type by initializing the room and the agents.
function generateWorld() {	
    squareMap = [];
    canvas = document.getElementById('simulatorRoom');
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    
    var context = canvas.getContext('2d');

    window.requestAnimFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || 
		   window.mozRequestAnimationFrame || window.oRequestAnimationFrame || 
		   window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
    })();
        
    var squareList = []; 	
	
	/*Creating the agent and his brain (chooseDestiny function)....*/	
	for(var i = 0;i<2;i++) {
		var square = new Square();
		square.init({'x':squareSize,'y':squareSize,'stepSize':3,'rangeOfSight':canvasSize/4,'life':10,'squareSize':squareSize,'canvasSize':canvasSize});
		squareList.push(square);		
	}
		
	var v1 = squareList[0];
	v1.setColor('#afa');
	v1.setId('v1');
	v1.setX(canvasSize/2);
	v1.setY(canvasSize/2);
    v1.setRangeOfSight(canvasSize/2);
	v1.chooseDestiny = function(squareMap) {	    		
		
		//Random walking example 1				
		//If has a target...
		if(v1.hasTargetInSight(squareList)) {
			//...shoot the target.
			v1.shootIt();			
		} /*else {
			v1.setDirectionIndex(Math.floor(Math.random()*v1.getDirectionsArray().length));	
		}			
		//Select a random destination.
		var move = v1.getDirectionsArray()[v1.getDirectionIndex()];		
		if(!move()) {
			//if it can't move, randomize the direction...
			v1.setDirectionIndex(Math.floor(Math.random()*v1.getDirectionsArray().length));							
		}	*/	   
	};	
    
	var v2 = squareList[1];
	v2.color = '#faa';
	v2.setId('v2');
	v2.setX(canvasSize - squareSize*2);
	v2.setY(canvasSize - squareSize*2);
	v2.setRangeOfSight(canvasSize/2);
	v2.chooseDestiny = function(squareMap) {
		if(v2.hasTargetInSight(squareList)) {
			v2.shootIt();
		} else {
			//Circle walking...
			if(!v2.getDirectionsArray()[v2.getDirectionIndex()]()) {
				if(v2.getDirectionIndex()<v2.getDirectionsArray().length-1) {
					v2.setDirectionIndex(v2.getDirectionIndex()+1);
				} else {
					v2.setDirectionIndex(0); 
				}
			}				
		}
	};
	
	createRandomSimulatorRoom();
	
    animate(squareList, canvas, context);
}
