// Fast assert for the later tests
var assert = function(x, y, msg) {
    msg = msg || "Failed";

    if (x === y)
	return { success: true };
    else
	return { success: false, message: msg };
}

// The tests themselves
var tests = {
    _multiset: null,
    
    init: function() {
	this._multiset = multiset();
    },

    shouldBeAbleToAdd1: function() {
	this._multiset.add("hej")
	return assert(this._multiset.contains("hej"),
		      true,
		      "The set should contain the key after add.");
    },

    shouldReturnFalseInContainsWhenEIsOnUndefined1: function() {
	// The set is empty, so not matter what we ask it will be undefined
	return assert(this._multiset.contains("foo"),
		      false, "The multiset did not return false even though \"foo\" is undefined in the set.");
    },

    shouldReturnFalseInContainsIfEIsNotInSet: function() {
	//E is not in the set, so false should be returned
	this._multiset.add("2");
	return assert(this._multiset.contains(2),
		      false);	
    },

    shouldReturnTrueInContainsIfEIsInSet: function() {
	//E is in the set, and true should be returned
	this._multiset.add("2");
	return assert(this._multiset.contains("2"),
		      true);
    },

    shouldReturnZeroOnCountIfSetIsEmpty: function() {
	return assert(this._multiset.count("foo"),
		      0);
    },

    shouldReturnOneOnCountIfOneIsPressent: function() {
	this._multiset.add(2);
	return assert(this._multiset.count(2),
		      1);
    },

    shouldReturnThreeOnCountIfThreeIsPressent: function() {
	this._multiset.add(true);
	this._multiset.add(true);
	this._multiset.add(true);
	return assert(this._multiset.count(true), 3);
    },

    shouldReturnThreeOnCountEvenIfDifferentItemsIsPresent: function() {
	this._multiset.add(42);
	this._multiset.add("42");
	this._multiset.add(2);
	this._multiset.add(true);
	this._multiset.add(42);
	this._multiset.add(42);
	return assert(this._multiset.count(42), 3);
    },

    shouldDecreaseLengthOnRemove: function() {
	this._multiset.add(42);
	this._multiset.add("42");
	this._multiset.add(2);
	this._multiset.add(true);
	this._multiset.add(42);
	this._multiset.add(42);
	this._multiset.remove(42);
	return assert(this._multiset.count(42), 2);
    },

    shouldDecreaseLengthOnRemove3: function() {
	this._multiset.add(42);
	this._multiset.add("42");
	this._multiset.add(2);
	this._multiset.add(true);
	this._multiset.add(42);
	this._multiset.add(42);
	this._multiset.remove(42, 3);
	return assert(this._multiset.count(42), 0);
    },

    shouldReturnFalse1: function() {
	this._multiset.add(2);
	this._multiset.add(true);
	return assert(this._multiset.remove(42),
		      false);
    },

    shouldReturnFalse2: function() {
	this._multiset.add(2);
	this._multiset.add("42");
	this._multiset.add(true);
	return assert(this._multiset.remove(42),
		      false);
    },

    shouldReturnTrue: function() {
	this._multiset.add(2);
	this._multiset.add(true);
	this._multiset.add(42);
	return assert(this._multiset.remove(42),
		      true);
    },

    shouldReturn0: function() {
	this._multiset.add(2);
	this._multiset.add(true);
	return assert(this._multiset.remove(42, 1),
		      0);
    },

    shouldReturn0: function() {
	this._multiset.add(2);
	this._multiset.add(true);
	this._multiset.add("42");
	return assert(this._multiset.remove(42, 1),
		      0);
    },

    shouldReturn1: function() {
	this._multiset.add(2);
	this._multiset.add(true);
	this._multiset.add(42);
	this._multiset.add(42);
	this._multiset.add(42);
	return assert(this._multiset.remove(42, 1),
		      1);
    },

    shouldReturn3_1: function() {
	this._multiset.add(2);
	this._multiset.add(true);
	this._multiset.add(42);
	this._multiset.add(42);
	this._multiset.add(42);
	return assert(this._multiset.remove(42, 3),
		      3);
    },

    shouldReturn3_2: function() {
	this._multiset.add(2);
	this._multiset.add(true);
	this._multiset.add(42);
	this._multiset.add(42);
	this._multiset.add(42);
	return assert(this._multiset.remove(42, 5),
		      3);
    }
}

// Simple testrunner for fast execution and nice output
var testRunner = function() {
    var n = 0;
    var errors = 0;
    var res;

    for (t in tests) {
	if (t === "init" || t === "_multiset") {
	    continue;
	}
	tests.init();
	res = tests[t]();
	
	n++;
	if (res.success === false) {
	    errors++;
	    document.getElementById("messages").innerHTML =
		document.getElementById("messages").innerHTML + "<li>" +
		t + " - " + res.message + "</li>";
	    document.getElementById("errors").innerHTML = errors;
	}
	document.getElementById("total").innerHTML = n;
    }
    
    document.getElementById("status").innerHTML = "Done";
}

var runTests = function() {
    testRunner();

    var set = multiset();
    set.add(true);
    set.add("Hej");
    set.add(6);
    set.add("true");
    set.add("6");
    set.add(6);
    set.add(Object);

    var str = set.toString();
    console.log(str);
    
    document.getElementById("toStringBox").innerHTML = str;
}

var start = document.getElementById("start");
if (start.addEventListener === undefined) {
    // Internet Explorer
    start.attachEvent("onclick", runTests)
} else {
    // Sanity
    start.addEventListener("click", runTests);
}
