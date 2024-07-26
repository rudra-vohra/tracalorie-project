class Storage{
  static getCalorieLimit(defaultValue = 2000){
    let calorieLimit;
    if(localStorage.getItem('calorieLimit') === null){
      calorieLimit = defaultValue;
    }else{
      calorieLimit = +localStorage.getItem('calorieLimit');
    }

    return calorieLimit;
  }

  static setCalorieLimit(calorieLimit){
    localStorage.setItem('calorieLimit', calorieLimit);
  }

  static getTotalCalories(defaultValue = 0){
    let caloriesTotal;
    if(localStorage.getItem('caloriesTotal') === null){
      caloriesTotal = defaultValue;
    }else{
      caloriesTotal = +localStorage.getItem('caloriesTotal');
    }

    return caloriesTotal;
  }

  static updateTotalCalories(calories){
    localStorage.setItem('caloriesTotal', calories);
  }

  static getMeals(){
    let meals;
    if(localStorage.getItem('meals') === null){
      meals = [];
    }else{
      meals = JSON.parse(localStorage.getItem('meals'));
    }

    return meals;
  }
  
  static addMeal(meal){
    const meals = Storage.getMeals();
    meals.push(meal);
    
    localStorage.setItem('meals', JSON.stringify(meals));
  }

  static removeMeal(id){
    const meals = Storage.getMeals();
    meals.forEach((meal, index) => {
      if(meal.id === id){
        meals.splice(index, 1);
      }
    });

    localStorage.setItem('meals', JSON.stringify(meals));
  }

  
  static getWorkouts(){
    let workouts;
    if(localStorage.getItem('workouts') === null){
      workouts = [];
    }else{
      workouts = JSON.parse(localStorage.getItem('workouts'));
    }

    return workouts;
  }

  static saveWorkout(workout){
    const workouts = Storage.getWorkouts();
    workouts.push(workout);
    
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  static removeWorkout(id){
    const workouts = Storage.getWorkouts();
    workouts.forEach((workout, index) => {
      if(workout.id === id){
        workouts.splice(index, 1);
      }
    });

    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  static clearAll(){
    localStorage.removeItem('workouts');
    localStorage.removeItem('meals');
    localStorage.removeItem('caloriesTotal');
  }

}

export default Storage; 