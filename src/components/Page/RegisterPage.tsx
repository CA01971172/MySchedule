import React, { useState } from 'react';
import { LoginPageUrl } from "../../utils/constants"
import AuthHeader from "../Others/AuthHeader"
import RegisterForm from "../Others/RegisterForm"

    export default function RegisterPage() {
        const [isActive0, setIsActive0] = useState<boolean>(false);
        return (
            <div>
                <AuthHeader/>
                <div className="p-3">
                    <div className="text-center m-2">アカウント登録</div>
                    <RegisterForm/>
                    
                    既にアカウントを持っている場合は
                    <a
                        className={isActive0 ? "link-info" : "link-primary"}
                        onMouseDown={() => setIsActive0(true)}
                        onMouseUp={() => setIsActive0(false)}
                        onMouseLeave={() => setIsActive0(false)}
                        href={LoginPageUrl}
                    >
                    こちら
                    </a>
                </div>
            </div>
        );
}