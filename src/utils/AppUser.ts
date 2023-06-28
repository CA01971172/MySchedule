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
import { IndexPageUrl, LoginPageUrl, RegisterPageUrl } from "./constants"
import { UserInfo } from "./types"
import QueryUtils from "./QueryUtils"
import DbController from './DbController/DbController'

export default class AppUser {
    public static uid: string|null = null;
    private static userInfo: UserInfo = {
        email:"",
        password:""
    } as UserInfo;
    private static readonly serverAddress: string = "https://myschedule.iti2022kawahara.com"

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
            const auth: Auth = getAuth();
            const email: string = AppUser.userInfo.email;
            const password: string = AppUser.userInfo.password;

            // メールアドレスとパスワードでアカウントを登録する
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            // アカウントが登録されたことをメールで通知する
            await sendEmailVerification(userCredential.user)
            console.log("email sended")
            // window.alert("メールアドレスに登録確認メールを送信しました。")

            // データベースにアラートメール送信用のメールアドレスを登録する
            const authState: User | null = await AppUser.getAuthState()
            if(authState){
                const uid: string = authState.uid;
                await AppUser.registerEmail(uid, email);
            }

            // リダイレクトする
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

    public static async deleteUser(): Promise<void> {
        try{
            const uid: string = AppUser.uid || "";
            await DbController.deleteUserData(uid);
            await AppUser.deleteEmail(uid);
            const auth = getAuth();
            const currentUser = auth.currentUser;
            await currentUser?.delete(); // ユーザーを削除する
            location.href = RegisterPageUrl;
        }catch(e){
            console.log("failed to deleteUser", e);
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
        const isLoginContent: boolean = QueryUtils.matchQuery("page","login")
        const isRegisterContent: boolean = QueryUtils.matchQuery("page","register")
        if(authState && (isLoginContent || isRegisterContent)){//ユーザーが認証されている、かつログイン/ユーザー登録ページの場合
            location.href=IndexPageUrl//トップページにリダイレクトする
        }else if(!authState && !(isLoginContent || isRegisterContent)){//ユーザーが認証されていない、かつログインページでもユーザー登録ページでもない
            location.href=LoginPageUrl
        }else{
            //認証状態とページの組み合わせが正しい場合は処理を実行しない
            //ユーザーのuid等を取得しておく
            await AppUser.assignUserInfo()
        }
    }

    public static async checkPassword(password: string){ // 受け取ったパスワードがログイン中のアカウントのものと一致するかどうかチェックするメソッド
        try {
            const auth: Auth = getAuth()
            await signInWithEmailAndPassword(
                auth,
                AppUser.userInfo.email,
                password
            )
            return true;
        } catch (e) {
            return false;
        }
    }

    public static async registerEmail(uid: string, email: string): Promise<void>{ // サーバーを通してメールアドレスを登録するメソッド
        try{
            const serverLink: string = `${AppUser.serverAddress}/register-email`
            const emailData: {
                uid: string,
                email: string
            } = {
                uid,
                email
            };
            const response = await fetch(serverLink, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(emailData)
            });
            // const result = await response.text();
            // console.log(result);
        }catch(e){
            console.log(e);
            throw new Error("メールアドレスの登録に失敗しました");
        }
    }

    public static async deleteEmail(uid: string): Promise<void>{ // サーバーを通してメールアドレスを削除するメソッド
        try{
            const serverLink: string = `${AppUser.serverAddress}/delete-email`
            const sendData: {
                uid: string
            } = {
                uid
            };
            const response = await fetch(serverLink, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify(sendData)
            });
            // const result = await response.text();
            // console.log(result);
        }catch(e){
            console.log(e);
            throw new Error("メールアドレスの削除に失敗しました");
        }
    }
}