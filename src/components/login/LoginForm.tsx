import React, { useState } from 'react';

export default function LoginForm() {
    const [hidePassword, setHidePassword] = useState<boolean>(true);

    return (
        <form className="m-2 p-3 border rounded">
            <div className="m-2">
                <label
                className="form-label"
                htmlFor="email"
                placeholder="メールアドレスを入力"
                >
                    メールアドレス
                </label>
                <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                required={false}
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
            >
                ログイン
            </button>
        </form>
    );
}