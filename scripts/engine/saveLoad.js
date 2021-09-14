const SaveLoad = {
    _replacer : function(key,value){
        return value;
    },

    _reviver : function(key,value){
        return value;
    },

    save : function(name,data){
        const json = JSON.stringify(data,SaveLoad._replacer);
        window.localStorage.setItem(name,json);
    },

    load : function(name){
        const json = localStorage.getItem(name);
        return JSON.parse(json,SaveLoad._reviver);
    },

    delete_data : function(name){
        localStorage.removeItem(name);
    }
}

export default SaveLoad