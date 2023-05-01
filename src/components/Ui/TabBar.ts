import { rootDiv } from "../../utils/constants"
import { DomUtils } from "../../utils/domUtils"
import { Page } from "./Page"
import { PageType } from "../../utils/types"
import { Content } from "./../../containers//Page/Content"

export class TabBar extends Page{ // タブバーを作成するクラス
    private tabBarElm: HTMLElement

    constructor(pageType: PageType){
        super(pageType)
        this.tabBarElm = DomUtils.createElement("div", ["tabBar","bg-primary"])
    }

    render(): HTMLElement{ // タブバーを作成するメソッド
        const tabs: HTMLElement[] = new Array

        switch(this.pageType){
            case "login":
            case "register":
                const titleName: string = "MySchedule";
                const titleElm: HTMLElement = DomUtils.createElement("div",["title"],titleName)
                titleElm.classList.add("fw-bold")
                tabs.push(titleElm)
                break;
            case null:
            case "timetable":
            case "task":
            case "shift":
            case "event":
            case "calendar":
                // 時間割タブを作成する
                const timetableName: string = "時間割";
                const timetableElm: HTMLElement = DomUtils.createElement("div",["timetable"],timetableName)
                if(this.pageType === "timetable"){
                    timetableElm.classList.add("fw-bold","enable-tab")
                }
                timetableElm.addEventListener("click", () => {
                    this.changeTab("timetable", timetableElm)
                })
                tabs.push(timetableElm)

                // 課題タブを作成する
                const taskName: string = "課題";
                const taskElem: HTMLElement = DomUtils.createElement("div",["task"],taskName)
                if(this.pageType === "task"){
                    taskElem.classList.add("fw-bold","enable-tab")
                }
                taskElem.addEventListener("click", () => {
                    this.changeTab("task", taskElem)
                })
                tabs.push(taskElem)

                // バイトタブを作成する
                const shiftName: string = "バイト";
                const shiftElm: HTMLElement = DomUtils.createElement("div",["shift"],shiftName)
                if(this.pageType === "shift"){
                    shiftElm.classList.add("fw-bold","enable-tab")
                }
                shiftElm.addEventListener("click", () => {
                    this.changeTab("shift", shiftElm)
                })
                tabs.push(shiftElm)

                // 予定タブを作成する
                const eventName: string = "予定";
                const eventElm: HTMLElement = DomUtils.createElement("div",["event"],eventName)
                tabs.push(eventElm)
                if(this.pageType === "event"){
                    eventElm.classList.add("fw-bold","enable-tab")
                }
                eventElm.addEventListener("click", () => {
                    this.changeTab("event", eventElm)
                })

                // カレンダータブを作成する
                const calendarName: string = "カレンダー";
                const calendarElm: HTMLElement = DomUtils.createElement("div",["calendar"],calendarName)
                if((this.pageType === "calendar")||(this.pageType === null)){
                    calendarElm.classList.add("fw-bold","enable-tab")
                }
                calendarElm.addEventListener("click", () => {
                    this.changeTab("calendar", calendarElm)
                })
                tabs.push(calendarElm)
                break;
            default:
                // 例外処理
                break;
        }

        DomUtils.appendChildMultiple(this.tabBarElm,tabs)
        return this.tabBarElm
    }

    private changeTab(nextPageType: PageType, nextElement: HTMLElement): void{ // タブを切り替えるメソッド
        const enableTab: HTMLElement | null = this.tabBarElm.querySelector(".enable-tab")
        if(enableTab){
        // 現在開いているタブの状態を元に戻す
        enableTab.classList.remove("fw-bold","enable-tab");
        }

        // 次に開くタブを有効化する
        this.pageType = nextPageType
        nextElement.classList.add("fw-bold","enable-tab");

        // コンテンツの中身を挿げ替える
        const nowContentElm: HTMLElement | null = rootDiv.querySelector(".content")
        if(nowContentElm){
            const nextContent: Content = new Content(nextPageType)
            const nextContentElm = nextContent.render()
            rootDiv.replaceChild(nextContentElm, nowContentElm);
        }
    }
}