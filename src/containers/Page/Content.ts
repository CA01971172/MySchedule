import { rootDiv } from "../../utils/constants"
import { DomUtils } from "../../utils/domUtils";
import { Page } from "../../components/Ui/Page"
/* ページを作成する手続きをまとめた各関数をimportする */
import { TimetableContent } from './../Content/TimetableContent';
import { TaskContent } from './../Content/TaskContent';
import { ShiftContent } from './../Content/ShiftContent';
import { EventContent } from './../Content/EventContent';
import { CalendarContent } from './../Content/CalendarContent';
import { LoginContent } from './../Content/LoginContent';
import { RegisterContent } from './../Content/RegisterContent';

export class Content extends Page{
    render(): HTMLElement{//ページの種類ごとにページの中身を作成するメソッド
        let result: HTMLElement = DomUtils.createElement("div","content")
        let content: HTMLElement[] = new Array

        switch (this.pageType) {
            case "login"://ログインページを作成する
                const loginContent: LoginContent = new LoginContent();
                content = loginContent.render();
                break;
            case "register"://ユーザー登録ページを作成する
                const registerContent: RegisterContent = new RegisterContent();
                content = registerContent.render();
                break;
            case "timetable"://時間割管理ページを作成する
                const timetableContent: TimetableContent = new TimetableContent();
                content = timetableContent.render();
                break;
            case "task"://課題管理ページを作成する
                const taskContent: TaskContent = new TaskContent();
                content = taskContent.render();
                break;
            case "shift"://アルバイト管理ページを作成する
                const shiftContent: ShiftContent = new ShiftContent();
                content = shiftContent.render();
                break;
            case "event"://予定管理ページを作成する
                const eventContent: EventContent = new EventContent();
                content = eventContent.render();
                break;
            case null:
            case "calendar"://カレンダーページを作成する
                const calendarContent: CalendarContent = new CalendarContent();
                content = calendarContent.render();
                break;
            default:
                //例外処理
                break;
        }

        DomUtils.appendChildMultiple(result, content)
        return result
    }
}