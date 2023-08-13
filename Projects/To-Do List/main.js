const newTaskInput = document.querySelector(".textInput");
const addBtn = document.querySelector("#add-btn");
const taskContainer = document.querySelector("#tasks");
const taskCount = document.querySelector(".count-value");
const error = document.querySelector("#error");

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return
    }

    const task = `<section class="task">
    <input type="checkbox" name="" id="task-check">
    <span class="task-name">${taskName}</span>
    <button class="edit">edit</button>
    <button class="delete">delete</button>
    </section>`;

    taskContainer.insertAdjacentHTML("beforeend", task);
    newTaskInput.value = "";

    const deleteBtn = document.querySelectorAll(".delete");
    deleteBtn.forEach(button => {
        button.onclick = () => {
            button.parentNode.remove();
        };
    });

    const editBtn = document.querySelectorAll(".edit");
    editBtn.forEach(editbutton => {
        editbutton.onclick = (e) => {
            // The target property returns the element on which the event occurred
            let targetElement = e.target;
            if (!(e.target.className == "edit")) {
                targetElement = e.target.parentElement;
            }
            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
        };
    });

    const taskCheck = document.querySelectorAll("#task-check");
    taskCheck.forEach((checkBox) => {
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle("completed");
        }
    });

    newTaskInput.value = "";
}

addBtn.addEventListener("click", addTask)


window.onload = () => {
    newTaskInput.value = "";
}