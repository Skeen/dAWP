class MultiSet {
    private set: any;
    constructor() {
	this.set = {}
    }

    add(e: any): boolean {
	if (this.set[e.toString()] === undefined)
	    this.set[e.toString()] = [];
	this.set[e.toString()].push(e);
	return true;
    }

    private trueRemove(e, occ: number): number {
	occ = occ || 1;
	
	if (this.set[e.toString()] === undefined)
	    return 0;
	var count: number = 0;

	for (var i: number = this.set[e.toString()].length-1; i >= 0; i--){
	    if(e === this.set[e.toString()][i]){
		this.set[e.toString()].splice(i, 1);
		count++;
		if (count == occ)
		    break;
	    }	
	}

	return count;
    }

    remove(e: any, occ?: number) {
	if (occ === undefined) {
	    return this.trueRemove(e, 0) === 1;
	} else {
	    return this.trueRemove(e, occ);
	}
    }

    count(e): number {
	if (this.set[e.toString()] === undefined)
	    return 0;
	var count: number = 0;
	for (var i: number = 0; i < this.set[e.toString()].length; i++){
	    if (e === this.set[e.toString()][i])
		count++;
	}
	return count;
    }

    contains(e): boolean {
	if (this.set[e.toString()] === undefined)
	    return false;
	for (var i: number = 0; i < this.set[e.toString()].length; i++){
	    var s = this.set[e.toString()][i];
	    if (s === e)
		return true;
	}
	return false;
    }
    
    toString(): string {
	var str: string = "";
	for (var key in this.set){
	    str += "<span class='key'>'" + key + "':</span> " + JSON.stringify(this.set[key]) + "<br>\n";
	}
	return str;
    }
}

