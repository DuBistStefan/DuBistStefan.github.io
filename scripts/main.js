import MoneyGame from './moneyGame.js'
import UI from './moneyUI.js'
import d from './engine/debug.js'
import story from './story/quandt.js'


const game = new MoneyGame(story);
if(window.location.hash == '#debug') {
    game.add_debug_page();
}
game.load('game');
const ui = new UI(game);


export {game, ui}