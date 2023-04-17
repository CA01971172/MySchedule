import { PageType } from "../../utils/types";
import { rootDiv } from "../../utils/constants"
import { DomUtils } from "../../utils/domUtils";
/* ページを作成する手続きをまとめた各関数をimportする */
// import { IndexContent } from './../../pages/IndexContent';
import { LoginContent } from '../Content/LoginContent';
// import { RegisterContent } from './../../pages/RegisterContent';
// import { TimetableContent } from './../../containers/TimetableContainer';
// import { TaskContent } from './../../containers/TaskContainer';
// import { ShiftContent } from './../../containers/ShiftContainer';
// import { EventContent } from './../../containers/EventContainer';
// import { CalenderContent } from './../../pages/CalenderContent';

export class Content{
    private pageType: PageType

    constructor(pageType: PageType){
        this.pageType = pageType
    }

    render(): HTMLElement{//ページの種類ごとにページの中身を作成するメソッド
        const domUtils: DomUtils = new DomUtils(rootDiv)
        let result: HTMLElement = domUtils.createElement("div","content")
        let content: HTMLElement[] = new Array

        switch (this.pageType) {
            case null://トップページを作成する
                // const IndexContent: IndexContent = new IndexContent();
                // IndexContent.render();
                break;
            case "login"://ログインページを作成する
                const LoginContent: LoginContent = new LoginContent();
                content = LoginContent.render();
                break;
            case "register"://ユーザー登録ページを作成する
                // const RegisterContent: RegisterContent = new RegisterContent();
                // content = RegisterContent.render();
                break;
            case "timetable"://時間割管理ページを作成する
                // const TimetableContent: TimetableContent = new TimetableContent();
                // content = TimetableContent.render();
                break;
            case "task"://課題管理ページを作成する
                // const TaskContent: TaskContent = new TaskContent();
                // content = TaskContent.render();
                break;
            case "shift"://アルバイト管理ページを作成する
                // const ShiftContent: ShiftContent = new ShiftContent();
                // content = ShiftContent.render();
                break;
            case "event"://予定管理ページを作成する
                // const EventContent: EventContent = new EventContent();
                // content = EventContent.render();
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