class Meal{
  constructor(name,calories){
    this.id = Math.random().toString(16);
    this.name =  name;
    this.calories =  calories;
    }
  }
  
  class Workout{
  constructor(name,calories){
    this.id = Math.random().toString(16);
    this.name =  name;
    this.calories =  calories;
    }
  }

  export {
    Meal,
    Workout
  }