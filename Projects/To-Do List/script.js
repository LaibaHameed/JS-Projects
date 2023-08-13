const newTaskInput = document.querySelector(".textInput");
const addBtn = document.querySelector("#add-btn");
const taskContainer = document.querySelector("#tasks");
const error = document.querySelector("#error");

// Initialize savedTasks array
let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

const updateLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
};

// Main Function
const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    // Generate a unique ID for the task
    const taskId = Date.now().toString();

    const taskData = {
        id: taskId,
        name: taskName,
        completed: false
    };

    savedTasks.push(taskData);
    updateLocalStorage();

    const task = `<section class="task">
                    <input type="checkbox" name="" id="${taskId}">
                    <span class="task-name">${taskName}</span>
                    <button class="edit">edit</button>
                    <button class="delete">delete</button>
                  </section>`;
    taskContainer.insertAdjacentHTML("beforeend", task);
    
    // Check Task function
    const taskCheck = taskContainer.lastElementChild.querySelector("input[type='checkbox']");
    const taskNameElement = taskContainer.lastElementChild.querySelector(".task-name");

    taskCheck.onchange = () => {
        taskNameElement.classList.toggle("completed");
        const taskIndex = savedTasks.findIndex(taskData => taskData.id === taskId);
        if (taskIndex !== -1) {
            savedTasks[taskIndex].completed = taskCheck.checked;
            updateLocalStorage();
        }
    };

    // Delete Task function
    const deleteBtn = taskContainer.lastElementChild.querySelector(".delete");
    deleteBtn.onclick = () => {
        deleteBtn.parentNode.remove();
        const taskIndex = savedTasks.findIndex(taskData => taskData.id === taskId);
        if (taskIndex !== -1) {
            savedTasks.splice(taskIndex, 1);
            updateLocalStorage();
        }
    };

    // Edit Task Function
    const editBtn = taskContainer.lastElementChild.querySelector(".edit");
    editBtn.onclick = (e) => {
        let targetElement = e.target;
        if (!(e.target.className === "edit")) {
            targetElement = e.target.parentElement;
        }
        newTaskInput.value = targetElement.previousElementSibling?.innerText;
        targetElement.parentNode.remove();

        const taskIndex = savedTasks.findIndex(taskData => taskData.id === taskId);
        if (taskIndex !== -1) {
            savedTasks[taskIndex].name = newTaskInput.value.trim();
            updateLocalStorage();
        }
    };

    newTaskInput.value = "";
};

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    savedTasks.forEach(savedTaskData => {
        const task = `<section class="task">
                        <input type="checkbox" name="" id="${savedTaskData.id}">
                        <span class="task-name">${savedTaskData.name}</span>
                        <button class="edit">edit</button>
                        <button class="delete">delete</button>
                      </section>`;
        taskContainer.insertAdjacentHTML("beforeend", task);

        const taskCheck = taskContainer.lastElementChild.querySelector("input[type='checkbox']");
        const taskNameElement = taskContainer.lastElementChild.querySelector(".task-name");

        if (savedTaskData.completed) {
            taskNameElement.classList.add("completed");
            taskCheck.checked = true;
        }

        taskCheck.onchange = () => {
            taskNameElement.classList.toggle("completed");
            const taskIndex = savedTasks.findIndex(taskData => taskData.id === savedTaskData.id);
            if (taskIndex !== -1) {
                savedTasks[taskIndex].completed = taskCheck.checked;
                updateLocalStorage();
            }
        };

        const deleteBtn = taskContainer.lastElementChild.querySelector(".delete");
        deleteBtn.onclick = () => {
            deleteBtn.parentNode.remove();
            const taskIndex = savedTasks.findIndex(taskData => taskData.id === savedTaskData.id);
            if (taskIndex !== -1) {
                savedTasks.splice(taskIndex, 1);
                updateLocalStorage();
            }
        };

        const editBtn = taskContainer.lastElementChild.querySelector(".edit");
        editBtn.onclick = (e) => {
            let targetElement = e.target;
            if (!(e.target.className === "edit")) {
                targetElement = e.target.parentElement;
            }
            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();

            const taskIndex = savedTasks.findIndex(taskData => taskData.id === savedTaskData.id);
            if (taskIndex !== -1) {
                savedTasks[taskIndex].name = newTaskInput.value.trim();
                updateLocalStorage();
            }
        };
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
