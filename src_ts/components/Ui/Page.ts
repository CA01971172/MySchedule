import { PageType } from "../../utils/types";
export class Page{
    protected pageType: PageType; // ページの種類

    constructor(pageType: PageType){
        this.pageType = pageType
    }

    render(): HTMLElement{ // 要素を作成するメソッド
        return
    }
}