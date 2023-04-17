import { PageType } from "../../utils/types"
import { rootDiv } from "../../utils/constants"
import { DomUtils } from "../../utils/domUtils"

export class Header{ // ヘッダーを作成するクラス
    private pageType: PageType

    constructor(pageType: PageType){
        this.pageType = pageType
    }

    render(): HTMLElement{ // ヘッダーを作成するメソッド
        const domUtils: DomUtils = new DomUtils(rootDiv)
        const headerElm: HTMLElement = domUtils.createElement("header")
        const headerTab: HTMLElement[] = new Array

        switch(this.pageType){
            case "login":
            case "register":
                const titleName: string = "MySchedule";
                const titleElm: HTMLElement = domUtils.createElement("div","title",titleName)
                headerTab.push(titleElm)
                break;
            case null:
            case "timetable":
            case "task":
            case "shift":
            case "event":
                // 時間割タブを作成する
                const timetableName: string = "時間割";
                const timetableElm: HTMLElement = domUtils.createElement("div","timetable",timetableName)
                headerTab.push(timetableElm)
                // 課題タブを作成する
                const taskName: string = "課題";
                const taskElem: HTMLElement = domUtils.createElement("div","task",taskName)
                headerTab.push(taskElem)
                // バイトタブを作成する
                const shiftName: string = "バイト";
                const shiftElm: HTMLElement = domUtils.createElement("div","shift",shiftName)
                headerTab.push(shiftElm)
                // 予定タブを作成する
                const eventName: string = "予定";
                const eventElm: HTMLElement = domUtils.createElement("div","event",eventName)
                headerTab.push(eventElm)
                // カレンダータブを作成する
                const calendarName: string = "カレンダー";
                const calendarElm: HTMLElement = domUtils.createElement("div","calendar",calendarName)
                headerTab.push(calendarElm)
                break;
        }

        domUtils.appendChildMultiple(headerElm,headerTab)
        return headerElm
    }
}