class Likes {
    private _blockTwo: HTMLElement;
    private _localMemory: LocalMemory;
    private _localCount: number|any;
    private _result: number|any;
    private _comment: any;
    private _commentName: any;
    private _commentNameAnswer: any;
    private _commentDate: any;
    private _commentText: any;
    constructor({ blockTwo, localMemory }:any) {
        this._blockTwo = blockTwo;
        this._localMemory = localMemory;
        this._localCount;
        this._result;
    }


    likesComment({ buttonMinus, panelLikesDivText, imageAccount, likes, buttonPlus,key}:any) {
        let count = likes === undefined ? 0 : likes;

        buttonMinus.addEventListener("click", () => {
            count--; 

            if (count < 0) {
                panelLikesDivText.style.color = "#FF0000";
                this._result = count * -1;
            } else {
                this._result = count;
                panelLikesDivText.style.color = "#8ac540";
            }
            panelLikesDivText.textContent = this._result;
            if (count >= 0) {
                this._localCount = this._result;
            } else {
                this._localCount = this._result * -1;
            }
            // при изменинии лайков, коммент перезаписывается в память
            this.writeLocalMemory(buttonMinus, this._localCount,key,imageAccount);
        });

        buttonPlus.addEventListener("click", () => {
            count++;

            if (count < 0) {
                panelLikesDivText.style.color = "#FF0000";
                this._result = count * -1;
            } else {
                this._result = count;

                panelLikesDivText.style.color = "#8ac540";
            }
            panelLikesDivText.textContent = this._result;
            if (count >= 0) {
                this._localCount = this._result;
            } else {
                this._localCount = this._result * -1;
            }
            // при изменинии лайков, коммент перезаписывается в память
            this.writeLocalMemory(buttonPlus, this._localCount,key,imageAccount);
        });
    }
    writeLocalMemory(child:HTMLElement, localCount:number,key:number,imageAccount:string) {
        this._comment = child?.parentElement?.parentElement?.parentElement;

        this._commentName = this._comment.querySelector('[attribute="name"]');
        this._commentNameAnswer =
            this._comment.querySelector('[attribute="nameAnswer"]') === null ? "" : this._comment.querySelector('[attribute="nameAnswer"]');
        this._commentDate = this._comment.querySelector('[attribute="date"]');
        this._commentText = this._comment.querySelector('[attribute="text"]');
        this._comment.setAttribute("likes",`${localCount}`)
        

        this._localMemory.writeCommentMemory({
            name: this._commentName.textContent,
            imageAccount:imageAccount,
            parentName: this._commentNameAnswer.textContent,
            time: this._commentDate.textContent,
            text: this._commentText.textContent,
            likes: localCount,
            favorites:this._comment.getAttribute("favorites"),
            numberComment:this._comment.parentElement.firstChild.getAttribute("number-comment"),
            amountChild:this._comment.parentElement.firstChild.getAttribute("amount-child"),
            timeLastAnswer:this._comment.parentElement.firstChild.getAttribute("last-write-answer"),
            key:key,
        });
    }
}
