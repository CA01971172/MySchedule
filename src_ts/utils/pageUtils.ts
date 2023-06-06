import { PageType } from "./types";
import { rootDiv } from "./constants";
import { WebPage } from "../containers/Page/WebPage"
import { QueryUtils } from "./QueryUtils"

export class PageUtils {//それぞれのページごとの内容を作成するなど、ページを扱うためのクラス
    createPage(): void{ // ページを作成するメソッド
        const page: WebPage = new WebPage(QueryUtils.getPageType())
        const pageElm: HTMLElement = page.render()
        rootDiv.appendChild(pageElm) // pageの要素をrootのdiv要素に追加する
    }
}