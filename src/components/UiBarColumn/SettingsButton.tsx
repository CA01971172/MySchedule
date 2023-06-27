import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import AppUser from '../../utils/AppUser';
import { LoginPageUrl, RegisterPageUrl } from '../../utils/constants';
import DbController from '../../utils/DbController/DbController';


async function logout(): Promise<void>{
    const logoutCheck: Boolean = window.confirm("ログアウトします。\nよろしいですか？")
    if(logoutCheck){
        AppUser.signOut(LoginPageUrl)
    }
}

async function deleteUser(): Promise<void>{
    const deleteCheck: Boolean = window.confirm("MyScheduleから退会します。\nユーザーのアカウントとデータは削除されます。\n本当によろしいですか？\n※この操作は取り消せません。")
    if(deleteCheck){
        const password: string = window.prompt("確認のため、パスワードを入力してください。") || "";
        const isCorrectPassword: boolean = await AppUser.checkPassword(password);
        if(isCorrectPassword){
            try{
                await AppUser.deleteUser();
            }catch(e){
                window.alert("ユーザーの削除に失敗しました。");
            }
        }else{
            window.alert("パスワードが間違っています。")
        }
    }
}

export default function SettingsButton() {
    return (
        <DropdownButton
        id="dropdown-SettingsButton"
        title={<i className="bi bi-gear-fill"/>}
        size="lg"
        variant="default"
        drop="down"
    >
        <Dropdown.Item as="button" onClick={logout}>ログアウト</Dropdown.Item>
        <Dropdown.Item as="button" onClick={deleteUser}>退会</Dropdown.Item>
    </DropdownButton>
    );
}