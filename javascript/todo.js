class Task {
    constructor(name) {
        this._name = name;
        this._madeDate = new Date();
        this._modDateFormat = this._madeDate;
        this._madeDate = `${this._madeDate.toLocaleDateString()} ${this._madeDate.toLocaleTimeString()}`;
        this._modificationDate = this._madeDate;
        this._completed = false;
    }

    get name() {
        return this._name;
    }

    get madeDate() {
        return this._madeDate;
    }

    get modDateFormat() {
        return this._modDateFormat;
    }

    get modificationDate() {
        return this._modificationDate;
    }

    get completed() {
        return this._completed;
    }

    set name(name) {
        this._name = name;
        this._modDateFormat = new Date();
        this._modificationDate = `${this._modDateFormat.toLocaleDateString()} ${this._modDateFormat.toLocaleTimeString()}`;
    }

    completeUncomplete() {
        this._completed = !this._completed;
        this._modDateFormat = new Date();
        this._modificationDate = `${this._modDateFormat.toLocaleDateString()} ${this._modDateFormat.toLocaleTimeString()}`;
    }

    static addTaskClass(obj) {
        return Object.setPrototypeOf(obj, Task.prototype);
    }

    addToGUI(name){
        this.GUIel = document.createElement("div");
        this.GUIel.classList.add("task");
        this.completeButton = document.createElement("button");
        this.completeButton.innerHTML = '<div class="icon-ok"></div>';
        this.completeButton.addEventListener("click", completeUncomplete);
        this.editButton = document.createElement("button");
        this.completeButton.innerHTML = '<div class="icon-pencil"></div>';
        this.deleteButton = document.createElement("button");
        this.completeButton.innerHTML = '<div class="icon-trash-empty"></div>';
        this.acceptButton = document.createElement("button");
        this.completeButton.innerHTML = '<div class="icon-ok"></div>';
        this.cancelButton = document.createElement("button");
        this.completeButton.innerHTML = '<div class="icon-cancel-outline"></div>';
        
        GUIel.innerHTML=
    }
}

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.map(obj => {
    return Task.addTaskClass(obj);
})

function taskSort() {
    tasks.sort((t1, t2) => {
        if (t1.completed && !t2.completed) {
            return 1;
        } else if (!t1.completed && t2.completed) {
            return -1;
        } else if (t1.modDateFormat.valueOf()>t2.modDateFormat.valueOf()){
            return 1;
        }else {
            return -1;
        }
    })
}

