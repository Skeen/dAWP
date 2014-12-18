class Pet {
    constructor(public name: string) {}

    getName(): string {
	return this.name;
    }
    
    // Ambigous assigment, technically the sound ain't specified to be here
    // also there's no way to create abstract functions, so this will have to do
    sound(): string { return ""; }
}

class Dog extends Pet {
    sound() { return "Wooof"; }
}

class Cat extends Pet {
    sound() { return "Meow"; }
}

var testDiv = document.getElementById("testDiv");

var odie = new Dog("Odie");
var garfield = new Cat("Garfield");

testDiv.innerHTML += "<p>" + odie.getName()+ " says: " + odie.sound() + "</p>";
testDiv.innerHTML += "<p>" + garfield.getName()+ " says: " + garfield.sound() + "</p>";