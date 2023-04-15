import { PageType, PageModeType } from "./types";
/* ページを作成する手続きをまとめた各関数をimportする */
// import { IndexPage } from './../pages/IndexPage';
// import { LoginPage } from './../pages/LoginPage';
// import { RegisterPage } from './../pages/RegisterPage';
// import { TimetablePage } from './../containers/TimetableContainer';
// import { TaskPage } from './../containers/TaskContainer';
// import { ShiftPage } from './../containers/ShiftContainer';
// import { EventPage } from './../containers/EventContainer';
// import { CalenderPage } from './../pages/CalenderPage';
    export class PageUtils {//それぞれのページごとの内容を作成するなど、ページを扱うためのクラス
    private _pageType: PageType|undefined//初期値はundefined
    private _modeType: PageModeType|undefined

    constructor(){
        
    }

    get pageType(): PageType|undefined {
        return this._pageType;
    }

    private set pageType(pageType: PageType|undefined) {
        this._pageType = pageType;
    }

    get modeType(): PageModeType|undefined {
        return this._modeType;
    }

    private set modeType(modeType: PageModeType|undefined) {
        this._modeType = modeType;
    }

    setPageType():void{//現在開いているページの種類を取得してフィールドに代入する関数
        //クエリ文字列のパラメータ"page"の値を取得する
        const pageQuery:string|null = PageUtils.getQuery("page")
        if (//queryがPageTypeに合致するかどうか
            pageQuery === null ||
            pageQuery === "login" ||
            pageQuery === "register" ||
            pageQuery === "timetable" ||
            pageQuery === "task" ||
            pageQuery === "shift" ||
            pageQuery === "event" ||
            pageQuery === "calendar"
        ) {
            this.pageType = pageQuery as PageType
            //クエリ文字列のパラメータ"mode"の値を取得する
            const modeQuery:string|null = PageUtils.getQuery("mode")
            if (//queryがModeTypeに合致するかどうか
            modeQuery === null ||
            modeQuery === "edit"
            ) {
            this.modeType = modeQuery as PageModeType
            return
            }
        } else {
        // 例外処理
        }
    }

    public static getQuery(paramName:string): string | null {//クエリ文字列(URLパラメータ)を取得するメソッド
        const pageUrl=window.location.href//今開いているページのパス
        paramName=paramName.replace(/[\[\]]/g,"\\$&");
        const regex=new RegExp("[?&]"+paramName+"(=([^&#]*)|&|#|$)"),
        results=regex.exec(pageUrl)
        if(!results)return null
        if(!results[2])return ""
        return decodeURIComponent(results[2].replace(/\+/g," "))
    }

    public static matchQuery(paramName:string,value:string|null){//クエリ文字列が指定された値と合致するかどうか調べるメソッド
        const pageQuery: string | null =PageUtils.getQuery(paramName)
        if(pageQuery === value){
        return true
        }else{
        return false
        }
    }

    public static checkPageType(): PageModeType{//ページの種類(一覧表示/入力フォーム)を取得するメソッド
        //入力フォームがないページのクエリ文字列はnull固定
        let result: PageModeType = null
        const modeQuery: string | null = PageUtils.getQuery("mode")
        if(modeQuery === "edit"){
            result = modeQuery
        }
        return result
    }

    createContentByPageType():void{//ページの種類ごとにページの中身を作成するメソッド
    if(this.pageType === undefined)return
    switch (this.pageType) {
        case null://トップページを作成する
            // const indexPage: IndexPage = new IndexPage();
            // indexPage.create();
            break;
        case "login"://ログインページを作成する
            // const loginPage: LoginPage = new LoginPage();
            // loginPage.create();
            break;
        case "register"://ユーザー登録ページを作成する
            // const registerPage: RegisterPage = new RegisterPage();
            // registerPage.create();
            break;
        case "timetable"://時間割管理ページを作成する
            // const timetablePage: TimetablePage = new TimetablePage();
            // timetablePage.create();
            break;
        case "task"://課題管理ページを作成する
            // const taskPage: TaskPage = new TaskPage();
            // taskPage.create();
            break;
        case "shift"://アルバイト管理ページを作成する
            // const shiftPage: ShiftPage = new ShiftPage();
            // shiftPage.create();
            break;
        case "event"://予定管理ページを作成する
            // const eventPage: EventPage = new EventPage();
            // eventPage.create();
            break;
        case "calendar"://カレンダーページを作成する
            // const calendarPage: CalendarPage = new CalendarPage();
            // calendarPage.create();
            break;
        default:
            //例外処理
            break;
        }
    }
}