import { TimetableForm } from "./../components/Timetable/TimetableForm"
import { TimetableList } from "./../components/Timetable/TimetableList"
import { PageUtils } from "./../utils/domUtils"
import { PageModeType } from "./../utils/types"

export class TimetablePage{//時間割のページを作成するクラス
    create(): void {// 時間割のページを作成するメソッド
        const pageMode: PageModeType = PageUtils.checkPageType();
        const page: TimetableList | TimetableForm = this.createPage(pageMode);
        page.create();
    }

    private createPage(pageMode: PageModeType): TimetableForm | TimetableList {//ページの種類に合わせて、インスタンスを作成するメソッド
        if (pageMode === null) {//一覧表示ページの場合
            return new TimetableList();
        } else if (pageMode === "edit") {//入力フォームページの場合
            return new TimetableForm();
        } else {
            //例外処理
            throw new Error("Invalid page mode.");
        }
    }
}