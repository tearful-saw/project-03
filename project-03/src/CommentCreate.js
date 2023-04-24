"use strict";
class CommentCreate {
    constructor({ user, textInput, blockTwo, favorites, likes, localMemory, main }) {
        this._user = user;
        this._textInput = textInput;
        this._blockTwo = blockTwo;
        this._favorites = favorites;
        this._likes = likes;
        this._main = main;
        this._numberComment = 0;
        this._localMemory = localMemory;
        this._number;
        this._amountChildParent;
        this._amountChildParentNew;
        this._parentUpdate;
    }
    writeNewComment({ name, imageAccount, time, text, likes, favorites, key, arrowFlag, amountChild }) {
        this.mainDiv = document.createElement("div");
        this.mainDiv.classList.add("main-div");
        this.commentDiv = document.createElement("div");
        this.commentDiv.classList.add("comment");
        if (favorites === "flag-favorite") {
            this.commentDiv.classList.add(`${favorites}`);
        }
        this.commentDiv.setAttribute("likes", likes === undefined ? 0 : likes);
        this.commentDiv.setAttribute("favorites", `${favorites === undefined ? "not-favorite" : favorites}`);
        this.commentDiv.setAttribute("last-write-answer", `00000000000000`);
        this.commentDiv.setAttribute("number-comment", `${key}`);
        this.imageAccount = document.createElement("img");
        this.imageAccount.classList.add("comment__image");
        this.imageAccount.src = `${imageAccount ? imageAccount : "./image/Максим Алексеев.jpg"}`;
        this.imageAccount.alt = "foto account";
        this.signatureName = document.createElement("h2");
        this.signatureName.classList.add("comment__name");
        this.signatureName.textContent = name === undefined ? "Максим Авдеенко" : name;
        this.signatureName.setAttribute("attribute", "name");
        this.signatureDate = document.createElement("p");
        this.signatureDate.classList.add("comment__date");
        this.signatureDate.setAttribute("attribute", "date");
        this.signatureDate.textContent = time;
        this.commentText = document.createElement("p");
        this.commentText.classList.add("comment__text");
        this.commentText.setAttribute("attribute", "text");
        this.commentText.textContent = text;
        // нижняя панель сообщения
        this.commentPanelDiv = document.createElement("div");
        this.commentPanelDiv.classList.add("comment__panel");
        this.panelButtonAnswer = document.createElement("button");
        this.panelButtonAnswer.classList.add("comment__panel-answer");
        this.panelButtonAnswerImage = document.createElement("img");
        this.panelButtonAnswerImage.src = "./image/стрелка ответа.svg";
        this.panelButtonAnswerImage.alt = "button answer";
        this.panelButtonFavorites = document.createElement("button");
        this.panelButtonFavorites.classList.add("comment__panel-favorites");
        this.panelButtonFavoritesImage = document.createElement("img");
        this.panelButtonFavoritesImage.classList.add("comment__panel-favorites-img");
        this.panelButtonFavoritesImage.src = `./image/${favorites === undefined ? "not-favorite" : favorites}.svg`;
        this.panelButtonFavoritesImage.alt = "button favorites";
        this.panelFavoritesDiv = document.createElement("div");
        this.panelFavoritesDiv.classList.add("comment__likes-button");
        this.buttonMinus = document.createElement("button");
        this.buttonMinus.classList.add("comment__likes-button-minus");
        this.buttonMinusImage = document.createElement("img");
        this.buttonMinusImage.src = "./image/minus.svg";
        this.buttonMinusImage.alt = "minus";
        this.panelLikesDivText = document.createElement("p");
        this.panelLikesDivText.classList.add("comment__likes-button-number");
        if (likes < 0) {
            this.panelLikesDivText.style.color = "#FF0000";
        }
        this.panelLikesDivText.textContent = likes === undefined ? 0 : likes < 0 ? likes * -1 : likes;
        this.panelLikesDivText.setAttribute("attribute", "likes");
        this.buttonPlus = document.createElement("button");
        this.buttonPlus.classList.add("comment__likes-button-plus");
        this.buttonPlusImage = document.createElement("img");
        this.buttonPlusImage.src = "./image/plus.svg";
        this.buttonPlusImage.alt = "minus";
        // создание структуры коментария
        this.commentDiv.append(this.imageAccount, this.signatureName, this.signatureDate, this.commentText, this.commentPanelDiv);
        this.commentPanelDiv.append(this.panelButtonAnswer, this.panelButtonFavorites, this.panelFavoritesDiv);
        this.panelButtonAnswer.append(this.panelButtonAnswerImage, "Ответить");
        this.panelButtonFavorites.append(this.panelButtonFavoritesImage, `${favorites === undefined ? "В избранное" : favorites === 'not-favorite' ? 'В избранное' : 'В избранном'}`);
        this.buttonMinus.append(this.buttonMinusImage);
        this.buttonPlus.append(this.buttonPlusImage);
        this.panelFavoritesDiv.append(this.buttonMinus, this.panelLikesDivText, this.buttonPlus);
        this.mainDiv.append(this.commentDiv);
        // console.log(arrowFlag);
        if (arrowFlag) {
            this._blockTwo.append(this.mainDiv);
        }
        else if (arrowFlag === undefined || arrowFlag === false) {
            this._blockTwo.prepend(this.mainDiv);
        }
        //повесить обработчик событий который указывает к какому коментарию ответ
        this.handlerButtonAnswer(this.panelButtonAnswer);
        //вешает обработчик на кнопку избранное
        this._favorites.handlerButtonFavorites({
            panelButtonFavorites: this.panelButtonFavorites,
            name: this.signatureName.textContent,
            imageAccount: imageAccount,
            likes: likes,
            time: time,
            text: text,
            key: key,
        });
        //вешает обработчик на кнопку рейтинга
        this._likes.likesComment({
            buttonMinus: this.buttonMinus,
            panelLikesDivText: this.panelLikesDivText,
            imageAccount: imageAccount,
            likes: likes,
            buttonPlus: this.buttonPlus,
            key: key,
        });
        //запись в localStorage
        this._localMemory.writeCommentMemory({
            name: this.signatureName.textContent,
            imageAccount: imageAccount,
            time: time,
            text: text,
            likes: likes === undefined ? 0 : likes,
            favorites: this.commentDiv.getAttribute("favorites"),
            numberComment: key,
            key: key,
            amountChild: amountChild === undefined ? 0 : amountChild,
            timeLastAnswer: this.commentDiv.getAttribute("last-write-answer")
        });
    }
    handlerButtonAnswer(answer) {
        answer === null || answer === void 0 ? void 0 : answer.addEventListener("click", () => {
            var _a, _b;
            this._main.parent = (_b = (_a = answer === null || answer === void 0 ? void 0 : answer.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
            this._main.parentName = this._main.parent.querySelector(".comment__name").textContent;
            this._main.answerFlag = true;
        });
    }
    writeAnswer({ name, imageAccount, parentName, time, text, parent, likes, favorites, numberComment, key, reverse }) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        this._parent = (_a = document.querySelector(`[number-comment="${numberComment}"]`)) === null || _a === void 0 ? void 0 : _a.parentElement;
        this.commentDiv = document.createElement("div");
        this.commentDiv.classList.add("answer");
        if (favorites === "flag-favorite") {
            this.commentDiv.classList.add(`${favorites}`);
        }
        this.commentDiv.setAttribute("likes", likes === undefined ? 0 : likes);
        this.commentDiv.setAttribute("favorites", `${favorites === undefined ? "not-favorite" : favorites}`);
        this.imageAccount = document.createElement("img");
        this.imageAccount.classList.add("answer__image");
        this.imageAccount.src = `${imageAccount ? imageAccount : "./image/Максим Алексеев.jpg"}`;
        this.imageAccount.alt = "foto account";
        this.signatureName = document.createElement("h2");
        this.signatureName.classList.add("answer__name");
        this.signatureName.textContent = name === undefined ? "Максим Авдеенко" : name;
        this.signatureName.setAttribute("attribute", "name");
        this.signatureNameAnswer = document.createElement("p");
        this.signatureNameAnswer.classList.add("answer__name-comment");
        this.signatureNameAnswer.textContent = parentName;
        this.signatureNameAnswer.setAttribute("attribute", "nameAnswer");
        this.imageAnswer = document.createElement("img");
        this.imageAnswer.src = "./image/стрелка ответа.svg";
        this.imageAnswer.alt = "arrow answer";
        this.signatureDate = document.createElement("p");
        this.signatureDate.classList.add("answer__date");
        this.signatureDate.textContent = time;
        this.signatureDate.setAttribute("attribute", "date");
        this.commentText = document.createElement("p");
        this.commentText.classList.add("answer__text");
        this.commentText.textContent = text;
        this.commentText.setAttribute("attribute", "text");
        // нижняя панель сообщения
        this.commentPanelDiv = document.createElement("div");
        this.commentPanelDiv.classList.add("answer__panel");
        this.panelButtonFavorites = document.createElement("button");
        this.panelButtonFavorites.classList.add("comment__panel-favorites");
        this.panelButtonFavoritesImage = document.createElement("img");
        this.panelButtonFavoritesImage.classList.add("comment__panel-favorites-img");
        this.panelButtonFavoritesImage.src = `./image/${favorites === undefined ? "not-favorite" : favorites}.svg`;
        this.panelButtonFavoritesImage.alt = "button favorites";
        this.panelFavoritesDiv = document.createElement("div");
        this.panelFavoritesDiv.classList.add("answer__likes-button");
        this.buttonMinus = document.createElement("button");
        this.buttonMinus.classList.add("answer__likes-button-minus");
        this.buttonMinusImage = document.createElement("img");
        this.buttonMinusImage.src = "./image/minus.svg";
        this.buttonMinusImage.alt = "minus";
        this.panelLikesDivText = document.createElement("p");
        this.panelLikesDivText.classList.add("answer__likes-button-number");
        if (likes < 0) {
            this.panelLikesDivText.style.color = "#FF0000";
        }
        this.panelLikesDivText.textContent = likes === undefined ? 0 : likes < 0 ? likes * -1 : likes;
        this.panelLikesDivText.setAttribute("attribute", "likes");
        this.buttonPlus = document.createElement("button");
        this.buttonPlus.classList.add("answer__likes-button-plus");
        this.buttonPlusImage = document.createElement("img");
        this.buttonPlusImage.src = "./image/plus.svg";
        this.buttonPlusImage.alt = "minus";
        // создание структуры коментария
        this.signatureNameAnswer.prepend(this.imageAnswer);
        this.commentDiv.append(this.imageAccount, this.signatureName, this.signatureDate, this.signatureNameAnswer, this.signatureDate, this.commentText, this.commentPanelDiv);
        this.commentPanelDiv.append(this.panelButtonFavorites, this.panelFavoritesDiv);
        this.panelButtonFavorites.append(this.panelButtonFavoritesImage, `${favorites === undefined ? "В избранное" : favorites === 'not-favorite' ? 'В избранное' : 'В избранном'}`);
        this.buttonMinus.append(this.buttonMinusImage);
        this.buttonPlus.append(this.buttonPlusImage);
        this.panelFavoritesDiv.append(this.buttonMinus, this.panelLikesDivText, this.buttonPlus);
        (_b = this._parent) === null || _b === void 0 ? void 0 : _b.append(this.commentDiv);
        parent === null || parent === void 0 ? void 0 : parent.append(this.commentDiv);
        //количество ответов к коментарию
        //вешает обработчик на кнопку избранное
        this._favorites.handlerButtonFavorites({
            panelButtonFavorites: this.panelButtonFavorites,
            name: this.signatureName.textContent,
            imageAccount: imageAccount,
            parentName: parentName,
            likes: likes,
            time: time,
            text: text,
            key: key,
        });
        //вешает обработчик на кнопку рейтинга
        this._likes.likesComment({
            buttonMinus: this.buttonMinus,
            panelLikesDivText: this.panelLikesDivText,
            imageAccount: imageAccount,
            parentName: parentName,
            likes: likes,
            buttonPlus: this.buttonPlus,
            key: key,
        });
        this._number;
        if (parent !== undefined) {
            this._number = parent.firstElementChild.getAttribute("number-comment");
            this._amountChildParent = parent.firstElementChild.getAttribute("amount-child");
            parent.firstElementChild.setAttribute("amount-child", +this._amountChildParent + 1);
            parent.firstElementChild.setAttribute("last-write-answer", key);
            this._amountChildParentNew = parent.firstElementChild.getAttribute("amount-child");
        }
        else {
            this._number = (_d = (_c = this._parent) === null || _c === void 0 ? void 0 : _c.firstElementChild) === null || _d === void 0 ? void 0 : _d.getAttribute("number-comment");
            this._amountChildParent = (_f = (_e = this._parent) === null || _e === void 0 ? void 0 : _e.firstElementChild) === null || _f === void 0 ? void 0 : _f.getAttribute("amount-child");
            this._amountChild = +this._amountChildParent + 1;
            (_h = (_g = this._parent) === null || _g === void 0 ? void 0 : _g.firstElementChild) === null || _h === void 0 ? void 0 : _h.setAttribute("amount-child", this._amountChild);
            (_k = (_j = this._parent) === null || _j === void 0 ? void 0 : _j.firstElementChild) === null || _k === void 0 ? void 0 : _k.setAttribute("last-write-answer", key);
            this._amountChildParentNew = (_m = (_l = this._parent) === null || _l === void 0 ? void 0 : _l.firstElementChild) === null || _m === void 0 ? void 0 : _m.getAttribute("amount-child");
        }
        this._parentUpdateGet = localStorage.getItem(this._number);
        this._parentUpdate = JSON.parse(this._parentUpdateGet);
        // перезапись комента в память
        this._localMemory.writeCommentMemory({
            name: this._parentUpdate.name,
            imageAccount: this._parentUpdate.imageAccount,
            time: this._parentUpdate.time,
            text: this._parentUpdate.text,
            likes: this._parentUpdate.likes,
            favorites: this._parentUpdate.favorites,
            numberComment: this._parentUpdate.numberComment,
            key: this._parentUpdate.key,
            amountChild: this._amountChildParentNew,
            timeLastAnswer: key
        });
        //запись ответа на комент в память
        this._localMemory.writeCommentMemory({
            name: this.signatureName.textContent,
            imageAccount: imageAccount,
            parentName: parentName,
            time: time,
            text: text,
            likes: likes,
            favorites: this.commentDiv.getAttribute("favorites"),
            numberComment: this._number ? this._number : numberComment,
            key: key,
        });
    }
}
