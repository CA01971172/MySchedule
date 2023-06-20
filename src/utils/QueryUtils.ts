import { PageType } from "./types";

export default class QueryUtils {//ページの種類など、クエリ文字列を扱うためのクラス
    public static getPageType(): PageType{//現在開いているページの種類を取得する関数
        //クエリ文字列のパラメータ"page"の値を取得する
        let result: PageType
        const pageQuery:string|null = QueryUtils.getQuery("page")
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
            result = pageQuery as PageType
            return result
        } else {
        // 例外処理
            throw new Error("不正なpageクエリ")
        }
    }

    private static getQuery(paramName: string): string | null {//クエリ文字列(URLパラメータ)を取得するメソッド
        const pageUrl=window.location.href//今開いているページのパス
        paramName=paramName.replace(/[\[\]]/g,"\\$&");
        const regex=new RegExp("[?&]"+paramName+"(=([^&#]*)|&|#|$)"),
        results=regex.exec(pageUrl)
        if(!results)return null
        if(!results[2])return ""
        return decodeURIComponent(results[2].replace(/\+/g," "))
    }

    public static matchQuery(paramName: string, value: string | null){//クエリ文字列が指定された値と合致するかどうか調べるメソッド
        const pageQuery: string | null = QueryUtils.getQuery(paramName)
        if(pageQuery === value){
            return true
        }else{
            return false
        }
    }
}