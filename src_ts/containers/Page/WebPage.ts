import { Header } from "./Header"
import { Content } from "./Content"
import { Footer } from "./Footer"
import { Page } from "../../components/Ui/Page"
import { DomUtils } from "../../utils/domUtils";

export class WebPage extends Page{
    render(): HTMLElement{// ページを作成するメソッド
        const result:HTMLElement = DomUtils.createElement("div")

        // ヘッダーを作成する
        const header = new Header(this.pageType)
        const headerElm: HTMLElement = header.render()
        result.appendChild(headerElm)

        // コンテンツを作成する
        const content = new Content(this.pageType)
        const contentElm: HTMLElement = content.render()
        result.appendChild(contentElm)

        // フッターを作成する
        const footer = new Footer(this.pageType)
        const footerElm: HTMLElement = footer.render()
        if(footerElm){
            result.appendChild(footerElm)
        }

        return result
    }
}