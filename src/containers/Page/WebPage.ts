import { PageType, PageStructure } from "../../utils/types";
import { Header } from "./Header"
import { Content } from "./Content"
//import { Footer } from "./../../components/Ui/Footer"

export class WebPage{
    private pageType: PageType

    constructor(pageType: PageType){
        this.pageType = pageType
    }

    render(): PageStructure{// ページを作成するメソッド
        const result: PageStructure = {} as PageStructure

        // ヘッダーを作成する
        const header = new Header(this.pageType)
        const headerElm: HTMLElement = header.render()
        result.header = headerElm

        // コンテンツを作成する
        const content = new Content(this.pageType)
        const contentElm: HTMLElement = content.render()
        result.content = contentElm

        // フッターを作成する
/*         const footer = new Footer(this.pageType)
        const footerElm: HTMLElement = footer.render()
        if(footerElm){
            result.footer = footerElm
        } */

        return result
    }
}