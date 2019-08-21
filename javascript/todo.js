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

    parseModDateFormat(){
        this._modDateFormat = new Date(this._modDateFormat);
    }

    completeUncomplete() {
        this._completed = !this.completed;
        this._modDateFormat = new Date();
        this._modificationDate = `${this._modDateFormat.toLocaleDateString()} ${this._modDateFormat.toLocaleTimeString()}`;
    }

    static addTaskClass(obj) {
        return Object.setPrototypeOf(obj, Task.prototype);
    }

    

    setOrder(ord) {
        this.GUIel.style.order = ord;
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
        } else if (t1.modDateFormat.valueOf() > t2.modDateFormat.valueOf()) {
            return 1;
        } else {
            return -1;
        }
    })
}

