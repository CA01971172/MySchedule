/* <button type="button" class="btn btn-outline-danger">ログアウト</button>
<button type="button" class="btn btn-primary">
    <i class="bi bi-plus-lg"></i> 
</button> */

import { rootDiv } from "../../utils/constants"
import { DomUtils } from "../../utils/domUtils"
import { Page } from "./Page"
import { PageType } from "../../utils/types"
import { Content } from "./Content"

export class Footer extends Page{ // フッターを作成するクラス
    render(): HTMLElement{ // フッターを作成するメソッド
        const domUtils: DomUtils = new DomUtils(rootDiv)
        const footerElm: HTMLElement = domUtils.createElement("footer")
        return footerElm
    }
}