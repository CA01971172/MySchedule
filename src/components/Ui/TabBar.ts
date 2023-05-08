import { rootDiv } from "../../utils/constants"
import { DomUtils } from "../../utils/domUtils"
import { Page } from "./Page"
import { PageType } from "../../utils/types"
import { Content } from "./../../containers//Page/Content"

export class TabBar extends Page{ // タブバーを作成するクラス
    render(): HTMLElement{ // タブバーを作成するメソッド
        const navElm: HTMLElement = DomUtils.createElement("nav", ["navbar","navbar-expand","navbar-dark","bg-primary"])

        const logoElm: HTMLElement = DomUtils.createElement("div", ["navbar-brand", "d-none" ,"d-md-block"])
        navElm.appendChild(logoElm)

        const tabElm: HTMLElement = DomUtils.createElement("div", ["navbar-collapse", "justify-content-center"])
        navElm.appendChild(tabElm)

        const ulElm: HTMLElement = DomUtils.createElement("ul", ["navbar-nav", "list-group-horizontal"])
        tabElm.appendChild(ulElm)

        switch(this.pageType){
            case "login":
            case "register":
                const titleElm: HTMLElement = this.renderTab("MySchedule", "title", true)
                ulElm.appendChild(titleElm)
                break;
            default: // 例外処理
                this.pageType = null;
            case null:
            case "timetable":
            case "task":
            case "shift":
            case "event":
            case "calendar":
                // 時間割タブを作成する
                const isTimetableActive: boolean = (this.pageType === "timetable")
                const timetableElm: HTMLElement = this.renderTab("時間割", "timetable", isTimetableActive, ulElm)
                ulElm.appendChild(timetableElm)

                // 課題タブを作成する
                const isTaskActive: boolean = (this.pageType === "task")
                const taskElm: HTMLElement = this.renderTab("課題", "task", isTaskActive, ulElm)
                ulElm.appendChild(taskElm)

                // バイトタブを作成する
                const isShiftActive: boolean = (this.pageType === "task")
                const shiftElm: HTMLElement = this.renderTab("バイト", "task", isShiftActive, ulElm)
                ulElm.appendChild(shiftElm)

                // 予定タブを作成する
                const isEventActive: boolean = (this.pageType === "event")
                const eventElm: HTMLElement = this.renderTab("予定", "event", isEventActive, ulElm)
                ulElm.appendChild(eventElm)

                // カレンダータブを作成する
                const isCalendarActive: boolean = ((this.pageType === "calendar") || (this.pageType === null))
                const calendarElm: HTMLElement = this.renderTab("カレンダー", "calendar", isCalendarActive, ulElm)
                ulElm.appendChild(calendarElm)
                break;
        }
        return navElm
    }

    private renderTab(title :string, pageType: PageType|"title", isEnabled: boolean, ulElm?: HTMLElement): HTMLElement{//タブを1つ作成するメソッド
        // カレンダータブを作成する
        const tabLi: HTMLElement = DomUtils.createElement("li", ["nav-item", pageType])
        const tabA: HTMLElement = DomUtils.createElement("div", "nav-link", title)
        tabLi.appendChild(tabA)
        if(isEnabled){
            tabA.classList.add("active")
        }
        if((pageType !== "title") && (ulElm)){
            tabLi.addEventListener("click", () => {
                this.changeTab(pageType, tabA, ulElm)
            })
        }
        return tabLi
    }

    private changeTab(nextPageType: PageType, nextElement: HTMLElement, ulElm: HTMLElement): void{ // タブを切り替えるメソッド
        const enableTab: HTMLElement | null = ulElm.querySelector(".active")
        if(enableTab){
            // 現在開いているタブの状態を元に戻す
            enableTab.classList.remove("active");
        }

        // 次に開くタブを有効化する
        this.pageType = nextPageType
        nextElement.classList.add("active");

        // コンテンツの中身を挿げ替える
        const nowContentElm: HTMLElement | null = rootDiv.querySelector(".content")
        if(nowContentElm){
            const nextContent: Content = new Content(nextPageType)
            const nextContentElm = nextContent.render()
            rootDiv.firstChild.replaceChild(nextContentElm, nowContentElm);
        }
    }
}