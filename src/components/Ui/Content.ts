import { PageType } from "./../../utils/types";
import { rootDiv } from "./../../utils/constants"
import { DomUtils } from "./../../utils/domUtils";
/* ページを作成する手続きをまとめた各関数をimportする */
// import { IndexPage } from './../../pages/IndexPage';
import { LoginPage } from './../../pages/LoginPage';
// import { RegisterPage } from './../../pages/RegisterPage';
// import { TimetablePage } from './../../containers/TimetableContainer';
// import { TaskPage } from './../../containers/TaskContainer';
// import { ShiftPage } from './../../containers/ShiftContainer';
// import { EventPage } from './../../containers/EventContainer';
// import { CalenderPage } from './../../pages/CalenderPage';

export class Content{
    private pageType: PageType

    constructor(pageType: PageType){
        this.pageType = pageType
    }

    render(): HTMLElement{//ページの種類ごとにページの中身を作成するメソッド
        const domUtils: DomUtils = new DomUtils(rootDiv)
        let result: HTMLElement = domUtils.createElement("div",".content")
        let content: HTMLElement[] = new Array
        switch (this.pageType) {
            case null://トップページを作成する
                // const indexPage: IndexPage = new IndexPage();
                // indexPage.render();
                break;
            case "login"://ログインページを作成する
                const loginPage: LoginPage = new LoginPage();
                content = loginPage.render();
                break;
            case "register"://ユーザー登録ページを作成する
                // const registerPage: RegisterPage = new RegisterPage();
                // content = registerPage.render();
                break;
            case "timetable"://時間割管理ページを作成する
                // const timetablePage: TimetablePage = new TimetablePage();
                // content = timetablePage.render();
                break;
            case "task"://課題管理ページを作成する
                // const taskPage: TaskPage = new TaskPage();
                // content = taskPage.render();
                break;
            case "shift"://アルバイト管理ページを作成する
                // const shiftPage: ShiftPage = new ShiftPage();
                // content = shiftPage.render();
                break;
            case "event"://予定管理ページを作成する
                // const eventPage: EventPage = new EventPage();
                // content = eventPage.render();
                break;
            case "calendar"://カレンダーページを作成する
                // const calendarPage: CalendarPage = new CalendarPage();
                // content = calendarPage.render();
                break;
            default:
                //例外処理
                break;
        }
        domUtils.appendChildMultiple(result, content)
        return result
    }
}