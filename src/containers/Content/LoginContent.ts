import { Form } from "../../components/Ui/Form"
import { LoginForm } from "../../components/Login/LoginForm"
import { IndexPageUrl, RegisterPageUrl, rootDiv } from "../../utils/constants";
import { LoginData } from "../../utils/types";
import { DomUtils } from "../../utils/domUtils"
import { AppUser } from "../../utils/AppUser"
export class LoginContent{//ログインのページを作成するクラス
    render(): HTMLElement[]{
        const login = (data: LoginData) => {//ボタンに適用する、ログインする処理
            const appUser:AppUser = new AppUser()
            appUser.setUserInfo(data.email,data.password)
            appUser.signIn(IndexPageUrl)
        }

        const result: HTMLElement[] = new Array

        //タイトルを作成
        const titleElm: HTMLElement = DomUtils.createElement("div",["m-2"],"ログイン")
        result.push(titleElm)

        //ログインフォームを作成
        const form: LoginForm = new LoginForm(login)
        const formElm:HTMLFormElement  = form.render()
        result.push(formElm)

        //ユーザー登録ページへのリンクを作成
        const registerLinkElm: HTMLAnchorElement = DomUtils.createElement("a",[],"アカウントを作成") as HTMLAnchorElement;
        registerLinkElm.id = "register"
        registerLinkElm.href = RegisterPageUrl;
        result.push(registerLinkElm);

        const br0: HTMLElement = DomUtils.createElement("br");
        result.push(br0);

        //パスワードをリセット用リンクもどきを作成
        const passwordResetElm: HTMLAnchorElement = DomUtils.createElement("a",[],"パスワードを忘れた場合") as HTMLAnchorElement;
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

        return result
    }
}