import { RegisterForm } from "../../components/register/RegisterForm"
import { IndexPageUrl, LoginPageUrl, rootDiv } from "../../utils/constants";
import { RegisterData } from "../../utils/types";
import { DomUtils } from "../../utils/domUtils"
import { AppUser } from "../../utils/AppUser"
export class RegisterContent{//ユーザー登録のページを作成するクラス
    render() :HTMLElement[]{
        const register = (data: RegisterData) => {//ボタンに適用する、ログインする処理
            const appUser:AppUser = new AppUser()
            if(data.password === data.passwordCheck){
                if(data.password.length >= 6){
                    appUser.setUserInfo(data.email,data.password)
                    appUser.signUp(IndexPageUrl)
                }else{
                    window.alert("パスワードは6文字以上必要です。")
                }
            }else{
                window.alert("パスワードが間違っています。")
            }
        }

        const result: HTMLElement[] = new Array

        //ユーザー登録フォームを作成
        const form: RegisterForm = new RegisterForm(register)
        const formElm:HTMLFormElement  = form.render()
        result.push(formElm)

        //ログインページへのリンクを作成
        const loginDiv: HTMLDivElement = DomUtils.createElement("div") as HTMLDivElement;
        loginDiv.id = "login";

        const loginText: Text = document.createTextNode("既にアカウントを持っている方は ");
        loginDiv.appendChild(loginText);

        const loginLink: HTMLAnchorElement = DomUtils.createElement("a", [],"こちら") as HTMLAnchorElement;
        loginLink.href = LoginPageUrl;
        loginDiv.appendChild(loginLink);
        result.push(loginDiv);

        return result
    }
}