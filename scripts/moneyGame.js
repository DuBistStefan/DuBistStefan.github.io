import Game from './engine/game.js'
import debug from './engine/debug.js'
import SaveLoad from './engine/saveLoad.js'

class MoneyGame extends Game {
    constructor(story) {
    	super();
    	this.actions = {
            debug: d => debug.print(d),
            choose: id => this.choose(id),
    	};
		
		this.story = story;
		this.meta = {visited: {}};
		this.new_game();
    }

    add_debug_page(){
    	let choices = [];
    	for (let key in this.story.pages) {
    		choices.push({page: key, text: key});

    		if(!this.story.pages[key].choices.includes('debug'))
    		    this.story.pages[key].choices.push('debug');
    	}
    	this.story.pages['debug'] = {
    		cost: -1e10,
    		title: "Debug-Seite",
    		text: "Debug-Seite nur zum testen!",
    		choices: choices,
    		revisitable: true
    	}

    	this.page_condition_met = function (id) {
    		return true;
    	}
    }

    new_game(){
    	this.state = {};
		this.state.money = 0;

		this.state.page = 'start';
		this.state.visited = [];
    }

    save(name){
		SaveLoad.save(name,this.state);
		SaveLoad.save('meta', this.meta);
    }

    load(name){
        const loaded = SaveLoad.load(name);
        if(loaded)
        	this.state = loaded;

        const meta = SaveLoad.load('meta');
        if(meta)
            this.meta = meta;
    }

    page_visited(id){
    	return this.state.visited.includes(id);
    }

    visited_any(list){
    	for(const id of list){
    		if(this.page_visited(id))
    		    return true;
    	}
    	
    	return false;
    }

    page_condition_met(id){
    	const page = this.story.pages[id];
    	if(!page.condition)
    	    return true;

        return page.condition(this);
    }

    canVisit(id){
    	return (!this.page_visited(id) || this.story.pages[id].revisitable) && this.page_condition_met(id);
    }

    choose(id){
    	const page = this.story.pages[id];
    	if(page){
    		const cost = page.cost || 0;
    		if(this.state.money >= cost && this.canVisit(id)) {
    			this.state.visited.push(this.state.page);
		        this.meta.visited[this.state.page] = true;

                this.go_to_page(id);

                this.state.money -= cost;
		        this.save('game');
			} else {
    			debug.error("Not enough money or not visitable: " + id);
    			return;
    		}
    	}
    	else{
    		debug.error("Invalid choice: " + id);
    	}
    }

    go_to_page(id) {
    	const page = this.story.pages[id];
    	if(this.page_visited(id) && page.redirect) {
            this.go_to_page(page.redirect)
            return;
    	}


		this.state.page = id;
    }
}

export default MoneyGame