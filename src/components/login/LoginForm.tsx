import React, { useState } from 'react';
import AppUser from "./../../utils/AppUser"
import { IndexPageUrl } from "../../utils/constants";

// ログイン用フォーム
export default function LoginForm() {
    // フォームの状態を管理する
    const [emailValue, setEmailValue] = useState<string>(""); // メールアドレスの値を管理する
    const [passwordValue, setPasswordValue] = useState<string>(""); // パスワードの値を管理する
    const [hidePassword, setHidePassword] = useState<boolean>(true); // パスワードの表示錠チアを管理する

    return (
        <form className="m-2 p-3 border rounded">
            <div className="m-2">
                <label
                className="form-label"
                htmlFor="email"
                >
                    メールアドレス
                </label>
                <input
                className="form-control"
                type="email"
                placeholder="メールアドレスを入力"
                name="email"
                id="email"
                required={false}
                value={passwordValue}
                onChange={(event) => setPasswordValue(event.target.value)}
                />
            </div>
            <div className="m-2">
                <label className="form-label" htmlFor="password">パスワード</label>
                <div className="input-group">
                    <input
                    className="form-control"
                    type={hidePassword ? "password" : "input"}
                    placeholder="パスワードを入力(6文字以上)"
                    name="password" id="password" required={false}
                    style={{ borderRadius: "0.25rem" }}
                    value={emailValue}
                    onChange={(event) => setEmailValue(event.target.value)}
                    />
                    <span
                    className={`search-clear ${(hidePassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill")}`}
                    style={{color: "#6C757D"}}
                    onClick={() => {setHidePassword((prev) => !prev)}}
                    />
                </div>
            </div>
            <button
            className="m-2 btn btn-outline-primary"
            type="submit"
            onClick={(event) => {
                event.preventDefault();
                AppUser.setUserInfo(emailValue, passwordValue);
                AppUser.signIn(IndexPageUrl);
            }}
            >
                ログイン
            </button>
        </form>
    );
}