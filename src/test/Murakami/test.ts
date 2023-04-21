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
    const sendGrid: SendGrid = new SendGrid()
    sendGrid.sendEmail({
        to: "sorera620@gmail.com",
        subject:"テストメール",
        text:"こんにちは。こちらMyScheduleです。"
    })
}

async function testProcess2() {
    const sendEmail = async () => {
        const data = {
            to: 'sorera620@gmail.com',
            subject: 'Test Email',
            text: 'This is a test email sent from the client'
        };
        const response = await fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.text();
        console.log(result);
        };
        sendEmail()
}