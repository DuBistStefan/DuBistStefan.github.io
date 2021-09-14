import d from './engine/debug.js'
import html from './engine/ui/html.js'
import TextReplacer from './engine/ui/textReplacer.js'
import story from './story/quandt.js'
import QRCode from './qrcode.js'


const printing = {

    rand_element : function(list){
        return list[Math.floor((Math.random()*list.length))];
    },

    get_card : function(){
        const fact = printing.rand_element(story.facts)
        const host = html.h3(document.location.host);
        const code = html.tagger('div',{class:'qrcode'})("");
        const footer = html.tagger('div',{class:'cardfooter'})(
                       html.h1(story.title)
                     + html.tagger('h4')(story.tagline)
                     + html.tagger('div',{class: 'url-info'})(host+code));
        const cardtext = html.div(TextReplacer.replace(fact)) + footer;
        return html.tagger('div',{class: 'card'})(cardtext);
    },

    generate_page : function(){
        const cards = printing.get_card() + printing.get_card() + printing.get_card() + printing.get_card();
        return html.tagger('div',{class: 'page'})(cards);
    },

    add_qrcodes : function(){
        for(let el of document.getElementsByClassName('qrcode')){
            el.innerHTML = "";
            var qrcode = new QRCode(el, {text: "http://" + document.location.host});  
        }
    },

    add_page : function(){
        document.body.innerHTML += printing.generate_page();
        printing.add_qrcodes();
    }
}

export default printing