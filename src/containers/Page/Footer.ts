import { DomUtils } from "../../utils/domUtils"
import { Page } from "../../components/Ui/Page"
import { AddButton } from "../../components/Ui/AddButton"
import { LogoutButton } from "../../components/Ui/LogoutButton"

export class Footer extends Page{ // フッターを作成するクラス
    render(): HTMLElement{ // フッターを作成するメソッド
        switch(this.pageType){
            case null:
            case "timetable":
            case "task":
            case "shift":
            case "event":
            case "calendar":
                const footerElm: HTMLElement = DomUtils.createElement("footer")
                const footerContents: HTMLElement[] = new Array
        
                // ログアウトボタンを作成する
                const logoutButton: LogoutButton = new LogoutButton()
                const logoutButtonElm: HTMLElement = logoutButton.render()
                footerContents.push(logoutButtonElm)
        
                // ページ編集用の追加動作用button要素を作成する
                const hoge: (() => void) = function(){console.log("hoge")}
                const addButton: AddButton = new AddButton(hoge)
                const addButtonElm: HTMLElement = addButton.render()
                footerContents.push(addButtonElm)
        
                DomUtils.appendChildMultiple(footerElm,footerContents)
                return footerElm;
            default:
                // ログインページなどでは操作ボタン(フッター)は作成しない
                return;
        }
    }
}