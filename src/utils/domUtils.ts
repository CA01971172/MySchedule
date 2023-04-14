export class DomUtils {//DOM操作用のクラス
    private parentElement: HTMLElement | null;
    private childElement: HTMLElement | null;
  
    constructor(parentId: string,childElement: HTMLElement | null) {
      this.parentElement = document.getElementById(parentId);
      this.childElement = childElement
      //後で this.appendChild(this.parentElement,this.childElement) のように実行してやると、作成した要素群をまとめたchildElementがparentElementに追加される。
    }
  
    /* ここから下はAIで用意した要るかどうかわからんメソッド共 */
    createElement(tagName: keyof HTMLElementTagNameMap, className?: string, innerText?: string): HTMLElement {
      const element = document.createElement(tagName);
      if (className) {
        element.classList.add(className);
      }
      if (innerText) {
        element.innerText = innerText;
      }
      return element;
    }
  
    createImg(src: string, alt?: string, className?: string): HTMLImageElement {
      const img = new Image();
      img.src = src;
      if (alt) {
        img.alt = alt;
      }
      if (className) {
        img.classList.add(className);
      }
      return img;
    }
  
    appendChild(parent: HTMLElement, child: HTMLElement) {
      parent.appendChild(child);
    }
  
    appendElement(tagName: keyof HTMLElementTagNameMap, className?: string, innerText?: string): void {
      const element = this.createElement(tagName, className, innerText);
      if(this.parentElement)this.appendChild(this.parentElement, element);
    }
  
    appendImg(src: string, alt?: string, className?: string): void {
      const img = this.createImg(src, alt, className);
      if(this.parentElement)this.appendChild(this.parentElement, img);
    }
}

import { PageType, PageModeType } from "./types";
/* ページを作成する手続きをまとめた各関数をimportする */
// import { IndexPage } from './../pages/IndexPage';
// import { LoginPage } from './../pages/LoginPage';
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