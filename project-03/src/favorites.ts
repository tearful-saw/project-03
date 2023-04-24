
class Favorites {
    private _buttonFavorites: HTMLElement;
    private _menuFavoritesButton: HTMLElement;
    private _localMemory: LocalMemory;
    private _favorites: string|undefined;
    private _comment: HTMLElement|any;
    private _imageComment: any;
    private _favoritesComent: NodeList|undefined;
    private _favoritesAnswer:  NodeList|undefined;


    constructor({ buttonFavorites, menuFavoritesButton, localMemory }:any) {
        this._buttonFavorites = buttonFavorites;
        this._menuFavoritesButton = menuFavoritesButton;
        this._localMemory = localMemory;
        this._favorites;
    }

    handlerButtonFavorites({ panelButtonFavorites, name,imageAccount, likes, parentName, time, text,key }:any) {
        //если открыты избранные сообщения,
        // то новое сообщение не видно в списке пока не закрыть избраное
        if (this._menuFavoritesButton.classList.contains("flag-favorite")) {
            panelButtonFavorites.parentElement.parentElement.classList.add("not-favorite");
        }

        panelButtonFavorites.addEventListener("click", () => {
            this._comment = panelButtonFavorites.parentElement.parentElement;
            this._comment?.classList.toggle("flag-favorite");

            // this._imageComment = this._comment?.querySelector(".comment__panel-favorites-img");
            // this._imageComment.src = "./image/flag-favorite.svg";
            this._comment?.setAttribute("favorites", "flag-favorite");
            this._favorites = "flag-favorite";
            panelButtonFavorites.innerHTML =`<img class="comment__panel-favorites-img" src="./image/flag-favorite.svg" alt="button favorites">В избранном`
            
            if (!this._comment?.classList.contains("flag-favorite")) {
                if (this._menuFavoritesButton.classList.contains("flag-favorite")) {
                    this._comment?.classList.add("not-favorite");
                }
                // this._imageComment.src = "./image/not-favorite.svg";
                panelButtonFavorites.innerHTML =`<img class="comment__panel-favorites-img" src="./image/not-favorite.svg" alt="button favorites">В избранное`

                this._comment?.setAttribute("favorites", "not-favorite");
                this._favorites = "not-favorite";
            }
            this._localMemory.writeCommentMemory({
                name: name,
                imageAccount:imageAccount,
                parentName: parentName,
                time: time,
                text: text,
                favorites: this._favorites,
                likes: likes === undefined? 0 : likes,
                numberComment: `${this._comment?.parentElement?.firstChild?.getAttribute("number-comment")}`,
                key:key,
                amountChild:`${this._comment?.parentElement?.firstChild?.getAttribute("amount-child")}`,
                timeLastAnswer:`${this._comment?.parentElement?.firstChild?.getAttribute("last-write-answer")}`
            });
        });
    }

    initButton() {
        this._menuFavoritesButton.addEventListener("click", () => {
            this._menuFavoritesButton.classList.toggle("flag-favorite");

            this._favoritesComent = document.querySelectorAll(".comment");

            this._favoritesComent.forEach((element:any) => {
                if (!element.classList.contains("flag-favorite")) {
                    element.classList.toggle("not-favorite");
                }
                if (!this._menuFavoritesButton.classList.contains("flag-favorite")) {
                    element.classList.remove("not-favorite");
                }
            });
            this._favoritesAnswer = document.querySelectorAll(".answer");

            this._favoritesAnswer.forEach((element:any) => {
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






