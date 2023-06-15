import React, { useState } from 'react';
import { RegisterPageUrl } from "../../utils/constants"
import AppUser from "../../utils/AppUser"
import AuthHeader from "../Others/AuthHeader"
import LoginForm from "../Others/LoginForm"

// メールを送信し、パスワードをリセットする関数
function resetPassword(){
    //パスワードリセットのメールを送るために、アカウントのメールアドレスを求める
    const email: string | null = window.prompt("パスワードをリセットするためのメールを送ります。\nアカウントのメールアドレスを入力してください。", "");
    if(email === null) return;
    if(mailCheck(email)){// 入力内容が正しいメールアドレス場合
        AppUser.resetEmail(email) // パスワードリセットのメールを送る
        window.alert("パスワードリセットのメールを送りました。");
    }else{// 空の場合やキャンセルした場合は警告ダイアログを表示
        window.alert("正しいメールアドレスを入力してください。");
    }
}
// 正しいメールアドレスかどうかをチェックする関数
function mailCheck(email: string): boolean{
    const mail_regex1: RegExp = new RegExp('(?:[-!#-\'*+/-9=?A-Z^-~]+\.?(?:\.[-!#-\'*+/-9=?A-Z^-~]+)*|"(?:[!#-\[\]-~]|\\\\[\x09 -~])*")@[-!#-\'*+/-9=?A-Z^-~]+(?:\.[-!#-\'*+/-9=?A-Z^-~]+)*');
    const mail_regex2: RegExp = new RegExp('^[^\@]+\@[^\@]+$');
    if(email.match(mail_regex1) && email.match(mail_regex2)){
        // 全角チェック
        if(email.match(/[^a-zA-Z0-9\!\"\#\$\%\&\'\(\)\=\~\|\-\^\\\@\[\;\:\]\,\.\/\\\<\>\?\_\`\{\+\*\} ]/)) return false;
        // 末尾TLDチェック（〜.co,jpなどの末尾ミスチェック用）
        if(!email.match(/\.[a-z]+$/)) return false;
        return true;
    } else {
        return false;
    }
}

export default function LoginPage() {
    const [isActive0, setIsActive0] = useState<boolean>(false);
    const [isActive1, setIsActive1] = useState<boolean>(false);

    return (
        <div>
            <AuthHeader/>
            <div className="p-3">
                <div className="text-center m-2">ログイン</div>
                <LoginForm/>
                <a
                    className={`m-3 ${isActive0 ? "link-info" : "link-primary"}`}
                    onMouseDown={() => setIsActive0(true)}
                    onMouseUp={() => setIsActive0(false)}
                    onMouseLeave={() => setIsActive0(false)}
                    href={RegisterPageUrl}
                >
                    アカウントを作成
                </a>
                <a
                    className={`m-3 ${isActive1 ? "link-info" : "link-primary"}`}
                    onMouseDown={() => setIsActive1(true)}
                    onMouseUp={() => setIsActive1(false)}
                    onMouseLeave={() => setIsActive1(false)}
                    onClick={resetPassword}
                >
                    パスワードを忘れた場合
                </a>
            </div>
        </div>
    );
}