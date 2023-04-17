import { rootDiv } from "./../../utils/constants"
import { DomUtils } from "./../../utils/domUtils"

export class CalendarContent{//カレンダーのページを作成するクラス
    render(): HTMLElement[]{
        const result: HTMLElement[] = new Array
        const domUtils: DomUtils = new DomUtils(rootDiv)
        result.push(domUtils.createElement("div","","calendar"))
        return result
    }
}