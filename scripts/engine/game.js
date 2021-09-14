import debug from './debug.js'

class Game {
    constructor() {

    }

    save(name){
		
    }
    
    action(id,data){
    	if(!this.actions[id]){
    		debug.error("No such action: " + id);
    		return;
    	}
    	this.actions[id](data);    	
    }
}

export default Game