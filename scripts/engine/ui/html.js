/**
 * 
 */
const help = {
	tagger_simple : tag => (x=>`<${tag}>${x}</${tag}>`),
	tagger : function(tag, attrs){
		const attr_s = attrs ? " " + Object.entries(attrs).map(kv => `${kv[0]}="${kv[1]}"` ).join(" ") : "";
		return (x=>`<${tag}${attr_s}>${x}</${tag}>`)
	} 
}

const html = {
	tagger : help.tagger,
	td : (x=>`<td>${x}</td>`),
	tr : (x=>`<tr>${x}</tr>`),
	div: help.tagger('div'),
	h1: help.tagger('h1'),
	h3: help.tagger('h3'),
	table_content : function(rows){
		return rows.map(
					(row => row.map( (cell => html.td(cell)) ).join(""))
				).map(html.tr).join("");
	},
	table_tag: help.tagger('table'),
	tbody: help.tagger('tbody'),
	table : rows => html.table_tag(html.tbody(html.table_content(rows))),
	hide : (e => e.style.display = "none"),
	show : (e => e.style.display = "block")
}



export default html