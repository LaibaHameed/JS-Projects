// Define a Task class to represent individual tasks
class Task {
  constructor(id, name, completed) {
    this.id = id;
    this.name = name;
    this.completed = completed;
  }
}

// Define a TaskManager class to handle tasks and interactions
class TaskManager {
  constructor() {
    // Initialize savedTasks array from local storage or create an empty array
    this.savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Get DOM elements
    this.taskContainer = document.querySelector("#tasks");
    this.newTaskInput = document.querySelector(".textInput");
    this.error = document.querySelector("#error");
    this.addBtn = document.querySelector("#add-btn");

    // Add event listeners for the "Add" button and Enter key press
    this.addBtn.addEventListener("click", this.addTask.bind(this));
    this.newTaskInput.addEventListener("keypress", (event) => {
      if (event.keyCode === 13) {
        this.addTask();
      }
    });

    // Load tasks from local storage and render them
    this.loadTasks();
  }

  // Update local storage with the current savedTasks array
  updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.savedTasks));
  }

  // Load tasks from savedTasks and render them on the page
  loadTasks() {
    this.savedTasks.forEach((savedTaskData) => {
      const task = new Task(
        savedTaskData.id,
        savedTaskData.name,
        savedTaskData.completed
      );
      this.renderTask(task);
    });
  }

  // Render a task on the page
  renderTask(task) {
    // Create task element and its components
    const taskElement = document.createElement("section");
    taskElement.classList.add("task");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = task.id;
    checkbox.checked = task.completed;

    const taskNameElement = document.createElement("span");
    taskNameElement.classList.add("task-name");
    taskNameElement.textContent = task.name;
    if (task.completed) {
      taskNameElement.classList.add("completed");
    }

    const editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.textContent = "edit";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "delete";

    // Append elements to the task container
    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskNameElement);
    taskElement.appendChild(editButton);
    taskElement.appendChild(deleteButton);

    // Set up event handlers for interactions
    checkbox.onchange = () => {
      task.completed = checkbox.checked;
      taskNameElement.classList.toggle("completed");
      this.updateLocalStorage();
    };

    deleteButton.onclick = () => {
      taskElement.remove();
      const taskIndex = this.savedTasks.findIndex(
        (savedTask) => savedTask.id === task.id
      );
      if (taskIndex !== -1) {
        this.savedTasks.splice(taskIndex, 1);
        this.updateLocalStorage();
      }
    };

    editButton.onclick = () => {
      this.newTaskInput.value = task.name;
      taskElement.remove();
      const taskIndex = this.savedTasks.findIndex(
        (savedTask) => savedTask.id === task.id
      );
      if (taskIndex !== -1) {
        this.savedTasks.splice(taskIndex, 1);
        this.updateLocalStorage();
        this.newTaskInput.focus();
      }
    };

    // Append the task element to the task container
    this.taskContainer.appendChild(taskElement);
  }

  // Add a new task
  addTask() {
    const taskName = this.newTaskInput.value.trim();
    this.error.style.display = "none";
    if (!taskName) {
      setTimeout(() => {
        this.error.style.display = "block";
      }, 200);
      return;
    }

    // Generate a unique ID for the new task
    const taskId = Date.now().toString();

    // Create a new Task object and add it to savedTasks
    const task = new Task(taskId, taskName, false);
    this.savedTasks.push(task);

    // Update local storage and render the new task
    this.updateLocalStorage();
    this.renderTask(task);

    // Clear the input field and set focus
    this.newTaskInput.value = "";
    this.newTaskInput.focus();
  }
}

// Create an instance of the TaskManager class to start the app
const taskManager = new TaskManager();
