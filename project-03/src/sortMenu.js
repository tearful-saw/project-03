"use strict";
class SortMenu {
    constructor({ blockTwo, arrowSorting, main }) {
        this._blockTwo = blockTwo;
        this._arrowSorting = arrowSorting;
        this._main = main;
        this._buttonSortDate;
        this._buttonSortLikes;
        this._buttonSort;
        this._buttonSortAnswer;
    }
    initSortMenu({ arrList, menuSorting, raitingBlock }) {
        menuSorting.textContent = arrList[0].text;
        arrList.forEach((element, index) => {
            let listItem = ` 
    <p class="rating-block__item n${index} ${index === 0 ? "active-item" : ""} " data-index="${index}""><img src="./image/icons8-галочка-96 1.svg" class="rating-block__item-image image${index} ${index === 0 ? "active" : ""} " alt="${index}">${arrList[index].text}</p>`;
            raitingBlock.innerHTML += listItem;
        });
        raitingBlock.querySelectorAll(".rating-block__item").forEach((item) => {
            item.addEventListener("click", () => {
                let _num = item.dataset.index;
                raitingBlock.querySelector(".active-item").classList.remove("active-item");
                raitingBlock.querySelector(".n" + _num).classList.add("active-item");
                raitingBlock.querySelector(".active").classList.remove("active");
                raitingBlock.querySelector(".image" + _num).classList.add("active");
                menuSorting.textContent = arrList[_num].text;
                raitingBlock.classList.toggle("active-menu");
            });
        });
        this._buttonSortDate = document.querySelector(".n0");
        this._buttonSortLikes = document.querySelector(".n1");
        this._buttonSortActuality = document.querySelector(".n2");
        this._buttonSortAnswer = document.querySelector(".n3");
        //стрелка переворот списка
        this._arrowSorting.addEventListener("click", () => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            this._main.localMemory();
            this._arrowSorting.classList.toggle("rotate-arrow-sorting");
            if (this._arrowSorting.classList.contains("rotate-arrow-sorting")) {
                this._main.arrowFlag = false;
                if ((_a = this._buttonSortDate) === null || _a === void 0 ? void 0 : _a.classList.contains("active-item")) {
                    this._main.sortDate();
                }
                else if ((_b = this._buttonSortLikes) === null || _b === void 0 ? void 0 : _b.classList.contains("active-item")) {
                    this._main.sortLikes();
                }
                else if ((_c = this._buttonSortActuality) === null || _c === void 0 ? void 0 : _c.classList.contains("active-item")) {
                    this._main.sortActuality();
                }
                else if ((_d = this._buttonSortAnswer) === null || _d === void 0 ? void 0 : _d.classList.contains("active-item")) {
                    this._main.sortAmountAnser();
                }
            }
            else {
                this._main.arrowFlag = true;
                if ((_e = this._buttonSortDate) === null || _e === void 0 ? void 0 : _e.classList.contains("active-item")) {
                    this._main.sortDate();
                }
                else if ((_f = this._buttonSortLikes) === null || _f === void 0 ? void 0 : _f.classList.contains("active-item")) {
                    this._main.sortLikes();
                }
                else if ((_g = this._buttonSortActuality) === null || _g === void 0 ? void 0 : _g.classList.contains("active-item")) {
                    this._main.sortActuality();
                }
                else if ((_h = this._buttonSortAnswer) === null || _h === void 0 ? void 0 : _h.classList.contains("active-item")) {
                    this._main.sortAmountAnser();
                }
            }
        });
    }
    positionRaitingBlock({ e, menuSorting, raitingBlock }) {
        let coords = menuSorting.getBoundingClientRect();
        raitingBlock.style.left = coords.left + "px";
        raitingBlock.style.top = e.clientY + 25 + "px";
    }
}
