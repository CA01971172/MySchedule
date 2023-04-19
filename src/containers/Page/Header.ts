import { rootDiv } from "../../utils/constants"
import { DomUtils } from "../../utils/domUtils"
import { Page } from "../../components/Ui/Page"
import { TabBar } from "./../../components/Ui/TabBar"

export class Header extends Page{ // ヘッダーを作成するクラス
    render(): HTMLElement{ // ヘッダーを作成するメソッド
        const headerElm: HTMLElement = DomUtils.createElement("header")
        const headers: HTMLElement[] = new Array

        // タブバーを作成する
        const tabBar: TabBar = new TabBar(this.pageType)
        const tabBarElm:HTMLElement = tabBar.render()
        headers.push(tabBarElm)

        DomUtils.appendChildMultiple(headerElm,headers)
        return headerElm
    }
}