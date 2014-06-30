function Square() {
    var context = this;
    var x,y,id,color,squareSize,stepSize,canvasSize,targetIndex, directionIndex,directionsArray;
	var life, bullets, rangeOfSight, currTargetPosition;
   
    this.init = function(properties) {
        context.x = properties.x;
        context.y = properties.y;
		context.id = properties.id;
		context.color = properties.color;
        context.squareSize = properties.squareSize;
        context.stepSize = properties.stepSize;
        context.canvasSize = properties.canvasSize;    
		context.life = properties.life;			
		context.targetIndex = -1;
		context.directionIndex = 0;
		context.directionsArray = [];   
		context.bullets = [];		
		context.rangeOfSight = properties.rangeOfSight;
		context.currTargetPosition = [];
        context.directionsArray.push(context.goUp());
		context.directionsArray.push(context.goRight());
		context.directionsArray.push(context.goDown());
		context.directionsArray.push(context.goLeft());				
    };
    
    this.goRight = function() {	  
        function action() {		    		   
	    if(context.getX() < context.getCanvasSize() - context.getSquareSize()*2) {				
		context.setX(context.getX() + context.getStepSize());				
		if(context.hasObstacle()) {
			context.setX(context.getX() - context.getStepSize());
			return false; 
		}
		return true;
	    } 		
	    return false;
	}
	return action;
    };

    this.goLeft = function() {
        function action() {
            if(context.getX() > 0 && context.getX() > context.getSquareSize()) {
		context.setX(context.getX() - context.getStepSize());
		if(context.hasObstacle()) {
			context.setX(context.getX() + context.getStepSize());
			return false; 
		}
		return true;
	    }
	    return false;
	}
	return action;
    };

    this.goUp = function() {
	function action() {
	    if(context.getY() > 0 && context.getY() > context.getSquareSize()) {
		context.setY(context.getY() - context.getStepSize());
		if(context.hasObstacle()) {
			context.setY(context.getY() + context.getStepSize());
			return false; 
		}
		return true;
	    }
	    return false;
	}
	return action;
    };
    
    this.goDown = function() {
	function action() {
	    if(context.getY() < context.getCanvasSize() - context.getSquareSize()*2) {
		context.setY(context.getY() + context.getStepSize());
		if(context.hasObstacle()) {
		    context.setY(context.getY() - context.getStepSize());
		    return false; 
		}
		return true;
	    }
	    return false;
	}
	return action;
    };

    this.goToRandomDirection = function() {
        return context.getDirectionsArray()[Math.floor(Math.random()*context.getDirectionsArray().length)]();
    }	

    this.chooseDestiny = function() {alert('teste');};
 	
    this.hasObstacle = function() {
        for(var i=0;i<squareMap.length;i++) {
			if(squareMap[i][0]==context.getX() && squareMap[i][1]==context.getY()) {
				if(squareMap[i][3]==1){
					return true;	
				} 
			} 
		}
		return false;
    };
  
    this.hasTargetInSight = function(squareList) {  		
        for(var i=0;i<squareList.length;i++) {		 
	        if(squareList[i].getId()!=context.id) {
		        if((Math.pow((squareList[i].getX() - context.getX()),2) + Math.pow((squareList[i].getY() - context.getY()),2)) < Math.pow(context.getRangeOfSight(),2)) {				
					context.currTargetPosition = {'x':squareList[i].getX(),'y':squareList[i].getY()};					
					return true;					
		        } else {
			    context.currTargetPosition = [];
		        }
	        } 
	}
	return false;
    };

    this.shootIt = function() {     
		var dX, dY;
		
		dX = context.calculateDirection(context.getX(),context.currTargetPosition.x);
		dY = context.calculateDirection(context.getY(),context.currTargetPosition.y);
		
		var bullet = {
			targetPosition: {'x':context.currTargetPosition.x,'y':context.currTargetPosition.y},
			initPosition: {'x':context.getX(),'y':context.getY()},
			currPosition: {'x':context.getX(),'y':context.getY()},			
			power: 3,
			direction: {'x':dX, 'y':dY} 
		};
		
        if(context.bullets.length < 1) {              
			context.bullets.push(bullet);  					
		}           	
    };
	
	this.calculateDirection = function(self,target) {
		if(target < self) { 
			return -1;
		} else if (target > self) {
			return 1;
		} 
		return 0;
	}
	
    /*Get's*/
    this.getX = function() {
		return context.x;
    }

    this.getY = function() {
		return context.y;
    }
	
    this.getId = function() {
		return context.id;
    }
	
    this.getCurrTargetPosition = function() {
		return context.currTargetPosition;
    }
	
    this.getBullets = function() {
        return context.bullets;
    }    

    this.getColor = function() {
		return context.color;
    }  

    this.getCanvasSize = function() {
		return context.canvasSize;
    }

    this.getSquareSize = function() {
		return context.squareSize;
    }

    this.getStepSize = function() {
	return context.stepSize;
    }

    this.getDirectionsArray = function() {
		return context.directionsArray;
    }

    this.getDirectionIndex = function() {
		return context.directionIndex;
    }	

    this.getTargetIndex = function() {
		return context.targetIndex;
    }
	
	this.getLife = function() {
		return context.life;
    }
	this.getRangeOfSight = function() {
		return context.rangeOfSight;
    }
	
    /*Set's*/
    this.setId = function(newId) {
		context.id = newId;
    }
    this.setX = function(newX) {
		context.x = newX;
    }

    this.setY = function(newY) {
		context.y = newY;
    }   

    this.setColor = function(newColor) {
		context.color = newColor;
    }  
 
    this.setCanvasSize = function(newCanvasSize) {
		context.canvasSize = newCanvasSize;
    }

    this.setSquareSize = function(newSquareSize) {
		context.squareSize = newSquareSize;
    }

    this.setDirectionsArray = function(newDirectionsArray) {
		context.directionsArray = newDirectionsArray;
    }

    this.setDirectionIndex = function(newDirectionIndex) {
		context.directionIndex = newDirectionIndex;
    }

    this.setRangeOfSight = function(newRangeOfSight) {
		context.rangeOfSight = newRangeOfSight;
    }

    this.setTargetIndex = function(newTargetIndex) {
		context.targetIndex = newTargetIndex;
    }
}
