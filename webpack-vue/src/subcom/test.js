class DataSource{
    constructor() {
        let i = 0;
        this._id = setInterval(() => {this.emit(i++), 200});
    }
}