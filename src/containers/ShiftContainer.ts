import { ShiftForm } from "./../components/Shift/ShiftForm";
import { ShiftList } from "./../components/Shift/ShiftList";
import { PageUtils } from "./../utils/domUtils";
import { PageModeType } from "./../utils/types";

export class ShiftPage {//アルバイトシフトのページを作成するクラス
    create(): void {// アルバイトシフトのページを作成するメソッド
        const pageMode: PageModeType = PageUtils.checkPageType();
        const page: ShiftList | ShiftForm = this.createPage(pageMode);
        page.create();
    }

    private createPage(pageMode: PageModeType): ShiftForm | ShiftList {//ページの種類に合わせて、インスタンスを作成するメソッド
        if (pageMode === null) {//一覧表示ページの場合
            return new ShiftList();
        } else if (pageMode === "edit") {//入力フォームページの場合
            return new ShiftForm();
        } else {
            //例外処理
            throw new Error("Invalid page mode.");
        }
    }
}