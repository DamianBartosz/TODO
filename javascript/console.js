document.body.innerHTML = "<h1 style='text-align: center; font-size: 10rem'>Aplikacja w konsoli</h1>";

function menu() {
    console.log("\nDostępne funkcje:");
    console.log("Dodaj zadanie - addTask()");
    console.log("Zmiana nazwy zadania - modifyTask()");
    console.log("Zakończ zadanie - completeTask()");
    console.log("Przywróć zadanie - uncompleteTask()")
    console.log("Usuń zadanie - deleteTask()");
    console.log("Wyświetl listę zadań - showTasks()");
}

function getNumber(length) {
    let number = prompt("Podaj nr zadania");
    if (number > length || number < 1) {
        let i = prompt("Błędna wartość. Chcesz podać jeszcze raz?").toLocaleLowerCase();
        if (i == "tak") {
            number = getNumber(length);
        } else {
            return 0;
        }
    }
    return number;
}

function addTask() {
    let name = prompt("Podaj nazwę zadania:");
    tasks.push(new Task(name));
    taskSort();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    menu();
}

function modifyTask() {
    showTasks();
    let number = getNumber(tasks.length);
    if (number === 0) {
        return;
    }
    tasks[number - 1].name = prompt("Podaj nową nazwę zadania");
    taskSort();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    menu();
}

function completeTask() {
    const arr = tasks.filter((el) => {
        return !el.completed;
    })

    showTasks(arr);
    let number = getNumber(arr.length);
    if (number === 0) {
        return;
    }
    arr[number - 1].complete();
    taskSort();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    menu();
}

function uncompleteTask() {
    const arr = tasks.filter((el) => {
        return el.completed;
    })

    showTasks(arr);
    let number = getNumber(arr.length);
    if (number === 0) {
        return;
    }
    arr[number - 1].uncomplete();
    taskSort();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    menu();
}

function deleteTask() {
    showTasks();
    let number = getNumber(tasks.length);
    if (number === 0) {
        return;
    }
    tasks.splice(number - 1, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    menu();
}

function showTasks(arr) {
    arr = arr || tasks;
    console.log("\n Lista zadań")
    for (let i = 0; i < arr.length; i++) {
        let name = (i + 1) + ". ";
        if (arr[i].completed) {
            name += "--";
        }
        name += arr[i].name;
        console.log(name);
        console.log(`\tData utworzenia: ${arr[i].madeDate}\tData ostatniej modyfikacji: ${arr[i].modificationDate}`);
    }
    console.log("\n");
    localStorage.setItem("tasks", JSON.stringify(tasks));
    menu();
}

menu();