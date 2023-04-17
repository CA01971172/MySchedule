import { PageType, PageStructure } from "./types";
import { rootDiv } from "./constants";
import { Page } from "./../components/Ui/Page"

export class PageUtils {//それぞれのページごとの内容を作成するなど、ページを扱うためのクラス
    public static getPageType(): PageType{//現在開いているページの種類を取得する関数
        //クエリ文字列のパラメータ"page"の値を取得する
        let result: PageType
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
            result = pageQuery as PageType
            return result
        } else {
        // 例外処理
            return
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
        const pageQuery: string | null = PageUtils.getQuery(paramName)
        if(pageQuery === value){
            return true
        }else{
            return false
        }
    }

    createPage(): void{ // ページを作成するメソッド
        const page: Page = new Page(PageUtils.getPageType())
        const pageStructure: PageStructure = page.render()
        for (const [key, value] of Object.entries(pageStructure)) {
            rootDiv.appendChild(value) // pageStructureの全プロパティをrootのdiv要素に全て追加する
        }
    }
}