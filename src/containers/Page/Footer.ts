/* <button type="button" class="btn btn-outline-danger">ログアウト</button>
<button type="button" class="btn btn-primary">
    <i class="bi bi-plus-lg"></i> 
</button> */

import { rootDiv } from "../../utils/constants"
import { DomUtils } from "../../utils/domUtils"
import { Page } from "./Page"
import { PageType } from "../../utils/types"
import { Content } from "./Content"
import { AddButton } from "../../components/Ui/AddButton"
import { LogoutButton } from "../../components/Ui/LogoutButton"

export class Footer extends Page{ // フッターを作成するクラス
    render(): HTMLElement{ // フッターを作成するメソッド
        const domUtils: DomUtils = new DomUtils(rootDiv)
        const footerElm: HTMLElement = domUtils.createElement("footer")
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

        domUtils.appendChildMultiple(footerElm,footerContents)
        return footerElm
    }
}