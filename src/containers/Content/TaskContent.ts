import { rootDiv } from "./../../utils/constants"
import { DomUtils } from "./../../utils/domUtils"
import { PageContent } from "./PageContent"

export class TaskContent implements PageContent{//タスクのページを作成するクラス
    render(): HTMLElement[]{
        const result: HTMLElement[] = new Array
        return result
    }
}