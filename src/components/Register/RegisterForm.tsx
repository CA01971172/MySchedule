import React, { useState } from 'react';
import AppUser from "../../utils/AppUser"
import { IndexPageUrl } from "../../utils/constants";

// サインアップ用の関数
function signUp(email: string, password: string, passwordCheck: string){
    if(password === passwordCheck){​
        if(password.length >= 6){​
            AppUser.setUserInfo(email, password)
            AppUser.signUp(IndexPageUrl)
        }​else{​
            window.alert("パスワードは6文字以上必要です。")
        }​
    }​else{​
        window.alert("パスワードが間違っています。")
    }
}

// アカウント登録用フォーム
export default function RegisterForm() {
    // フォームの状態を管理する
    const [emailValue, setEmailValue] = useState<string>(""); // メールアドレスの値を管理する
    const [passwordValue, setPasswordValue] = useState<string>(""); // パスワードの値を管理する
    const [hidePassword, setHidePassword] = useState<boolean>(true); // パスワードの表示状態を管理する
    const [passwordCheckValue, setPasswordCheckValue] = useState<string>(""); // パスワード確認用の値を管理する
    const [hidePasswordCheck, setHidePasswordCheck] = useState<boolean>(true); // パスワード確認用の表示状態を管理する

    return (
        <form/>
    );
}