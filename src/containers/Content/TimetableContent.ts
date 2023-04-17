import { rootDiv } from "./../../utils/constants"
import { DomUtils } from "./../../utils/domUtils"

export class TimetableContent{//時間割のページを作成するクラス
    render(): HTMLElement[]{
        const result: HTMLElement[] = new Array
        const domUtils: DomUtils = new DomUtils(rootDiv)
        return result
    }
}