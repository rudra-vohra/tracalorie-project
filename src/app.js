import '@fortawesome/fontawesome-free/js/all';
import { Modal, Collapse} from 'bootstrap'; 
import CalorieTracker from './Tracker.js';
import {Meal , Workout} from './Item.js';
import './css/bootstrap.css';
import './css/style.css';


class App {
    constructor() {
      this._tracker = new CalorieTracker();
  
      document
        .getElementById('meal-form')
        .addEventListener('submit', this._newItem.bind(this, 'meal'));
      document
        .getElementById('workout-form')
        .addEventListener('submit', this._newItem.bind(this, 'workout'));
      
      document.getElementById('meal-items').addEventListener('click', this._removeItem.bind(this, 'meal'));

      document.getElementById('workout-items').addEventListener('click', this._removeItem.bind(this, 'workout'));

      document.getElementById('filter-meals').addEventListener('keyup', this._filterItems.bind(this,'meal'));

      document.getElementById('filter-workouts').addEventListener('keyup', this._filterItems.bind(this,'workout'));

      document.getElementById('reset').addEventListener('click', this._reset.bind(this));

      document.getElementById('limit-form').addEventListener('submit', this._setLimit.bind(this));

      this._tracker._loadMeal();
      this._tracker._loadWorkout();
    }

    _newItem(type,e) {
      e.preventDefault();

      const name = document.getElementById(`${type}-name`);
      const calories = document.getElementById(`${type}-calories`);
  
      if (name.value === '' || calories.value === '') {
        alert('Please fill in all fields');
        return;
      }

      if(type === 'meal'){
        // Create a new meal
        const meal = new Meal(name.value, +calories.value);
        
        // Add the meal to the tracker
        this._tracker.addMeal(meal);
      }

      if(type === 'workout'){
        // Create a new workout
        const workout = new Workout(name.value, +calories.value);

        // Add the workout to the tracker
        this._tracker.addWorkout(workout);
      }
  
      // Clear the form
      name.value = '';
      calories.value = '';

      // Collapse form
      const collapseForm = document.getElementById(`collapse-${type}`);
      const bsCollapse = new Collapse(collapseForm,{
        toggle: true,
      });
    }

    _removeItem(type, e){
      if(e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark')){
        if(confirm('Are you sure')){
          const id = e.target.closest('.card').getAttribute('data-id');

          type === 'meal'
            ? this._tracker.removeMeal(id):this._tracker.removeWorkout(id);

          e.target.closest('.card').remove();
        }
      }
    }

    _filterItems(type, e){
      const text = e.target.value.toLowerCase();
      document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
        const name = item.firstElementChild.firstElementChild.textContent;

        if(name.toLowerCase().indexOf(text) !== -1){
          item.style.display = 'block';
        }else{
          item.style.display = 'none';
        }
      })
    }

    _reset(){
      this._tracker.reset();
      document.getElementById('meal-items').innerHTML = '';
      document.getElementById('workout-items').innerHTML = '';
      document.getElementById('filter-meals').value = '';
      document.getElementById('filter-workouts').value = '';
    }

    _setLimit(e){
      e.preventDefault();
      const limit = document.getElementById('limit');
      
      if(limit.value === ''){
        alert('Please set a limit');
        return;
      }
      this._tracker.setLimit(+limit.value);

      const modalEl = document.getElementById('limit-modal');
      const modal = Modal.getInstance(modalEl);
      modal.hide();
    }
}

const app = new App();