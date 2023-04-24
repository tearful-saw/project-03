"use strict";
class Favorites {
    constructor({ buttonFavorites, menuFavoritesButton, localMemory }) {
        this._buttonFavorites = buttonFavorites;
        this._menuFavoritesButton = menuFavoritesButton;
        this._localMemory = localMemory;
        this._favorites;
    }
    handlerButtonFavorites({ panelButtonFavorites, name, imageAccount, likes, parentName, time, text, key }) {
        //если открыты избранные сообщения,
        // то новое сообщение не видно в списке пока не закрыть избраное
        if (this._menuFavoritesButton.classList.contains("flag-favorite")) {
            panelButtonFavorites.parentElement.parentElement.classList.add("not-favorite");
        }
        panelButtonFavorites.addEventListener("click", () => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
            this._comment = panelButtonFavorites.parentElement.parentElement;
            (_a = this._comment) === null || _a === void 0 ? void 0 : _a.classList.toggle("flag-favorite");
            // this._imageComment = this._comment?.querySelector(".comment__panel-favorites-img");
            // this._imageComment.src = "./image/flag-favorite.svg";
            (_b = this._comment) === null || _b === void 0 ? void 0 : _b.setAttribute("favorites", "flag-favorite");
            this._favorites = "flag-favorite";
            panelButtonFavorites.innerHTML = `<img class="comment__panel-favorites-img" src="./image/flag-favorite.svg" alt="button favorites">В избранном`;
            if (!((_c = this._comment) === null || _c === void 0 ? void 0 : _c.classList.contains("flag-favorite"))) {
                if (this._menuFavoritesButton.classList.contains("flag-favorite")) {
                    (_d = this._comment) === null || _d === void 0 ? void 0 : _d.classList.add("not-favorite");
                }
                // this._imageComment.src = "./image/not-favorite.svg";
                panelButtonFavorites.innerHTML = `<img class="comment__panel-favorites-img" src="./image/not-favorite.svg" alt="button favorites">В избранное`;
                (_e = this._comment) === null || _e === void 0 ? void 0 : _e.setAttribute("favorites", "not-favorite");
                this._favorites = "not-favorite";
            }
            this._localMemory.writeCommentMemory({
                name: name,
                imageAccount: imageAccount,
                parentName: parentName,
                time: time,
                text: text,
                favorites: this._favorites,
                likes: likes === undefined ? 0 : likes,
                numberComment: `${(_h = (_g = (_f = this._comment) === null || _f === void 0 ? void 0 : _f.parentElement) === null || _g === void 0 ? void 0 : _g.firstChild) === null || _h === void 0 ? void 0 : _h.getAttribute("number-comment")}`,
                key: key,
                amountChild: `${(_l = (_k = (_j = this._comment) === null || _j === void 0 ? void 0 : _j.parentElement) === null || _k === void 0 ? void 0 : _k.firstChild) === null || _l === void 0 ? void 0 : _l.getAttribute("amount-child")}`,
                timeLastAnswer: `${(_p = (_o = (_m = this._comment) === null || _m === void 0 ? void 0 : _m.parentElement) === null || _o === void 0 ? void 0 : _o.firstChild) === null || _p === void 0 ? void 0 : _p.getAttribute("last-write-answer")}`
            });
        });
    }
    initButton() {
        this._menuFavoritesButton.addEventListener("click", () => {
            this._menuFavoritesButton.classList.toggle("flag-favorite");
            this._favoritesComent = document.querySelectorAll(".comment");
            this._favoritesComent.forEach((element) => {
                if (!element.classList.contains("flag-favorite")) {
                    element.classList.toggle("not-favorite");
                }
                if (!this._menuFavoritesButton.classList.contains("flag-favorite")) {
                    element.classList.remove("not-favorite");
                }
            });
            this._favoritesAnswer = document.querySelectorAll(".answer");
            this._favoritesAnswer.forEach((element) => {
                if (!element.classList.contains("flag-favorite")) {
                    element.classList.toggle("not-favorite");
                }
                if (!this._menuFavoritesButton.classList.contains("flag-favorite")) {
                    element.classList.remove("not-favorite");
                }
            });
        });
    }
}
