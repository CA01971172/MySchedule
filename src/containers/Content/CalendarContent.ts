import { PageContent } from "./PageContent"
import { rootDiv } from "./../../utils/constants"
import { DomUtils } from "./../../utils/domUtils"

export class CalendarContent implements PageContent{//カレンダーのページを作成するクラス
    render(): HTMLElement[]{
        const result: HTMLElement[] = new Array
        result.push(DomUtils.createElement("div",[],"calendar"))
        return result
    }
}