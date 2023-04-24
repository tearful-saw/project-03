"use strict";
class Index {
    constructor() {
        this._main = new Main();
    }
    start() {
        this._main.initButton();
    }
}
let index = new Index();
index.start();
