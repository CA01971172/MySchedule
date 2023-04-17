import { rootDiv } from "./../../utils/constants"
import { DomUtils } from "./../../utils/domUtils"

export class ShiftContent {//アルバイトシフトのページを作成するクラス
    render(): HTMLElement[]{
        const result: HTMLElement[] = new Array
        const domUtils: DomUtils = new DomUtils(rootDiv)
        return result
    }
}