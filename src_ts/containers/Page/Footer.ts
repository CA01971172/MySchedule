import { DomUtils } from "../../utils/domUtils"
import { Page } from "../../components/Ui/Page"
import { AddButton } from "../../components/Ui/AddButton"

export class Footer extends Page{ // フッターを作成するクラス
    render(): HTMLElement{ // フッターを作成するメソッド
        const footerElm: HTMLElement = DomUtils.createElement("footer",["d-flex", "justify-content-end", "fixed-bottom","m-2"])
        switch(this.pageType){
            case "login":
            case "register":
                // ログインページなどでは操作ボタン(フッター)は作成しない
                break;
            default:
            case null:
            case "timetable":
            case "task":
            case "shift":
            case "event":
            case "calendar":
                const footerContents: HTMLElement[] = new Array

                // ページ編集用の追加動作用button要素を作成する
                const hoge: (() => void) = function(){console.log("hoge")}
                const addButton: AddButton = new AddButton(hoge)
                const addButtonElm: HTMLElement = addButton.render()
                footerContents.push(addButtonElm)
        
                DomUtils.appendChildMultiple(footerElm,footerContents)
                break;
        }
        return footerElm;
    }
}