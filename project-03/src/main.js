"use strict";
class Main {
    constructor() {
        this._users = new Users();
        this._textInput = document.querySelector(".new-comments__form-input");
        this._buttonInput = document.querySelector(".new-comments__form-button");
        this._amount = document.querySelector(".new-comments__amount");
        this._raitingBlock = document.querySelector(".rating-block");
        this._menuSorting = document.querySelector(".menu__sorting");
        this._arrowSorting = document.querySelector(".menu__arrow-sorting");
        this._newComment = document.querySelector(".new-comments");
        this._menuFavoritesButton = document.querySelector(".menu__favorites");
        this._blockFavorites = document.querySelector(".block-favorites");
        this._blockTwo = document.querySelector(".block-two");
        this._buttonsAnswer = document.querySelectorAll(".comment__panel-answer");
        this._buttonFavorites = document.querySelectorAll(".comment__panel-favorites");
        this._countCommentText = document.querySelector(".menu__box-comment-count");
        this._textError = document.querySelector(".new-comments__amount-error");
        this._date;
        this.parent;
        this.parentName;
        this._arrKey = [];
        this.answerFlag = false;
        this._checkButtonFlag = false;
        this._favoritesFlag = "deactive";
        this._reverseFlag = false;
        this.arrCom = [];
        this._arrAnswer = [];
        this.arrowFlag = true;
        this._elementArr;
        this._arrList = [{ text: "По дате" }, { text: "По количеству оценок" }, { text: "По актуальности" }, { text: "По количеству ответов" }];
        this._localMemory = new LocalMemory({
            countCommentText: this._countCommentText,
        });
        this._sortMenu = new SortMenu({
            blockTwo: this._blockTwo,
            arrowSorting: this._arrowSorting,
            main: this,
        });
        this._likes = new Likes({
            blockTwo: this._blockTwo,
            localMemory: this._localMemory,
        });
        this._favorites = new Favorites({
            buttonFavorites: this._buttonFavorites,
            menuFavoritesButton: this._menuFavoritesButton,
            localMemory: this._localMemory,
        });
        this._commentCreate = new CommentCreate({
            blockTwo: this._blockTwo,
            favorites: this._favorites,
            likes: this._likes,
            localMemory: this._localMemory,
            main: this,
        });
    }
    //получение актуального времени
    nowTime() {
        this._dateNow = new Date();
        this._year = `${this._dateNow.getFullYear()}`;
        this._month = `${this._dateNow.getMonth() + 1 > 9 ? this._dateNow.getMonth() + 1 : "0" + (this._dateNow.getMonth() + 1)}`;
        this._dateS = `${this._dateNow.getDate()}`;
        this._hour = `${this._dateNow.getHours()}`;
        this._minutes = `${this._dateNow.getMinutes() > 9 ? this._dateNow.getMinutes() : "0" + this._dateNow.getMinutes()}`;
        this._seconds = `${this._dateNow.getSeconds() > 9 ? this._dateNow.getSeconds() : "0" + this._dateNow.getSeconds()}`;
        return {
            time: `${this._dateS}.${this._month} ${this._hour}:${this._minutes}`,
            key: +(this._year + this._month + this._dateS + this._hour + this._minutes + this._seconds),
        };
    }
    initButton() {
        var _a, _b, _c, _d, _e, _f;
        // количество комментариев
        this._countCommentText.textContent = `(${0})`;
        // this.r = localStorage.getItem(1)
        this._sortMenu.initSortMenu({
            arrList: this._arrList,
            menuSorting: this._menuSorting,
            raitingBlock: this._raitingBlock,
        });
        this._menuSorting.addEventListener("click", (e) => {
            this._sortMenu.positionRaitingBlock({
                e: e,
                menuSorting: this._menuSorting,
                raitingBlock: this._raitingBlock,
            });
            this._raitingBlock.classList.toggle("active-menu");
        });
        this._raitingBlock.addEventListener("mouseleave", (e) => {
            this._raitingBlock.classList.remove("active-menu");
        });
        this._buttonSortDate = document.querySelector(".n0");
        this._buttonSortLikes = document.querySelector(".n1");
        this._buttonSortActuality = document.querySelector(".n2");
        this._buttonSortAnswer = document.querySelector(".n3");
        (_a = this._buttonSortDate) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            this.localMemory();
            this.sortDate();
            this._raitingBlock.classList.remove("active-menu");
        });
        (_b = this._buttonSortLikes) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            this.localMemory();
            this.sortLikes();
            this._raitingBlock.classList.remove("active-menu");
        });
        (_c = this._buttonSortActuality) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
            this.localMemory();
            this.sortActuality();
            this._raitingBlock.classList.remove("active-menu");
        });
        (_d = this._buttonSortAnswer) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
            this.localMemory();
            this.sortAmountAnser();
            this._raitingBlock.classList.remove("active-menu");
        });
        // кнопка избраное
        this._favorites.initButton();
        this._textInput.addEventListener("keyup", () => {
            this.checkTextInput();
        });
        this._buttonInput.addEventListener("click", () => {
            this.createComment();
        });
        if (localStorage.length === 0) {
            (_e = this._users.comment) === null || _e === void 0 ? void 0 : _e.forEach((element) => {
                // console.log(element);
                this._commentCreate.writeNewComment({
                    name: element.name,
                    imageAccount: element.imageAccount,
                    time: element.time,
                    text: element.text,
                    likes: element.likes,
                    favorites: element.favorites,
                    numberComment: element.numberComment,
                    key: +element.key,
                    amountChild: element.amountChild,
                });
            });
            (_f = this._users.answer) === null || _f === void 0 ? void 0 : _f.forEach((element) => {
                this._commentCreate.writeAnswer({
                    name: element.name,
                    imageAccount: element.imageAccount,
                    parentName: element.parentName,
                    time: element.time,
                    text: element.text,
                    likes: element.likes,
                    favorites: element.favorites,
                    numberComment: element.numberComment,
                    key: +element.key,
                });
            });
        }
        this.localMemory();
        this.sortDate();
        // this._blockTwo.insertAdjacentHTML('afterbegin',this._menuSorting)
    }
    // запись коменнтов из памяти если они есть, сортировка по дате
    localMemory() {
        // перебор и запись в массив по ключу
        if (localStorage.length > 0) {
            this._arrKey = [];
            for (let index = 0; index < localStorage.length; index++) {
                this._elementArr = localStorage.key(index);
                let commentJson = localStorage.getItem(this._elementArr);
                this._arrKey[index] = this._elementArr;
            }
            let com = 0;
            let ans = 0;
            for (let index = 0; index < this._arrKey.length; index++) {
                let commentJson = localStorage.getItem(this._arrKey[index]);
                let commentParse = JSON.parse(commentJson);
                if (commentParse.parentName === undefined) {
                    this.arrCom[com] = commentParse;
                    com++;
                }
                else {
                    this._arrAnswer[ans] = commentParse;
                    ans++;
                }
            }
        }
    }
    sortDate() {
        this.arrCom.sort((a, b) => (+a.key > +b.key ? 1 : -1));
        this._arrAnswer.sort((a, b) => (+a.key > +b.key ? 1 : -1));
        if (!this.arrowFlag) {
            this._arrAnswer.reverse();
        }
        this.overwriting(this.arrCom, this._arrAnswer);
    }
    // сортировка по лайкам
    sortLikes() {
        this.arrCom.sort((a, b) => (+a.likes > +b.likes ? 1 : -1));
        this._arrAnswer.sort((a, b) => (+a.likes > +b.likes ? 1 : -1));
        if (!this.arrowFlag) {
            this._arrAnswer.reverse();
        }
        this.overwriting(this.arrCom, this._arrAnswer);
    }
    sortActuality() {
        this.arrCom.sort((a, b) => (+a.timeLastAnswer > +b.timeLastAnswer ? 1 : -1));
        if (!this.arrowFlag) {
            this._arrAnswer.reverse();
        }
        this.overwriting(this.arrCom, this._arrAnswer);
    }
    sortAmountAnser() {
        this.arrCom.sort((a, b) => (+a.amountChild > +b.amountChild ? 1 : -1));
        if (!this.arrowFlag) {
        }
        this.overwriting(this.arrCom, this._arrAnswer);
    }
    //перезапись если в меню выбрать другой пункт
    overwriting(arrCom, arrAnswer) {
        //удаление всех коментарие чтоб перезаписать с памяти
        if (document.querySelector(".main-div") !== null) {
            document.querySelectorAll(".main-div").forEach((element) => {
                element.remove();
            });
        }
        if (document.querySelector(".answer") !== null) {
            document.querySelectorAll(".answer").forEach((element) => {
                element.remove();
            });
        }
        arrCom === null || arrCom === void 0 ? void 0 : arrCom.forEach((element) => {
            this._commentCreate.writeNewComment({
                name: element.name,
                imageAccount: element.imageAccount,
                time: element.time,
                text: element.text,
                likes: +element.likes,
                favorites: element.favorites,
                numberComment: element.numberComment,
                key: element.key,
                amountChild: element.amountChild,
                arrowFlag: this.arrowFlag,
                timeLastAnswer: element.timeAnswer,
            });
        });
        arrAnswer === null || arrAnswer === void 0 ? void 0 : arrAnswer.forEach((element) => {
            this._commentCreate.writeAnswer({
                name: element.name,
                imageAccount: element.imageAccount,
                parentName: element.parentName,
                time: element.time,
                text: element.text,
                likes: element.likes,
                favorites: element.favorites,
                numberComment: element.numberComment,
                key: element.key,
            });
        });
    }
    buttonAnswer() {
        this.createComment();
        this.answerFlag = true;
    }
    checkTextInput() {
        this._textInput.style.removeProperty("height");
        if (this._amount !== null) {
            this._amount.textContent = this._textInput.value.length + "/1000";
            this._textInput.style.height = this._textInput.scrollHeight + 6 + "px";
            if (this._textInput.value.length !== 0 && this._textInput.value.length < 1000) {
                this._amount.style.color = "black";
                this._checkButtonFlag = true;
                this._textError.classList.remove("active-error");
                this._buttonInput.style.background = "#ABD873";
            }
            else if (this._textInput.value.length === 0) {
                this._amount.textContent = 'Макс. 1000 символов';
                this._checkButtonFlag = false;
                this._amount.style.color = "black";
                this._textError.classList.remove("active-error");
                this._buttonInput.style.background = "#a2a2a2";
            }
            else if (this._textInput.value.length > 1000) {
                this._amount.style.color = "red";
                this._textError.classList.add("active-error");
                this._checkButtonFlag = false;
                this._buttonInput.style.background = "#a2a2a2";
            }
        }
    }
    createComment() {
        // this._likes.likes()
        if (this._checkButtonFlag) {
            this._date = this.nowTime();
            if (!this.answerFlag) {
                this._commentCreate.writeNewComment({
                    time: this._date.time,
                    text: this._textInput.value,
                    key: this._date.key,
                    arrowFlag: this.arrowFlag,
                });
            }
            else {
                // console.log(this._parent,this._parentName);
                this._commentCreate.writeAnswer({
                    time: this._date.time,
                    text: this._textInput.value,
                    parent: this.parent,
                    parentName: this.parentName,
                    key: this._date.key,
                });
                this.answerFlag = false;
            }
            if (this._amount !== null) {
                this._textInput.value = "";
                this._buttonInput.style.background = "#a2a2a2";
                this._amount.textContent = "";
                this._checkButtonFlag = false;
                this._textInput.style.removeProperty("height");
                this._amount.textContent = "Макс. 1000 символов";
            }
        }
    }
}
