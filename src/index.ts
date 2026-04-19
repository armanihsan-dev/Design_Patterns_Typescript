class Dog {
  //This says: "Inside the Dog class, there is a static variable called dogName. This variable can ONLY hold things that ARE Dog objects.
  static dogName: Dog;
}

Dog.dogName = new Dog();
Dog.dogName
