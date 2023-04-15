import { FirebaseInitializer } from "./../lib/firebase/firebase"
import { AppUser } from "./AppUser"
import { indexPageUrl, loginPageUrl, registerPageUrl } from "./constants"
import { PageUtils } from "./pageUtils"


export class Application{//アプリの立ち上げなどを行うクラス
    public _appUser: AppUser

    constructor() {
        // 初期化処理など
    }

    public get appUser(): AppUser {
        return this._appUser;
    }
    
    private set appUser(value: AppUser) {
        this._appUser = value;
    }

    run():void{//アプリを立ち上げるためのメソッド
        this.initializeFirebase()
        this.redirect()
        this.createContent()
    }

    initializeFirebase():void{//firebaseをinitializeするメソッド
        const firebaseInitializer = new FirebaseInitializer()
        firebaseInitializer.initialize()
    }

    redirect():void{//ユーザーの認証状態に合わせて正しいページにリダイレクトするメソッド
        this.appUser = new AppUser()
        this.appUser.redirect(indexPageUrl, loginPageUrl ,registerPageUrl)
    }

    createContent():void{//それぞれのページごとの内容を作成するメソッド
        const pageCreator = new PageUtils
        pageCreator.setPageType()
        pageCreator.createContentByPageType()
    }
}