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
// import { createIndexPage } from './../pages/IndexPage';
// import { createLoginPage } from './../pages/LoginPage';
// import { createTimetablePage } from './../containers/TimetableContainer';
// import { createTaskPage } from './../containers/TaskContainer';
// import { createShiftPage } from './../containers/ShiftContainer';
// import { createEventPage } from './../containers/EventContainer';
// import { createCalenderPage } from './../pages/CalenderPage';
export class PageUtils {//それぞれのページごとの内容を作成するクラス
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
    const pageQuery:string|null = this.getQuery("page")
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
        const modeQuery:string|null = this.getQuery("mode")
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

  private getQuery(paramName:string):string|null{//クエリ文字列(URLパラメータ)を取得するメソッド
    const pageUrl=window.location.href//今開いているページのパス
    paramName=paramName.replace(/[\[\]]/g,"\\$&");
    const regex=new RegExp("[?&]"+paramName+"(=([^&#]*)|&|#|$)"),
    results=regex.exec(pageUrl)
    if(!results)return null
    if(!results[2])return ""
    return decodeURIComponent(results[2].replace(/\+/g," "))
  }

  createContentByPageType():void{//ページの種類ごとにページの中身を作成するメソッド
    if(this.pageType === undefined)return
    switch(this.pageType){
      case null://トップページを作成する
        //createIndexPage()
        break
      case "login"://ログインページを作成する
        //createLoginPage()
        break
      case "timetable"://時間割管理ページを作成する
        //createTimetablePage()
        break
      case "task"://課題管理ページを作成する
        //createTaskPage()
        break
      case "shift"://アルバイト管理ページを作成する
        //createShiftPage()
        break
      case "event"://予定管理ページを作成する
        // createEventPage()
        break
      case "calendar"://カレンダーページを作成する
        //createCalenderPage()
        break
      default:
        //例外処理
        break
    }
  }
}