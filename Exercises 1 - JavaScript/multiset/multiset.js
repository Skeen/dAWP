var multiset = function() {
    var set = {};
    var trueRemove = function(e, occ) {
	occ = occ || 1;
	
	if (set[e.toString()] === undefined)
	    return 0;
	var count = 0;
	for (i = set[e.toString()].length-1; i >= 0; i--){
	    if(e === set[e.toString()][i]){
		set[e.toString()].splice(i, 1);
		count++;
		if (count == occ)
		    break;
	    }	
	}

	return count;
    };
    
    return {
	add: function(e) {
	    if (set[e.toString()] === undefined)
		set[e.toString()] = [];
	    set[e.toString()].push(e);
	    return true;
	},

	remove: function(e, occ) {
	    if (occ === undefined){
		return trueRemove(e) === 1;
	    } else {
		return trueRemove(e, occ);
	    }
	},

	count: function(e) {
	    if (set[e.toString()] === undefined)
		return 0;
	    var count = 0;
	    for (i = 0; i < set[e.toString()].length; i++){
		if (e === set[e.toString()][i])
		    count++;
	    }
	    return count;
	},

	contains: function(e) {
	    if (set[e.toString()] === undefined)
		return false;
	    for (i = 0; i < set[e.toString()].length; i++){
		var s = set[e.toString()][i];
		if (s === e)
		    return true;
	    }
	    return false;
	},

	toString: function() {
	}
    }
}
