const SaveLoad = {
    asked_for_cookies : false,
    cookie_message: "Bitte erlaube Cookies, damit dein Spielstand gespeichert werden kann :) Wir senden nix an niemanden! :)",
    _replacer : function(key,value){
        return value;
    },

    _reviver : function(key,value){
        return value;
    },

    save : function(name,data){
        const json = JSON.stringify(data,SaveLoad._replacer);
        try {
            window.localStorage.setItem(name,json);    
        } catch(e) {
            if(!this.asked_for_cookies) {
                window.alert(this.cookie_message);
                this.asked_for_cookies = true;
            }
        }
        
    },

    load : function(name){
        try {
            const json = localStorage.getItem(name);
            return JSON.parse(json,SaveLoad._reviver);
        } catch(e) {
            if(!this.asked_for_cookies) {
                window.alert(this.cookie_message);
                this.asked_for_cookies = true;
            }
            return undefined
        }
    },

    delete_data : function(name){
    	try {
    	    localStorage.removeItem(name);
        } catch(e) { }
    }
}

export default SaveLoad
