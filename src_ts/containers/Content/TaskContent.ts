import { rootDiv } from "./../../utils/constants"
import { DomUtils } from "./../../utils/domUtils"
import { PageContent } from "./PageContent"
import { TaskColumn} from "./TaskColumn"

export class TaskContent implements PageContent{//タスクのページを作成するクラス
    public render(): HTMLElement[]{
        const results: HTMLElement[] = [];
        const taskContent :TaskContent= new TaskContent();
        const result:HTMLElement = taskContent.renderTask();
        results.push(result);
        return results
    }
    
    private renderTask(): HTMLElement{
        const taskColumn : TaskColumn = new TaskColumn();
        const result:HTMLElement = taskColumn.render();
        return result
    }
}