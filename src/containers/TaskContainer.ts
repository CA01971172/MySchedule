import { TaskForm } from "./../components/Task/TaskForm"
import { TaskList } from "./../components/Task/TaskList"
import { PageUtils } from "./../utils/pageUtils"
import { PageModeType } from "./../utils/types"

export class TaskPage{//タスクのページを作成するクラス
    create(): void {// タスクのページを作成するメソッド
        const pageMode: PageModeType = PageUtils.checkPageType();
        const page: TaskList | TaskForm = this.createPage(pageMode);
        page.create();
    }

    private createPage(pageMode: PageModeType): TaskForm | TaskList {//ページの種類に合わせて、インスタンスを作成するメソッド
        if (pageMode === null) {//一覧表示ページの場合
            return new TaskList();
        } else if (pageMode === "edit") {//入力フォームページの場合
            return new TaskForm();
        } else {
            //例外処理
            throw new Error("Invalid page mode.");
        }
    }
}