import {AppUser} from "./../../utils/AppUser"
import {UserDbController} from "./../../utils/DbController/UserDbController"
import { ApiDbController } from "../../utils/DbController/ApiDbController"
import { SendGrid } from "../../utils/SendGrid"
import { EmailData } from "./../../utils/types"
import axios from 'axios';
import { Button } from './../../components/Ui/Button';
import { rootDiv } from './../../utils/constants';

export function test(){
    const testButton:Button = new Button("テスト", testProcess)
    const testButtonElm = testButton.render()
    rootDiv.appendChild(testButtonElm)
}

async function testProcess(){
    /* メール送信のテストコード */
/*     const appUser: AppUser = new AppUser
    await appUser.assignUserInfo()
    appUser.sendEmail("テストメール","こんにちは。こちらMyScheduleです。") */
}