/// <reference path="multiset.ts" />

// Fast assert for the later tests
var assert = function(x, y, msg: string = "Failed") {
    if (x !== y)
	throw msg;
}

interface UnitTest {
    init(): void;
}

// The tests themselves
var tests: UnitTest = {
    _multiset: null,
    
    init: function() {
	this._multiset = new MultiSet();
    },

    shouldBeAbleToAdd1: function() {
	this._multiset.add("hej");
	assert(this._multiset.contains("hej"),
	       true,
	       "The set should contain the key after add.");
    },

    shouldReturnFalseInContainsWhenEIsOnUndefined1: function() {
	// The set is empty, so not matter what we ask it will be undefined
	assert(this._multiset.contains("foo"),
	       false, "The multiset did not return false even though \"foo\" is undefined in the set.");
    },

    shouldReturnFalseInContainsIfEIsNotInSet: function() {
	//E is not in the set, so false should be returned
	this._multiset.add("2");
	assert(this._multiset.contains(2),
	       false);	
    },

    shouldReturnTrueInContainsIfEIsInSet: function() {
	//E is in the set, and true should be returned
	this._multiset.add("2");
	assert(this._multiset.contains("2"),
	       true);
    },

    shouldReturnZeroOnCountIfSetIsEmpty: function() {
	assert(this._multiset.count("foo"),
	       0);
    },

    shouldReturnOneOnCountIfOneIsPressent: function() {
	this._multiset.add(2);
	assert(this._multiset.count(2),
	       1);
    },

    shouldReturnThreeOnCountIfThreeIsPressent: function() {
	this._multiset.add(true);
	this._multiset.add(true);
	this._multiset.add(true);
	assert(this._multiset.count(true), 3);
    },

    shouldReturnThreeOnCountEvenIfDifferentItemsIsPresent: function() {
	this._multiset.add(42);
	this._multiset.add("42");
	this._multiset.add(2);
	this._multiset.add(true);
	this._multiset.add(42);
	this._multiset.add(42);
	assert(this._multiset.count(42), 3);
    },

    shouldDecreaseLengthOnRemove: function() {
	this._multiset.add(42);
	this._multiset.add("42");
	this._multiset.add(2);
	this._multiset.add(true);
	this._multiset.add(42);
	this._multiset.add(42);
	this._multiset.remove(42);
	assert(this._multiset.count(42), 2);
    },

    shouldDecreaseLengthOnRemove3: function() {
	this._multiset.add(42);
	this._multiset.add("42");
	this._multiset.add(2);
	this._multiset.add(true);
	this._multiset.add(42);
	this._multiset.add(42);
	this._multiset.remove(42, 3);
	assert(this._multiset.count(42), 0);
    },

    shouldReturnFalse1: function() {
	this._multiset.add(2);
	this._multiset.add(true);
	assert(this._multiset.remove(42),
	       false);
    },

    shouldReturnFalse2: function() {
	this._multiset.add(2);
	this._multiset.add("42");
	this._multiset.add(true);
	assert(this._multiset.remove(42),
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
	assert(this._multiset.remove(42, 1),
	       0);
	
	this._multiset.add(2);
	this._multiset.add(true);
	this._multiset.add("42");
	assert(this._multiset.remove(42, 1),
	       0);
    },

    shouldReturn1: function() {
	this._multiset.add(2);
	this._multiset.add(true);
	this._multiset.add(42);
	this._multiset.add(42);
	this._multiset.add(42);
	assert(this._multiset.remove(42, 1),
	       1);
    },

    shouldReturn3_1: function() {
	this._multiset.add(2);
	this._multiset.add(true);
	this._multiset.add(42);
	this._multiset.add(42);
	this._multiset.add(42);
	assert(this._multiset.remove(42, 3),
	       3);
    },

    shouldReturn3_2: function() {
	this._multiset.add(2);
	this._multiset.add(true);
	this._multiset.add(42);
	this._multiset.add(42);
	this._multiset.add(42);
	assert(this._multiset.remove(42, 5),
	       3);
    }
}

// Simple testrunner for fast execution and nice output
class TestRunner {
    private n: number;
    private errors: number;

    constructor() {}
    
    runTests(tests: any): void {
	document.getElementById("status").innerHTML = "Testing";
	var messages = document.getElementById("messages");
	this.n = 0;
	this.errors = 0;

	for (var t in tests) {
	    if (t === "init" || t === "_multiset")
		continue;

	    tests.init();
	    try {
		this.n++;
		tests[t];
	    } catch (e) {
		this.errors++;
		messages.innerHTML = messages.innerHTML + "<li>" + t + " - " + e + "</li>";
		document.getElementById("errors").innerHTML = this.errors.toString();
	    }

	    document.getElementById("total").innerHTML = this.n.toString();
	}
	document.getElementById("status").innerHTML = "Done";
    }
}

var runTests = function() {
    var runner = new TestRunner();
    runner.runTests(tests);

    var set = new MultiSet();
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
