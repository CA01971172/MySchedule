import React, { useState } from 'react';
import AppUser from "../../utils/AppUser"
import { IndexPageUrl } from "../../utils/constants";

// アカウント登録用フォーム
export default function RegisterForm() {
    // フォームの状態を管理する
    const [emailValue, setEmailValue] = useState<string>(""); // メールアドレスの値を管理する
    const [passwordValue, setPasswordValue] = useState<string>(""); // パスワードの値を管理する
    const [hidePassword, setHidePassword] = useState<boolean>(true); // パスワードの表示状態を管理する
    const [passwordCheckValue, setPasswordCheckValue] = useState<string>(""); // パスワード確認用の値を管理する
    const [hidePasswordCheck, setHidePasswordCheck] = useState<boolean>(true); // パスワード確認用の表示状態を管理する
    
    // サインアップ用の関数
    function signUp(email: string, password: string, passwordCheck: string) {
        if (password === passwordCheck) {
          if (password.length >= 6) {
            AppUser.setUserInfo(email, password);
            AppUser.signUp(IndexPageUrl);
          } else {
            window.alert("パスワードは6文字以上必要です。");
          }
        } else {
          window.alert("パスワードが間違っています。");
        }
      }

    return(
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
        value={emailValue}
        onChange={(event) => setEmailValue(event.target.value)}
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
        value={passwordValue}
        onChange={(event) => setPasswordValue(event.target.value)}
        />
      <span
        className={`search-clear ${(hidePassword ? "bi bi-eye-fill" : "bi bi-eye-slash-fill")}`}
        style={{color: "#6C757D"}}
        onClick={() => {setHidePassword((prev) => !prev)}}
          />
      </div>
      </div>
                
      <div className="m-2">
      <label className="form-label" htmlFor="passwordCheck">
      パスワード (確認)
      </label>
      <div className="input-group">
      <input
        className="form-control"
        type={hidePasswordCheck ? 'password' : 'input'}
        placeholder="パスワードを再入力"
        name="passwordCheck"
        id="passwordCheck"
        required={false}
        style={{ borderRadius: '0.25rem' }}
        value={passwordCheckValue}
        onChange={(event) => setPasswordCheckValue(event.target.value)}
       />
                <span
                  className={`search-clear ${
                  hidePasswordCheck ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'
                }`}
                style={{ color: '#6C757D' }}
                onClick={() => {
                setHidePasswordCheck((prev) => !prev);
                }}
                />
            </div>
          </div>
                <button
                className="m-2 btn btn-outline-primary"
                type="submit"
                onClick={(event) => {
                    event.preventDefault();
                    signUp(emailValue, passwordValue, passwordCheckValue);
                }}
                >
                    アカウント登録する
                </button>
            </form>
        );
    };