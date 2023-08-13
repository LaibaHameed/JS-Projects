class Task {
    constructor(id, name, completed) {
        this.id = id;
        this.name = name;
        this.completed = completed;
    }
}

class TaskManager {
    constructor() {
        this.savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.taskContainer = document.querySelector("#tasks");
        this.newTaskInput = document.querySelector(".textInput");
        this.error = document.querySelector("#error");
        this.addBtn = document.querySelector("#add-btn");

        this.addBtn.addEventListener("click", this.addTask.bind(this));
        this.newTaskInput.addEventListener("keypress", (event) => {
            if (event.keyCode === 13) {
                this.addTask();
            }
        });

        this.loadTasks();
    }

    updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.savedTasks));
    }

    loadTasks() {
        this.savedTasks.forEach(savedTaskData => {
            const task = new Task(savedTaskData.id, savedTaskData.name, savedTaskData.completed);
            this.renderTask(task);
        });
    }

    renderTask(task) {
        const taskElement = document.createElement("section");
        taskElement.classList.add("task");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "";
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

        taskElement.appendChild(checkbox);
        taskElement.appendChild(taskNameElement);
        taskElement.appendChild(editButton);
        taskElement.appendChild(deleteButton);

        checkbox.onchange = () => {
            task.completed = checkbox.checked;
            taskNameElement.classList.toggle("completed");
            this.updateLocalStorage();
        };

        deleteButton.onclick = () => {
            taskElement.remove();
            const taskIndex = this.savedTasks.findIndex(savedTask => savedTask.id === task.id);
            if (taskIndex !== -1) {
                this.savedTasks.splice(taskIndex, 1);
                this.updateLocalStorage();
            }
        };

        editButton.onclick = () => {
            this.newTaskInput.value = task.name;
            taskElement.remove();
            const taskIndex = this.savedTasks.findIndex(savedTask => savedTask.id === task.id);
            if (taskIndex !== -1) {
                this.savedTasks.splice(taskIndex, 1);
                this.updateLocalStorage();
                this.newTaskInput.focus();
            }
        };

        this.taskContainer.appendChild(taskElement);
    }

    addTask() {
        const taskName = this.newTaskInput.value.trim();
        this.error.style.display = "none";
        if (!taskName) {
            setTimeout(() => {
                this.error.style.display = "block";
            }, 200);
            return;
        }

        const taskId = Date.now().toString();
        const task = new Task(taskId, taskName, false);
        this.savedTasks.push(task);
        this.updateLocalStorage();
        this.renderTask(task);

        this.newTaskInput.value = "";
        this.newTaskInput.focus();
    }
}

const taskManager = new TaskManager();
