import html from './html.js'
import debug from '../debug.js'

function show_screen(name){
	html.show(document.getElementById(name));
}

class UI {
    constructor(game) {
        this.game = game;
        this.game.event_handler = this;
        let buttons = document.getElementsByTagName("button");
        for(let button of buttons){
        	this.add_btn_event_listener(button);
        }
        this.actions = {};
    }
    
    add_btn_event_listener(button){
    	button.addEventListener("click", e => this.button_click(e))
    }
    
    make_button(action,value,innerHTML){
    	const btn = document.createElement("BUTTON");
		btn.setAttribute('data-id',action);
		if(value !== undefined)
			btn.setAttribute('data-value',value);
		btn.innerHTML = innerHTML || "";
		this.add_btn_event_listener(btn);
		return btn;
    }

    
    button_click(event){
    	let btn = event.currentTarget;
    	let id = btn.getAttribute("data-id");
    	let value = btn.getAttribute("data-value");
    	if(id.startsWith("ui.")){
    		this.ui_action(id.substring(3),value)
    	} else {
			this.game.action(id,value);
			this.update();	
    	}
    }

    ui_action(id,data){
    	if(!this.actions[id]){
    		debug.error("No such UI action: " + id);
    		return;
    	}
    	this.actions[id](data);
    }

    
    handle_event(e){

    }
		
	update() {

	}
}

export default UI