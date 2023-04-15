import { EventForm } from "./../components/Event/EventForm"
import { EventList } from "./../components/Event/EventList"
import { PageUtils } from "./../utils/pageUtils"
import { PageModeType } from "./../utils/types"

export class EventPage {//予定のページを作成するクラス
    create(): void {//予定のページを作成するメソッド
        const pageMode: PageModeType = PageUtils.checkPageType();
        const page: EventList | EventForm = this.createPage(pageMode);
        page.create();
    }

    private createPage(pageMode: PageModeType): EventForm | EventList {//ページの種類に合わせて、インスタンスを作成するメソッド
        if (pageMode === null) {//一覧表示ページの場合
            return new EventList();
        } else if (pageMode === "edit") {//入力フォームページの場合
            return new EventForm();
        } else {
            //例外処理
            throw new Error("Invalid page mode.");
        }
    }
}