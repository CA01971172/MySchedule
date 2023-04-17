import { rootDiv } from "../../utils/constants"
import { DomUtils } from "../../utils/domUtils"
import { Page } from "./Page"
import { ContentType } from "../../utils/types"

export class Header extends Page{ // ヘッダーを作成するクラス
    render(): HTMLElement{ // ヘッダーを作成するメソッド
        const domUtils: DomUtils = new DomUtils(rootDiv)
        const headerElm: HTMLElement = domUtils.createElement("header")
        const headerTab: HTMLElement[] = new Array

        switch(this.pageType){
            case "login":
            case "register":
                const titleName: string = "MySchedule";
                const titleElm: HTMLElement = domUtils.createElement("div","title",titleName)
                titleElm.innerHTML = '<b>' + titleElm.innerHTML + '</b>';
                headerTab.push(titleElm)
                break;
            case null:
            case "timetable":
            case "task":
            case "shift":
            case "event":
            case "calendar":
                // 時間割タブを作成する
                const timetableName: string = "時間割";
                const timetableElm: HTMLElement = domUtils.createElement("div","timetable",timetableName)
                if(this.pageType === "timetable"){
                    timetableElm.innerHTML = '<b>' + timetableElm.innerHTML + '</b>';
                    timetableElm.classList.add("enableTab");
                }
                timetableElm.addEventListener("click", () => {
                    this.changeTab("timetable", timetableElm)
                })
                headerTab.push(timetableElm)

                // 課題タブを作成する
                const taskName: string = "課題";
                const taskElem: HTMLElement = domUtils.createElement("div","task",taskName)
                if(this.pageType === "task"){
                    taskElem.innerHTML = '<b>' + taskElem.innerHTML + '</b>';
                    taskElem.classList.add("enableTab");
                }
                taskElem.addEventListener("click", () => {
                    this.changeTab("task", taskElem)
                })
                headerTab.push(taskElem)

                // バイトタブを作成する
                const shiftName: string = "バイト";
                const shiftElm: HTMLElement = domUtils.createElement("div","shift",shiftName)
                if(this.pageType === "shift"){
                    shiftElm.innerHTML = '<b>' + shiftElm.innerHTML + '</b>';
                    shiftElm.classList.add("enableTab");
                }
                shiftElm.addEventListener("click", () => {
                    this.changeTab("shift", shiftElm)
                })
                headerTab.push(shiftElm)

                // 予定タブを作成する
                const eventName: string = "予定";
                const eventElm: HTMLElement = domUtils.createElement("div","event",eventName)
                headerTab.push(eventElm)
                if(this.pageType === "event"){
                    eventElm.innerHTML = '<b>' + eventElm.innerHTML + '</b>';
                    eventElm.classList.add("enableTab");
                }
                eventElm.addEventListener("click", () => {
                    this.changeTab("event", eventElm)
                })

                // カレンダータブを作成する
                const calendarName: string = "カレンダー";
                const calendarElm: HTMLElement = domUtils.createElement("div","calendar",calendarName)
                if((this.pageType === "calendar")||(this.pageType === null)){
                    calendarElm.innerHTML = '<b>' + calendarElm.innerHTML + '</b>';
                    calendarElm.classList.add("enableTab");
                }
                calendarElm.addEventListener("click", () => {
                    this.changeTab("calendar", calendarElm)
                })
                headerTab.push(calendarElm)
                break;
            default:
                // 例外処理
                break;
        }

        domUtils.appendChildMultiple(headerElm,headerTab)
        return headerElm
    }

    private changeTab(nextPageType: PageType, nextElement: HTMLElement): void{ // タブを切り替えるメソッド
        const header: HTMLElement = rootDiv.querySelector("header")
        const enableTab: HTMLElement = header.querySelector(".enableTab")
        console.log(enableTab)
        // 現在開いているタブの状態を元に戻す
        enableTab.classList.remove("enableTab");
        enableTab.innerHTML = enableTab.innerText;
        // 次に開くタブを有効化する
        this.pageType = nextPageType
        nextElement.classList.add("enableTab");
        nextElement.innerHTML = '<b>' + nextElement.innerHTML + '</b>';
    }
}