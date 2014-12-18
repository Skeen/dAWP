var MultiSet = (function () {
    function MultiSet() {
        this.set = {};
    }
    MultiSet.prototype.add = function (e) {
        if (this.set[e.toString()] === undefined)
            this.set[e.toString()] = [];
        this.set[e.toString()].push(e);
        return true;
    };
    MultiSet.prototype.trueRemove = function (e, occ) {
        occ = occ || 1;
        if (this.set[e.toString()] === undefined)
            return 0;
        var count = 0;
        for (var i = this.set[e.toString()].length - 1; i >= 0; i--) {
            if (e === this.set[e.toString()][i]) {
                this.set[e.toString()].splice(i, 1);
                count++;
                if (count == occ)
                    break;
            }
        }
        return count;
    };
    MultiSet.prototype.remove = function (e, occ) {
        if (occ === undefined) {
            return this.trueRemove(e, 0) === 1;
        }
        else {
            return this.trueRemove(e, occ);
        }
    };
    MultiSet.prototype.count = function (e) {
        if (this.set[e.toString()] === undefined)
            return 0;
        var count = 0;
        for (var i = 0; i < this.set[e.toString()].length; i++) {
            if (e === this.set[e.toString()][i])
                count++;
        }
        return count;
    };
    MultiSet.prototype.contains = function (e) {
        if (this.set[e.toString()] === undefined)
            return false;
        for (var i = 0; i < this.set[e.toString()].length; i++) {
            var s = this.set[e.toString()][i];
            if (s === e)
                return true;
        }
        return false;
    };
    MultiSet.prototype.toString = function () {
        var str = "";
        for (var key in this.set) {
            str += "<span class='key'>'" + key + "':</span> " + JSON.stringify(this.set[key]) + "<br>\n";
        }
        return str;
    };
    return MultiSet;
})();
