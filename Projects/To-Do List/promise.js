const newTaskInput = document.querySelector(".textInput");
const addBtn = document.querySelector("#add-btn");
const taskContainer = document.querySelector("#tasks");
const error = document.querySelector("#error");

// Initialize savedTasks array
let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

const updateLocalStorage = () => {
    return new Promise((resolve, reject) => {
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
        resolve();
    });
};

const createTaskElement = (taskData) => {
    const taskElement = document.createElement("section");
    taskElement.classList.add("task");
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "";
    checkbox.id = taskData.id;
    
    const taskNameElement = document.createElement("span");
    taskNameElement.classList.add("task-name");
    taskNameElement.textContent = taskData.name;
    
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
        taskNameElement.classList.toggle("completed");
        taskData.completed = checkbox.checked;
        updateLocalStorage();
    };
    
    deleteButton.onclick = () => {
        taskElement.remove();
        const taskIndex = savedTasks.findIndex(task => task.id === taskData.id);
        if (taskIndex !== -1) {
            savedTasks.splice(taskIndex, 1);
            updateLocalStorage();
        }
    };
    
    editButton.onclick = () => {
        newTaskInput.value = taskData.name;
        taskElement.remove();
        const taskIndex = savedTasks.findIndex(task => task.id === taskData.id);
        if (taskIndex !== -1) {
            savedTasks.splice(taskIndex, 1);
            updateLocalStorage().then(() => {
                newTaskInput.focus();
            });
        }
    };
    
    return taskElement;
};

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const taskId = Date.now().toString();
    const taskData = {
        id: taskId,
        name: taskName,
        completed: false
    };

    savedTasks.push(taskData);
    updateLocalStorage().then(() => {
        const taskElement = createTaskElement(taskData);
        taskContainer.appendChild(taskElement);
        newTaskInput.value = "";
        newTaskInput.focus();
    });
};

document.addEventListener('DOMContentLoaded', () => {
    savedTasks.forEach(savedTaskData => {
        const taskElement = createTaskElement(savedTaskData);
        taskContainer.appendChild(taskElement);
        if (savedTaskData.completed) {
            taskElement.querySelector(".task-name").classList.add("completed");
            taskElement.querySelector("input[type='checkbox']").checked = true;
        }
    });
});

addBtn.addEventListener("click", addTask);

newTaskInput.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        addTask();
    }
});

window.onload = () => {
    newTaskInput.value = "";
};
