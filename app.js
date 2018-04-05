// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// load all event listeners function
loadEventListeners();

// Load all event listeners
function loadEventListeners() {

  // -----------------------------------
  // loaded content from the Window/from localStorage?
  // gets called right after the "Dow" has loaded
  // Dom Load event
  document.addEventListener('DOMContentLoaded', getTasks);
// -----------------------------------

  // Add task event
  form.addEventListener('submit', addtask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // filter tasks event
  filter.addEventListener('keyup', filterTasks)
}

// ---------------
// Get tasks from Local storage
function getTasks(){
  // initialize a variable
  let tasks;
  // check local storage if there is no tasks in there
  if(localStorage.getItem('tasks') === null) {
    // sert an empty task array
     tasks = [];
  } else {
    // sert task = to whats in localStorage
    // Because localStorage store items in a string format = parse it as JSON
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // loop trough the tasks in localStorage
  tasks.forEach(function(task){
    // createElement in the dom
    // Crete li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li (using input value)
    li.appendChild(document.createTextNode(task));
    //  Create new  link Element
    const link = document.createElement('a');
    // Add class to link
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to the li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
    // console.log(li);
  });
}
// --------------

// AddTask function
function addtask(e){
  //if there is no input
  if(taskInput.value === ''){
    alert('add a task');
  }
  // else create Item.....

   // Crete li element
   const li = document.createElement('li');
   // Add class
   li.className = 'collection-item';
   // Create text node and append to li (using input value)
   li.appendChild(document.createTextNode(taskInput.value));
   //  Create new  link Element
   const link = document.createElement('a');
   // Add class to link
   link.className = 'delete-item secondary-content';
   // Add icon html
   link.innerHTML = '<i class="fa fa-remove"></i>';
   // append the link to the li
   li.appendChild(link);

   // Append li to ul
   taskList.appendChild(li);
   // console.log(li);

  // ------------------store in Local Storage
  // pass our task inputed value into our function inside "addtask function"
  storeTaskInLocalStorage(taskInput.value);
  // -----------------

   // clear input
   taskInput.value = '';


 // prevent form-submit defalt on form
  e.preventDefault();
}

// ----------Store Task-----------
// pass task into our function
function storeTaskInLocalStorage(task){
  // initialize a variable
  let tasks;
  // check local storage if there is no tasks in there
  if(localStorage.getItem('tasks') === null) {
    // sert an empty task array
     tasks = [];
  } else {
    // sert task = to whats in localStorage
    // Because localStorage store items in a string format = parse it as JSON
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // push the "task" past into the function into "tasks" array
  tasks.push(task);
  // then sert it into local Storage as "string"
  // parse the "tasks" into a callback a built in function called "stringify()"
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// -------------------------------

// Remove Task function
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')) {
    // confirmation if statement
    if(confirm('Are you sure?')) {
      // remove li container parent element of parentElement to e.target = i element
      ItemRemoved = e.target.parentElement.parentElement;
      ItemRemoved.remove();

      // Remove from Local Storage
      removeTaskFromLocalStorage(ItemRemoved);
    }
  }
}

// Remove task from Local Storage function
function removeTaskFromLocalStorage(taskItem){
  // initialize a variable
  let tasks;
  // check local storage if there is no tasks in there
  if(localStorage.getItem('tasks') === null) {
    // sert an empty task array
     tasks = [];
  } else {
    // sert task = to whats in localStorage
    // Because localStorage store items in a string format = parse it as JSON
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // loop trough tasks=task in local storage. we can get an index of each
  tasks.forEach(function(task, index){
    // check each taskItem has a "textContent" that is = to the current task in the iteration
    if (taskItem.textContent === task) {
      // if it is === ....delete
      tasks.splice(index, 1);
    }
  });
  // set localStorage / updated
  localStorage.setItem('tasks', JSON.stringify(tasks));

}

// clear tasks function
function clearTasks(e){

  // fist option removes all innerHTML of taskList = collection
  // taskList.innerHTML = '';

  // Faster while loop option
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  // Clear tasks Local Storage
  clearTasksFromLocalStorage();
}

// Clear Task from Local storage
function clearTasksFromLocalStorage(){
  // call localStorage
  localStorage.clear();
}



// Filter tasks function
function filterTasks(e){
  // get letter as its typed in - store as toLowerCase
  const text = e.target.value.toLowerCase();

  // Get all list items with a class of "collection-item"
  // loop trough them - forEach()
  document.querySelectorAll('.collection-item').forEach(
    // pass a function inside = with an iteriator ="task"
    function(task){
      // create a variable to store each child value text as it loops
      const item = task.firstChild.textContent;
      // check if element "child value" is equal to the value of "text" filter input
      // if there is no match its going to equal to negative one (-1)
      if(item.toLowerCase().indexOf(text) != -1){
        // show task
         task.style.display = 'block';
      } else {
         task.style.display = 'none';
      }
    });
}
