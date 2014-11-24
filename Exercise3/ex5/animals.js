var Cat, Dog;

(function() {
    var Pet = Class.create({
	initialize: function(name) {
	    this.getName = function() {
		return name;
	    }
	},


	sound: function() {
	    return this._sound;
	}
    });

    Cat = Class.create(Pet, {
	initialize: function($super, name) {
	    $super(name);
	    this._sound = "puny meow";
	}
    });

    Dog = Class.create(Pet, {
	initialize: function($super, name) {
	    $super(name);
	    this._sound = "mighty WUF!";
	}
    });
})();

(function($) {
$(function() {
    var $testArea = $("#testArea");
    var $propertyField = $("#propertyName");
    var $objects = $("#objects");
    var $nameField = $("#petName");

    var logItemize = function(animal) {
	var name = animal.getName();
	var sound = animal.sound();

	$li = $("<li />", {
	    text: name + " says " + sound
	});

	return $li;
    };

    var logPropertyTest = function(animal) {
	var propertyName = $propertyField.val();
	var propertyTest = propertyName + " property: " + animal[propertyName];
	$li = $("<li />", {
	    text: animal.getName() + ": Tried to access " + propertyTest
	});

	return $li;
	 
    };

    var createPet = function(pet, klass) {
	var name = $nameField.val();
	var $div = $("<div />", {
	    "class": klass,
	    data: { pet: new pet(name) }
	});
	var $makeSound = $("<button />", {
	    type: "button",
	    "class": "makeSound",
	    text: "Make sound"
	});
	var $makeTest = $("<button />", {
	    type: "button",
	    "class": "makeTest",
	    text: "Test property"
	});

	$div.append($("<p>", { text: name }));
	$div.append($makeSound);
	$div.append($("<br>"));
	$div.append($makeTest);
	$objects.append($div);
    };
    
    $("#catBtn").on("click", function() {
	createPet(Cat, "cat");
    });

    $("#dogBtn").on("click", function() {
	createPet(Dog, "dog");
    });

    $objects.on("click", ".makeTest", function() {
	$this = $(this);
	var pet = $this.parent().data("pet");
	$testArea.append(logPropertyTest(pet));
    });

    $objects.on("click", ".makeSound", function() {
	$this = $(this);
	var pet = $this.parent().data("pet");
	$testArea.append(logItemize(pet));
    });
});
})(jQuery);
