import React, { useState, useEffect } from 'react';
import AppUser from "../../utils/AppUser"
import LoginHeader from "./LoginHeader"
import LoginForm from "./LoginForm"

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
    return (
        <div>
            <LoginHeader/>
            <div className="p-3">
                <div className="text-center m-2">ログイン</div>
                <LoginForm/>
                <a className="p-3 link-primary" onClick={resetPassword}>パスワードを忘れた場合</a>
            </div>
        </div>
    );
}