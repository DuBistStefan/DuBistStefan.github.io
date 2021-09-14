import debug from './engine/debug.js'
import html from './engine/ui/html.js'
import UI from './engine/ui/ui.js'
import TextReplacer from './engine/ui/textReplacer.js'
import SaveLoad from './engine/saveLoad.js'

const byID = id => document.getElementById(id);


class MoneyUI extends UI {
    constructor(game) {
		super(game);
		byID('money_container').style.opacity = 0;
		byID('heading').innerHTML = game.story.title;
		byID('credits').innerHTML = game.story.credits;
		this.anim = {text : {}, btns : {}, money : { amount_display : this.game.state.money}};
		this.settings = SaveLoad.load('settings') || {money: true, text: true};
		
		this.actions = {
			'menu' : (_ => this.toggle_menu()),
			'toggle_animations' : (_ => this.toggle_animations()),
			'new_game' : (_ => this.new_game()),
			'delete_data' : (_ => this.delete_data()),
		}
		this.update();
    }
   
	update() {
		byID('btn_animations').innerHTML = "Animationen " + (this.settings.anim_text ? "deaktivieren" : "aktivieren");
		this.render_page(this.game.state.page);
		this.update_money();
	}

	update_money() {
		const money_div = byID('money_container');
		if(this.game.state.page == 'start')
			money_div.style.opacity = 0;
		else
			money_div.style.opacity = 1;
		
		if(this.settings.anim_money && this.game.state.money != this.anim.money.amount_display){
			this.start_animate_money();
		} else{
			byID('money').innerHTML = this.localize_number(this.game.state.money) + this.game.story.currency;	
		}
	}

	start_animate_money(){
			this.anim.money = { amount_display : this.anim.money.amount_display, amount_start : this.anim.money.amount_display };
			
			if(!this.anim.money.prev_time)
				this.anim.money.animationFrame = window.requestAnimationFrame(time=>this.animate_money(time));
	}

	animate_money(time){
		const target = this.game.state.money;
		const diff_start_abs = Math.abs(target - this.anim.money.amount_start);
		const diff_actual = target - this.anim.money.amount_display;
		const delta_t = time - (this.anim.money.prev_time || time);
		this.anim.money.prev_time = time;

		const money_per_second = (diff_start_abs > 2e9) ? 2e9 : diff_start_abs;
		

		const delta_m = Math.round(money_per_second * delta_t/1000 * Math.sign(diff_actual));
		const new_money = this.anim.money.amount_display + delta_m;
		
		if((this.anim.money.amount_display < target && new_money > target) || 
		   (this.anim.money.amount_display > target && new_money < target))
		{
			this.anim.money.amount_display = target;
			this.anim.money.prev_time = null;
		} else {
			this.anim.money.amount_display = new_money;
			window.requestAnimationFrame(time=>this.animate_money(time));
		}

		byID('money').innerHTML = this.localize_number(this.anim.money.amount_display) + this.game.story.currency;	
	}

	start_animate_text() {
		this.anim.text.start = null;
		this.anim.text.done = -1;
		window.requestAnimationFrame(time=>this.animate_text(time));
	}

	animate_text(time){
		if(!this.anim.text.start)
			this.anim.text.start = time;

		const cps = 55;
		const wedge = 10;
		this.anim.text.pos = -15 + (time - this.anim.text.start)/1000 * cps;
		const min = this.anim.text.done + 1;
		const max = min + wedge; 
		for(let i = min;i<=max;i++){
			const el = byID('anim_' + i);
			let op = 1;
			if(el){
				if(i < this.anim.text.pos){
					op = 1;
					this.anim.text.done = i;
				}else{
					op = 1 - (i - this.anim.text.pos)/wedge;
					if(op < 0)
						op = 0;
				}
				el.style.opacity = op**2;
			}
		}

		if(min < this.anim.text.counter)
			window.requestAnimationFrame(time=>this.animate_text(time));
		else
			this.start_animate_buttons();
	}

	start_animate_buttons(){
		this.anim.btns.start = null;
		this.anim.btns.next = 0;
		window.requestAnimationFrame(time=>this.animate_buttons(time));
	}

	animate_buttons(time){
		if(!this.anim.btns.start)
			this.anim.btns.start = time;
		
		let t = (time - this.anim.btns.start)/1000;

		const bps = 1;
		const cur = this.anim.btns.next;
		let op = (t * bps) - cur;
		
		if(op > 1){
			this.anim.btns.next += 1;
			op = 1;
		}

		let btn = this.anim.btns.btns[cur];//byID('btn_'+cur);
		if(btn){
			btn.style.opacity = op**2;
			if(op==1 && !btn.classList.contains("disabled"))
				btn.disabled = false;
				
			window.requestAnimationFrame(time=>this.animate_buttons(time));
		}
	}



	paragraph_classes(page,pnumber){
		return "p" + pnumber + " " + page.style || "";
	}

	render_page(id) {
		debug.print("Page: " + id);
		const page = this.game.story.pages[id];
		const texts = Array.isArray(page.text) ? page.text : [page.text];
		
		this.anim.text = {};
		this.anim.text.counter = 0;

		const animate = this.settings.anim_text && !this.game.page_visited(id);

		let pageHTML = "";
		let counter = 0;
		let replacements = [
		    [/\$money/g, this.localize_number(this.game.state.money) + this.game.story.currency],
		    [/\$startmoney/g, this.localize_number(-this.game.story.pages['youare'].cost) + this.game.story.currency],
		    [/\$num_pages/g, Object.keys(this.game.story.pages).length],
		    [/\$seen_pages/g, Object.keys(this.game.meta.visited).length]
		];
		for(let text of texts){
			text = TextReplacer.replace(text, replacements);
			let paragraph = "";
			
			if(animate){		
				let in_tag = false;
				for(let c of text){
					if(c=='<' || c=='&')
						in_tag = true;
					
					if(in_tag)
						paragraph += c;
					else {
						paragraph += html.tagger('span',{id: `anim_${this.anim.text.counter}`, class: 'text_anim'})(c);
						this.anim.text.counter++;	
					}


					if(c=='>' || c==';')
						in_tag = false;
				}
			} else {
				paragraph = text;
			}
			pageHTML += html.tagger('p',{class:this.paragraph_classes(page,counter)})(paragraph);
			counter++;
		}

		this.anim.btns.counter = 0;
		this.anim.btns.btns = [];

		const story = byID('story');
		story.innerHTML = pageHTML;
		
		for(let choice of page.choices){
			if(typeof choice == 'string')
				choice = {page: choice};
            
            if(!this.game.page_condition_met(choice.page))
                continue;

			const btn = this.make_choice_button(choice);
			if(animate){
				btn.style.opacity = 0;
				btn.disabled = true;
				btn.id = `btn_${this.anim.btns.counter}`;
				this.anim.btns.counter++;
				this.anim.btns.btns.push(btn);
			}
			story.appendChild(btn);
		}

		if(this.settings.anim_text){
			this.start_animate_text();
		}

		document.scrollingElement.scrollTop = 0;

	}

	make_choice_button(choice){
		const newPage = this.game.story.pages[choice.page];
		let btn_text = choice.text || newPage.title || debug.error("No page title: " + choice.page);
		if(!choice.hide_cost && newPage.cost !== undefined) {
			btn_text += " (" + this.money_text(-newPage.cost,true) + (newPage.cost_suffix || "") + ")";
		}
		const btn = this.make_button('choose',choice.page,btn_text);

		if(newPage.cost && this.game.state.money < newPage.cost){
			btn.disabled = true;
			btn.classList.add('disabled');
		}
			

		if(this.game.page_visited(choice.page) && !newPage.revisitable){
			btn.disabled = true;
			btn.classList.add('visited','disabled');
		}

		return btn;
	}

	localize_number(amount){
		return Number(amount).toLocaleString(this.game.story.locale);
	}

	money_text(amount,brackets){
		let amount_string = undefined;
		let sign = (amount<=0?"&minus;":"+");
		const absAmount = Math.abs(amount);

		if(absAmount >= 1e9)
			amount_string = this.localize_number(Math.floor(absAmount/1e8)/10) + " Milliarden ";
		else if(absAmount >= 1e6)
			amount_string = this.localize_number(Math.floor(absAmount/1e5)/10) + " Millionen ";
		else
			amount_string = this.localize_number(absAmount);

		amount_string = sign + amount_string + this.game.story.currency;
		return html.tagger('span',{class: 'money'})(amount_string);
	}

	ui_action(id,value){
		super.ui_action(id,value);
		if(id != 'menu')
			this.toggle_menu(); //close menu after selection
	}

	toggle_menu(){
		//const scroll_height_prev = document.body.scrollHeight;
		//TODO: keep button where it was on click

		byID('menu').classList.toggle('open');

		const scrollingElement = (document.scrollingElement || document.body);
		scrollingElement.scrollTop = scrollingElement.scrollHeight;
	}

	toggle_animations(){
		this.settings.anim_text = !this.settings.anim_text;
		this.settings.anim_money = this.settings.anim_text;
		
		this.anim.money.amount_display = this.game.state.money;

		SaveLoad.save('settings',this.settings);
		this.update();
	}

	new_game(){
		if(window.confirm("Spiel neu starten?")){
			SaveLoad.delete_data('game');
			this.game.new_game();
			this.update();
		}
		
	}

	delete_data(){
		if(window.confirm("Alle gespeicherten Daten löschen und Spiel neu starten?")){
			SaveLoad.delete_data('meta');
			SaveLoad.delete_data('settings');
			SaveLoad.delete_data('game');
			this.game.new_game();
			this.update();
		}
	}
}

export default MoneyUI