import { rootDiv } from "./../../utils/constants"
import { DomUtils } from "./../../utils/domUtils"

export class TaskContent{//タスクのページを作成するクラス
    render(): HTMLElement[]{
        const result: HTMLElement[] = new Array
        const domUtils: DomUtils = new DomUtils(rootDiv)
        return result
    }
}