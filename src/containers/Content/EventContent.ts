import { rootDiv } from "./../../utils/constants"
import { DomUtils } from "./../../utils/domUtils"

export class EventContent {//予定のページを作成するクラス
    render(): HTMLElement[]{
        const result: HTMLElement[] = new Array
        const domUtils: DomUtils = new DomUtils(rootDiv)
        return result
    }
}