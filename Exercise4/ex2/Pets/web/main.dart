// Copyright (c) 2014, <your name>. All rights reserved. Use of this source code
// is governed by a BSD-style license that can be found in the LICENSE file.

import 'dart:html';
import 'dart:mirrors';

InputElement petName = querySelector("#petName");
DivElement objects = querySelector("#objects");
UListElement testArea = querySelector("#testArea");
InputElement propertyName = querySelector("#propertyName");

void main() {
  ButtonElement catBtn = querySelector("#catBtn"),
      dogBtn = querySelector("#dogBtn");
  
  catBtn.onClick.listen(addCat);
  dogBtn.onClick.listen(addDog);
}

abstract class Pet {
  String _name;
  Pet(this._name);
  
  String getName() => this._name;
  String sound();
}

class Dog extends Pet {
  Dog(name) : super(name);
  
  sound() => "Mighty WOOOOF!";
}

class Cat extends Pet {
  Cat(name) : super(name);
  
  sound() => "Puny miav";
}

void addDog(Event event) {
  Dog dog = new Dog(petName.value);
  addPet(dog);
}

void addCat(Event event) {
  Cat cat = new Cat(petName.value);
  addPet(cat);
}

void addPet(Pet pet) {
  DivElement animal = new DivElement();
  animal.text = pet.getName();
  animal.classes.add(pet.runtimeType.toString());
  
  ButtonElement makeSound = new ButtonElement();
  makeSound.text = "Make sound";
  makeSound.onClick.listen((event) {
    onSound(pet);
  });
  animal.children.add(makeSound);
  
  ButtonElement testProperty = new ButtonElement();
  testProperty.text = "Test property";
  testProperty.onClick.listen((event) {
    onProperty(pet);
  });
  animal.children.add(testProperty);
  
  objects.children.add(animal);
}

void addUl(String text) {
  LIElement li = new LIElement();
  li.text = text;
  testArea.children.add(li);
}

void onSound(Pet pet) {
  addUl(pet.getName() + ": " + pet.sound());
}

void onProperty(Pet pet) {
  String prop = propertyName.value;
  try {
    var propVal = reflect(pet).getField(new Symbol(prop)).reflectee;
    addUl(pet.getName() + " " + propVal.toString());
  } catch(ex, trace) {
    addUl(pet.getName() + " doesn't have the property " + prop);
  }
}