import firebase from 'firebase/app';
import { Auth, getAuth, sendPasswordResetEmail } from 'firebase/auth'

import { Form } from "../components/Ui/Form"
import { LoginForm } from "../components/Ui/LoginForm"
import { indexPageUrl, registerPageUrl, rootDiv } from "../utils/constants";
import { LoginData } from "../utils/types";
import { DomUtils } from "./../utils/domUtils"
import { AppUser } from "./../utils/AppUser"
export class LoginPage{//ログインのページを作成するクラス
    create() :void{
        const login = (data: LoginData) => {//ボタンに適用する、ログインする処理
            console.log(data);
            const appUser:AppUser = new AppUser()
            appUser.setUserInfo(data.email,data.password)
            appUser.signIn(indexPageUrl)
        }

        const result: HTMLElement[] = new Array
        const domUtils: DomUtils = new DomUtils(rootDiv)

        //ヘッダーを作成
        const headerElm: HTMLElement = domUtils.createElement("header","","MySchedule")
        result.push(headerElm)

        //ログインフォームを作成
        const form: LoginForm = new LoginForm(login)
        const formElm:HTMLFormElement  = form.render()
        result.push(formElm)

        //ユーザー登録ページへのリンクを作成
        const registerLinkElm: HTMLAnchorElement = domUtils.createElement("a","","アカウントを作成") as HTMLAnchorElement;
        registerLinkElm.id = "register"
        registerLinkElm.href = registerPageUrl;
        result.push(registerLinkElm);

        const br0: HTMLElement = domUtils.createElement("br");
        result.push(br0);

        //パスワードをリセット用リンクもどきを作成
        const passwordResetElm: HTMLAnchorElement = domUtils.createElement("a","","パスワードを忘れた場合") as HTMLAnchorElement;
        passwordResetElm.id = "passwordReset"
        passwordResetElm.addEventListener("click", function() {
            //パスワードリセットのメールを送るために、アカウントのメールアドレスを求める
            const email = window.prompt("パスワードをリセットするためのメールを送ります。\nアカウントのメールアドレスを入力してください。", "");
            if(Form.mailCheck(email)){// 入力内容が正しいメールアドレス場合
                const appUser:AppUser = new AppUser()
                appUser.resetEmail(email) // パスワードリセットのメールを送る
                window.alert("パスワードリセットのメールを送りました。");
            }else{// 空の場合やキャンセルした場合は警告ダイアログを表示
                window.alert("正しいメールアドレスを入力してください。");
            }
        });
        result.push(passwordResetElm);

        //完成した要素群をrootのdiv要素に全て追加する
        domUtils.appendChildMultiple(rootDiv,result)
    }
}