import {
    createUserWithEmailAndPassword,
    sendEmailVerification ,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    Auth,
    getAuth,
    signOut,
    onAuthStateChanged,
    User
} from 'firebase/auth'
import { FirebaseError } from '@firebase/util'
import { IndexPageUrl, LoginPageUrl } from "./constants"
import { UserInfo } from "./types"
import { QueryUtils } from "./QueryUtils"
export class AppUser {
    private static uid: string = "";
    private static userInfo: UserInfo = {
        email:"",
        password:""
    } as UserInfo;

    public static setUserInfo(email: string, password: string){//フィールドuserInfoにプロパティを代入するメソッド
        const userInfo:UserInfo={} as UserInfo
        userInfo.email=email
        userInfo.password=password
        AppUser.userInfo=userInfo
    }

    public static async assignUserInfo():Promise<void>{ // ユーザーの認証情報を取得してid等をフィールドに代入するメソッド
        const authState: User | null = await AppUser.getAuthState()
        if(authState){
            AppUser.uid = authState.uid
            if(authState.email){
                AppUser.userInfo.email=authState.email
            }
        }
    }

    public static async signUp(redirectLink?: string):Promise<void>{//サインアップするメソッド
        try {
            const auth: Auth = getAuth()
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                AppUser.userInfo.email,
                AppUser.userInfo.password
            )
            await sendEmailVerification(userCredential.user)
            console.log("email sended")
            window.alert("メールアドレスに登録確認メールを送信しました。")
            if(redirectLink){
                location.href = redirectLink
            }
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.log(e)
                window.alert("ユーザー登録に失敗しました。\n既にメールアドレスが使用されている可能性があります。")
            }
        }
    }

    public static async signIn(redirectLink?: string):Promise<void>{//サインインするメソッド
        try {
            const auth: Auth = getAuth()
            await signInWithEmailAndPassword(
                auth,
                AppUser.userInfo.email,
                AppUser.userInfo.password
            )
            if(redirectLink){
                location.href = redirectLink
            }
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.log(e)
                window.alert("ログインに失敗しました。\nパスワードが間違っているか、アカウントが存在しない可能性があります。")
            }
        }
    }

    public static async signOut(redirectLink?: string):Promise<void>{//サインアウトするメソッド
        try {
            const auth: Auth = getAuth()
            await signOut(auth)
            if(redirectLink){
                location.href = redirectLink
            }
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.log(e)
            }
        }
    }

    public static resetEmail(email: string): void{ // パスワードをリセットするメソッド
        const auth: Auth = getAuth()
        sendPasswordResetEmail(auth, email); // パスワードリセットのEmailを送る
    }

    private static async getAuthState():Promise<User | null>{ // ユーザーの認証情報を取得するメソッド
        return new Promise((resolve, reject) => {
            const auth: Auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    const uid = user.uid;
                    resolve(user);
                } else {
                    // User is signed out
                    resolve(null);
                }
            });
        });
    }

    public static async redirect():Promise<void>{ // 認証状態に合わせて正しいページにリダイレクトするメソッド
        const authState: User | null  = await AppUser.getAuthState()
        console.log(authState)
        const isLoginContent: boolean = QueryUtils.matchQuery("page","login")
        const isRegisterContent: boolean = QueryUtils.matchQuery("page","register")
        if(authState && (isLoginContent || isRegisterContent)){//ユーザーが認証されている、かつログイン/ユーザー登録ページの場合
            location.href=IndexPageUrl//トップページにリダイレクトする
        }else if(!authState && !(isLoginContent || isRegisterContent)){//ユーザーが認証されていない、かつログインページでもユーザー登録ページでもない
            location.href=LoginPageUrl
        }else{
            //認証状態とページの組み合わせが正しい場合は処理を実行しない
        }
    }
}