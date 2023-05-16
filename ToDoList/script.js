// Task List

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const filterButtons = document.getElementById("filter-buttons");

let tasks = [];

// Add a new task
function addTask(event) {
  event.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false
    };
    tasks.push(task);
    displayTasks();
    taskInput.value = "";
  }
}

// Display the tasks
function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const taskElement = createTaskElement(task);
    taskList.appendChild(taskElement);
  });
}

// Create a task element
function createTaskElement(task) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");
  if (task.completed) {
    taskElement.classList.add("completed");
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.classList.add("task-checkbox");
  checkbox.dataset.taskId = task.id;

  const taskText = document.createElement("span");
  taskText.textContent = task.text;

  const taskActions = document.createElement("div");
  taskActions.classList.add("task-actions");

  const editButton = createActionButton("Edit");
  editButton.addEventListener("click", () => editTask(task.id));

  const deleteButton = createActionButton("Delete");
  deleteButton.addEventListener("click", () => deleteTask(task.id));

  taskActions.append(editButton, deleteButton);

  taskElement.append(checkbox, taskText, taskActions);

  return taskElement;
}

// Create an action button
function createActionButton(text) {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add("action-button");
  return button;
}

// Toggle task completion
function toggleTask(event) {
  if (event.target.classList.contains("task-checkbox")) {
    const taskId = Number(event.target.dataset.taskId);
    const task = tasks.find(task => task.id === taskId);
    task.completed = !task.completed;
    event.target.parentNode.classList.toggle("completed");
  }
}

// Delete a task
function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  displayTasks();
}

// Edit a task
function editTask(taskId) {
  const task = tasks.find(task => task.id === taskId);
  const newText = prompt("Edit task:", task.text);
  if (newText !== null) {
    task.text = newText.trim();
    displayTasks();
  }
}

// Filter tasks
function filterTasks(event) {
  const filter = event.target.textContent.toLowerCase();
  const filteredTasks = filter === "completed" ?
    tasks.filter(task => task.completed) :
    filter === "active" ?
    tasks.filter(task => !task.completed) :
    tasks;
  displayFilteredTasks(filteredTasks);
}

// Display filtered tasks
function displayFilteredTasks(filteredTasks) {
  taskList.innerHTML = "";
  filteredTasks.forEach(task => {
    const taskElement = createTaskElement(task);
    taskList.appendChild(taskElement);
  });
}

// Event listeners
taskForm.addEventListener("submit", addTask);
taskList.addEventListener("click", toggleTask);
filterButtons.addEventListener("click", filterTasks);

// Display the initial tasks
displayTasks();
