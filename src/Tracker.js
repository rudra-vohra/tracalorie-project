import Storage from './Storage.js'

class CalorieTracker{
  constructor(){
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalories = Storage.getTotalCalories();
    this._meals = Storage.getMeals();
    this._workouts = Storage.getWorkouts();

    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCalorieProgress();

    document.getElementById('limit').value = Storage.getCalorieLimit();

  }
  // public methods
  addMeal(meal){
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    Storage.updateTotalCalories(this._totalCalories);
    Storage.addMeal(meal);
    this._displayNewMeal(meal);
    this._render();
  }

  addWorkout(workout){
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    Storage.updateTotalCalories(this._totalCalories);
    this._displayNewWorkout(workout);
    Storage.saveWorkout(workout);
    this._render();
  }

  removeMeal(id){
    const index = this._meals.findIndex((meal) => meal.id === id);

    if(index !== -1){
      const meal = this._meals[index];
      this._totalCalories -= meal.calories;
      Storage.updateTotalCalories(this._totalCalories);
      this._meals.splice(index, 1);
      Storage.removeMeal(id);
      this._render();
    }
  }
  removeWorkout(id){
    const index = this._workouts.findIndex((workout) => workout.id === id);

    if(index !== -1){
      const workout = this._workouts[index];
      this._totalCalories += workout.calories;
      Storage.updateTotalCalories(this._totalCalories);
      this._workouts.splice(index, 1);
      Storage.removeWorkout(id);
      this._render();
    }
  }
  
  setLimit(value){
    this._calorieLimit = value;
    Storage.setCalorieLimit(value);
    this._displayCaloriesLimit();
    this._render();
  }
  reset(){
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    Storage.clearAll();
    this._render();
  }

  // Private Methods

  _displayCaloriesTotal(){
    const caloriesTotalEl = document.getElementById('calories-total');
    caloriesTotalEl.innerHTML = this._totalCalories;
  }

  _displayCaloriesLimit(){
    const caloriesLimitEl = document.getElementById('calories-limit');
    caloriesLimitEl.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed(){
    const caloriesConsumedEl = document.getElementById('calories-consumed');
    const consumed = this._meals.reduce((total, meal) => total  + meal.calories,0);
    caloriesConsumedEl.innerHTML = consumed;
  }
                                  
  _displayCaloriesBurned(){
    const caloriesBurnedEl = document.getElementById('calories-burned');
    const burned = this._workouts.reduce((total, workout) => total  + workout.calories,0);
    caloriesBurnedEl.innerHTML = burned;
  }

  _displayCaloriesRemaining(){
    const caloriesRemainingEl = document.getElementById('calories-remaining');
    const remaining = this._calorieLimit - this._totalCalories;
    const calorieProgressEl = document.getElementById('calorie-progress');

    if(remaining < 0){
      caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');

      calorieProgressEl.classList.remove('bg-success');
      calorieProgressEl.classList.add('bg-danger');
    }else{

      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
      caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');

      calorieProgressEl.classList.add('bg-success');
      calorieProgressEl.classList.remove('bg-danger');
    }
    
    caloriesRemainingEl.innerHTML = remaining;
  }

  _displayCalorieProgress(){
    const calorieProgressEl = document.getElementById('calorie-progress');
    const progress = (this._totalCalories / this._calorieLimit) * 100
    const width = Math.min(progress, 100);

    calorieProgressEl.style.width = `${width}%`;
  }

  _displayNewMeal(meal){
    const mealsEl = document.getElementById('meal-items');
    const mealEl = document.createElement('div');
    mealEl.setAttribute('data-id',meal.id);
    mealEl.classList.add('card', 'my-2');

    mealEl.innerHTML = `
     <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="mx-1">${meal.name}</h4>
        <div
        class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
        >
        ${meal.calories}
      </div>
      <button class="delete btn btn-danger btn-sm mx-2">
        <i class="fa-solid fa-xmark"></i>
      </button>
      </div>
    </div>
    `;
    mealsEl.appendChild(mealEl);
  }
  _displayNewWorkout(workout){
    const workoutsEl = document.getElementById('workout-items');
    const workoutEl = document.createElement('div');
    workoutEl.setAttribute('data-id',workout.id);
    workoutEl.classList.add('card', 'my-2');

    workoutEl.innerHTML = `
     <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="mx-1">${workout.name}</h4>
        <div
        class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
        >
        ${workout.calories}
      </div>
      <button class="delete btn btn-danger btn-sm mx-2">
        <i class="fa-solid fa-xmark"></i>
      </button>
      </div>
    </div>
    `;
    workoutsEl.appendChild(workoutEl);
  }

  _loadMeal(){
    this._meals.forEach((meal) => this._displayNewMeal(meal));
  }
  _loadWorkout(){
    this._workouts.forEach((workout) => this._displayNewWorkout(workout));
  }

  _render(){
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCalorieProgress();
  }
}

export default CalorieTracker;