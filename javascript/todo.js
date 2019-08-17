class task {
    constructor(name){
        this._name = name;
        this._makeDate = new Date();
        this._modificationDate = this._makeDate;
        this._completed = false;
    }

    get name(){
        return this._name;
    }

    get makeDate(){
        return this._makeDate;
    }

    get modificationDate(){
        return this._modificationDate;
    }

    get completed(){
        return this._completed;
    }

    set name(name){
        this._name=name;
        this._modificationDate = new Date();
    }

    complete(){
        this._completed = true;
    }

    uncomplete(){
        this._completed = false;
    }
}

function addTask(){

}