class SortMenu {
    private _blockTwo: HTMLElement;
    private _arrowSorting: HTMLElement;
    private _main: Main;
    private _buttonSortDate: Element|null|undefined;
    private _buttonSortLikes: Element|null|undefined;
    private _buttonSort: Element|null|undefined;
    private _buttonSortAnswer: Element|null|undefined;
    private _buttonSortActuality: Element|null|undefined;
    constructor({ blockTwo, arrowSorting, main }: any) {
        this._blockTwo = blockTwo;
        this._arrowSorting = arrowSorting;
        this._main = main;
        this._buttonSortDate;
        this._buttonSortLikes;
        this._buttonSort;
        this._buttonSortAnswer;
    }
    initSortMenu({ arrList, menuSorting, raitingBlock }: any) {
        menuSorting.textContent = arrList[0].text;

        arrList.forEach((element: any, index: number) => {
            let listItem = ` 
    <p class="rating-block__item n${index} ${
                index === 0 ? "active-item" : ""
            } " data-index="${index}""><img src="./image/icons8-галочка-96 1.svg" class="rating-block__item-image image${index} ${
                index === 0 ? "active" : ""
            } " alt="${index}">${arrList[index].text}</p>`;

            raitingBlock.innerHTML += listItem;
        });
        raitingBlock.querySelectorAll(".rating-block__item").forEach((item: {dataset: any; addEventListener: (arg0: any, arg1: () => any) => any }) => {
            item.addEventListener("click",  ()=> {
                let _num: number = item.dataset.index;
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
            this._main.localMemory();
            this._arrowSorting.classList.toggle("rotate-arrow-sorting");
            if (this._arrowSorting.classList.contains("rotate-arrow-sorting")) {
                this._main.arrowFlag = false;
                if (this._buttonSortDate?.classList.contains("active-item")) {
                    this._main.sortDate();
                } else if (this._buttonSortLikes?.classList.contains("active-item")) {
                    this._main.sortLikes();
                } else if (this._buttonSortActuality?.classList.contains("active-item")) {
                    this._main.sortActuality()
                } else if (this._buttonSortAnswer?.classList.contains("active-item")) {
                    this._main.sortAmountAnser();
                }
            } else {
                this._main.arrowFlag = true;
                if (this._buttonSortDate?.classList.contains("active-item")) {
                    this._main.sortDate();
                } else if (this._buttonSortLikes?.classList.contains("active-item")) {
                    this._main.sortLikes();
                } else if (this._buttonSortActuality?.classList.contains("active-item")) {
                    this._main.sortActuality()
                } else if (this._buttonSortAnswer?.classList.contains("active-item")) {
                    this._main.sortAmountAnser();
                }
            }
        });
    }
    positionRaitingBlock({ e, menuSorting, raitingBlock }: any) {
        let coords = menuSorting.getBoundingClientRect();
    
        raitingBlock.style.left = coords.left + "px";
        raitingBlock.style.top = e.clientY + 25 + "px";
    }
}
