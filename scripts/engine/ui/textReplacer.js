const TextReplacer = {
	date_string : function(){
		const d = new Date();
		return d.getDate() + "." + (d.getMonth()+1) + "." + d.getFullYear();
	},

	time_string : function(){
		const digits = (n => n.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}))
		const d = new Date();
		return digits(d.getHours()) + ":" + digits(d.getMinutes());
	},

	replace : function(text,extra_replacements){
		text = text.replace(/\$datetime/g,"$date - $time");
		text = text.replace(/\$date/g,TextReplacer.date_string());
		text = text.replace(/\$time/g,TextReplacer.time_string());
		text = text.replace(/\$CC-BY-SA-4.0/g,"<a href='https://creativecommons.org/licenses/by-sa/4.0/deed'>CC-BY-SA-4.0</a>");
		
		const re_img = /!\[(.+?)\]\((.+?)\)/g;
		text = text.replace(re_img, '<img src="media/$2" alt="$1">');

		const re_link = /\[(.+?)\]\((.+?)\)/g;
		text = text.replace(re_link, '<a href="$2">$1</a>');
		
		const re_bold = /\*\*(.+?)\*\*/g;
		text = text.replace(re_bold, '<strong>$1</strong>');

		const re_italic = /\*(.+?)\*/g;
		text = text.replace(re_italic, '<em>$1</em>');

		const re_class = /\[(.+?)\]\{(.+?)\}/g;
		text = text.replace(re_class, '<span class="$2">$1</span>');

		for (let rep of (extra_replacements || []) ){
			text = text.replace(rep[0],rep[1])
		}

		return text;
	},
}



export default TextReplacer