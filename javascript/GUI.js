tasks.forEach(task => {
    addToGUI(task);
    GUIComplete(task);
    task.parseModDateFormat();
});

const form = document.getElementById("addTask");
form.addEventListener("submit", addTask);

function addTask(e) {
    e.preventDefault();
    const task = new Task(this.querySelector('[type = "text"]').value);
    this.reset();
    addToGUI(task);
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addToGUI(tsk) {
    const tasks = document.querySelector("#tasks");

    tsk.GUIel = document.createElement("div");
    tsk.GUIel.classList.add("task");

    tsk.GUIel.innerHTML = `<div class="buttons">
    <button>
        <div class="icon-ok"></div>
    </button>
    <button>
        <div class="icon-pencil"></div>
    </button>
    <button>
        <div class="icon-trash-empty"></div>
    </button>
</div>
    <div class="taskName">
        ${tsk.name}
    </div>
    <div class="dates">
    <div class="date">
        <div class="label">Data ostatniej modyfikacji:</div>
        <div class="content">${tsk.modificationDate}</div>
    </div>
    <div class="date">
            <div class="label">Data utworzenia:</div>
            <div class="content">${tsk.madeDate}</div>
    </div>
    </div>
    <div class="acceptCancel">
        <button>
            <div class="icon-ok"></div>
        </button>
        <button>
           <div class="icon-cancel-outline"></div>
        </button>
    </div>`;

    tsk.buttons = Array.from(tsk.GUIel.querySelector('.buttons').getElementsByTagName("button"));
    Array.from(tsk.GUIel.querySelector(".acceptCancel").getElementsByTagName("button")).forEach(button => tsk.buttons.push(button));
    tsk.buttons[0].addEventListener("click", () => completedChange(tsk));
    tsk.buttons[1].addEventListener("click", () => edit(tsk));
    tsk.buttons[2].addEventListener("click", () => remove(tsk));
    tsk.buttons[3].addEventListener("click", () => accept(tsk));
    tsk.buttons[4].addEventListener("click", () => cancel(tsk));

    tasks.appendChild(tsk.GUIel);
}

function GUIDateModification(tsk) {
    tsk.GUIel.querySelector(".dates").querySelector(".date").querySelector(".content").textContent = tsk.modificationDate;
}

function GUIComplete(tsk) {
    if (tsk.completed) {
        tsk.GUIel.classList.add("completed");
        tsk.GUIel.querySelector(".taskName").innerHTML = `<div class='icon-ok'>${tsk.name}</div>`;
    } else {
        tsk.GUIel.classList.remove("completed");
        tsk.GUIel.querySelector(".taskName").innerHTML = tsk.name;
    }
}

function setOrders() {
    taskSort();
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].GUIel.style.order = i;
    }
}

function completedChange(tsk) {
    tsk.completeUncomplete();
    GUIComplete(tsk);
    GUIDateModification(tsk);
    setOrders();
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function edit(tsk) {
    tsk.GUIel.querySelector(".taskName").innerHTML = `<input type="text" style="width: 100%; padding: 10px;" value="${tsk.name}">`;
    tsk.GUIel.querySelector(".dates").style.display = "none";
    Array.from(tsk.GUIel.querySelector(".buttons").getElementsByTagName("button")).forEach(button => button.style.display = "none");
    tsk.GUIel.querySelector(".acceptCancel").style.display = "flex";
}

function remove(tsk){
    document.getElementById("tasks").removeChild(tsk.GUIel);
    tasks.splice(tasks.indexOf(tsk), 1);
    setOrders();
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function accept(tsk){
    tsk.name = tsk.GUIel.querySelector(".taskName").querySelector("input").value;
    tsk.GUIel.querySelector(".dates").style.display = "flex";
    Array.from(tsk.GUIel.querySelector(".buttons").getElementsByTagName("button")).forEach(button => button.style.display = "flex");
    tsk.GUIel.querySelector(".acceptCancel").style.display = "none";
    GUIDateModification(tsk);
    setOrders();
    GUIComplete(tsk);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function cancel(tsk){
    tsk.GUIel.querySelector(".dates").style.display = "flex";
    Array.from(tsk.GUIel.querySelector(".buttons").getElementsByTagName("button")).forEach(button => button.style.display = "flex");
    tsk.GUIel.querySelector(".acceptCancel").style.display = "none";
    GUIComplete(tsk);
}