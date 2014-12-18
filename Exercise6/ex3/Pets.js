var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Pet = (function () {
    function Pet(name) {
        this.name = name;
    }
    Pet.prototype.getName = function () {
        return this.name;
    };
    // Ambigous assigment, technically the sound ain't specified to be here
    // also there's no way to create abstract functions, so this will have to do
    Pet.prototype.sound = function () {
        return "";
    };
    return Pet;
})();
var Dog = (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        _super.apply(this, arguments);
    }
    Dog.prototype.sound = function () {
        return "Wooof";
    };
    return Dog;
})(Pet);
var Cat = (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        _super.apply(this, arguments);
    }
    Cat.prototype.sound = function () {
        return "Meow";
    };
    return Cat;
})(Pet);
var testDiv = document.getElementById("testDiv");
var odie = new Dog("Odie");
var garfield = new Cat("Garfield");
testDiv.innerHTML += "<p>" + odie.getName() + " says: " + odie.sound() + "</p>";
testDiv.innerHTML += "<p>" + garfield.getName() + " says: " + garfield.sound() + "</p>";
