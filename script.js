const inputElement = document.querySelector(".new-task-input");
const addTaskButton = document.querySelector(".new-task-button");
const searchTask = document.querySelector("#searchTask");

const tasksContainer = document.querySelector(".tasks-container");
console.log(tasksContainer);

const validateInput = () => inputElement.value.trim().length > 0

const handleAddTask = () => {
    const inputIsValid = validateInput();

    console.log(inputIsValid);

    if (!inputIsValid) {
        return inputElement.classList.add("error");
    }

    const pElement = document.querySelector(".no-tasks");
    if (pElement) {
        tasksContainer.removeChild(pElement);
    }

    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = inputElement.value;

    // taskContent.addEventListener('click', () => handleClick(taskContent));

    const actionButtonContainer = document.createElement("div");
    actionButtonContainer.classList.add("action-buttons");

    const completeItem = document.createElement("i");
    completeItem.classList.add("far");
    completeItem.classList.add("fa-check-circle");

    completeItem.setAttribute("title", "Concluir tarefa");

    completeItem.addEventListener('click', () => handleClick(taskContent));

    actionButtonContainer.appendChild(completeItem);

    const editItem = document.createElement("i");
    editItem.classList.add("far");
    editItem.classList.add("fa-edit");

    editItem.setAttribute("title", "Editar tarefa");

    editItem.addEventListener('click', () => handleEditClick(taskContent));

    actionButtonContainer.appendChild(editItem);

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");

    deleteItem.setAttribute("title", "Deletar tarefa");

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

    actionButtonContainer.appendChild(deleteItem);

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(actionButtonContainer);

    tasksContainer.appendChild(taskItemContainer);

    inputElement.value = "";

    updateLocalStorage();

};

const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

        if (currentTaskIsBeingClicked) {
            const taskContent = task.firstChild;
            taskContent.classList.toggle('completed');

            const actionsButtons = taskContent.parentNode.querySelector(".action-buttons");

            // Desabilitadno o fa-edit
            actionsButtons.querySelector(".fa-edit").classList.toggle("disabled");

            // Lógica para alterar o botão de check para undo
            const checkItem = actionsButtons.querySelector(".fa-check-circle") || actionsButtons.querySelector(".fa-undo-alt");
       
            if (checkItem.classList.contains("fa-check-circle")) {
                checkItem.classList.remove("far");
                checkItem.classList.remove("fa-check-circle");
                checkItem.classList.add("fas");
                checkItem.classList.add("fa-undo-alt");
                checkItem.setAttribute("title", "Retirar concluído");
            } else {
                checkItem.classList.remove("fas");
                checkItem.classList.remove("fa-undo-alt");
                checkItem.classList.add("far");
                checkItem.classList.add("fa-check-circle");
                checkItem.setAttribute("title", "Concluir tarefa");
            }
        }
    }

    updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent);

        if (currentTaskIsBeingClicked) {
            taskItemContainer.remove();
        }
    }

    updateLocalStorage();
}

const handleEditClick = (taskContent) => {
    if (!taskContent.classList.contains('completed')) {
        taskContent.setAttribute('contentEditable', 'true');
        taskContent.classList.add('editable');
        taskContent.focus();

        // Desabilitadno o fa-edit
        document.querySelector(".fa-edit").classList.add("disabled");

        const saveChanges = () => {
            taskContent.removeAttribute('contentEditable');
            taskContent.classList.remove('editable');

            const newTaskName = taskContent.innerText;

            if (newTaskName) {
                taskContent.textContent = newTaskName;
                updateLocalStorage();
            }

            document.querySelector(".fa-edit").classList.remove("disabled");
        }
        
        taskContent.addEventListener('blur', saveChanges)
        taskContent.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                saveChanges();
            }
        });
    }
}

const handleInputChange = () => {
    const inputIsValid = validateInput();

    if (inputIsValid) {
        return inputElement.classList.remove("error");
    }
}

const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes;

    const localStorageTasks = [...tasks].map(task => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains('completed')

        return { description: content.innerText, isCompleted };
    });

    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));

    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));
    if (tasksFromLocalStorage.length === 0) {
        const p = document.createElement("p");
        p.classList.add("no-tasks");
        p.innerText = "Sem tarefas por aqui";
       
        tasksContainer.appendChild(p);
    }
};

const handleSearchTasks = () => {
    const searchValue = searchTask.value.toLowerCase();
    const tasks = document.querySelectorAll(".task-item");

    tasks.forEach(task => {
        const taskText = task.textContent.toLowerCase();
        if (taskText.includes(searchValue)) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    })
}

const refreshTaskUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

    if (tasksFromLocalStorage.length > 0) {

        for (const task of tasksFromLocalStorage) {
            const taskItemContainer = document.createElement("div");
            taskItemContainer.classList.add("task-item");

            const taskContent = document.createElement("p");
            taskContent.innerText = task.description;

            if (task.isCompleted) {
                taskContent.classList.add('completed');
            }

            // taskContent.addEventListener('click', () => handleClick(taskContent));

            const actionButtonContainer = document.createElement("div");
            actionButtonContainer.classList.add("action-buttons");

            const completeItem = document.createElement("i");

            if (task.isCompleted) {
                completeItem.classList.add("fas");
                completeItem.classList.add("fa-undo-alt");
                completeItem.setAttribute("title", "Retirar concluído");
            } else {
                completeItem.classList.add("far");
                completeItem.classList.add("fa-check-circle");
                completeItem.setAttribute("title", "Concluir tarefa");
            }           

            completeItem.addEventListener('click', () => handleClick(taskContent));

            actionButtonContainer.appendChild(completeItem);

            const editItem = document.createElement("i");
            editItem.classList.add("far");
            editItem.classList.add("fa-edit");

            if (task.isCompleted) {
                editItem.classList.add("disabled");
            }

            editItem.setAttribute("title", "Editar tarefa");

            editItem.addEventListener('click', () => handleEditClick(taskContent));

            actionButtonContainer.appendChild(editItem);

            const deleteItem = document.createElement("i");
            deleteItem.classList.add("far");
            deleteItem.classList.add("fa-trash-alt");

            deleteItem.setAttribute("title", "Deletar tarefa");

            deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));

            actionButtonContainer.appendChild(deleteItem);

            taskItemContainer.appendChild(taskContent);
            taskItemContainer.appendChild(actionButtonContainer);
            
            tasksContainer.appendChild(taskItemContainer);
        }

    }
    else {
        const p = document.createElement("p");
        p.classList.add("no-tasks");
        p.innerText = "Sem tarefas por aqui";
       
        tasksContainer.appendChild(p);
    }

};

refreshTaskUsingLocalStorage();


addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change", () => handleInputChange());

searchTask.addEventListener("input", () => handleSearchTasks());
