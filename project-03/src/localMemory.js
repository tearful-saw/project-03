"use strict";
class LocalMemory {
    constructor({ countCommentText }) {
        this._arr;
        this._arrJson;
        this._countCommentText = countCommentText;
    }
    writeCommentMemory({ name, imageAccount, parentName, time, text, likes, favorites, numberComment, key, amountChild, timeLastAnswer }) {
        // console.log(amountChild);
        // let parentJson = JSON.stringify(parent)
        // console.log(parentJson)
        this._arr = {
            name: name,
            imageAccount: imageAccount,
            parentName: parentName,
            time: time,
            text: text,
            likes: likes,
            favorites: favorites,
            numberComment: numberComment,
            key: key,
            amountChild: amountChild,
            timeLastAnswer: timeLastAnswer,
        };
        this._arrJson = JSON.stringify(this._arr);
        localStorage.setItem(key, this._arrJson);
        // let local = localStorage.getItem(time);
        this._countCommentText.textContent = `(${localStorage.length})`;
    }
}
