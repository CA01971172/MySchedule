import { PageContent } from "./PageContent"
import { rootDiv } from "./../../utils/constants"
import { DomUtils } from "./../../utils/domUtils"

export class EventContent  implements PageContent{//予定のページを作成するクラス
    render(): HTMLElement[]{
        const result: HTMLElement[] = new Array
        return result
    }
}