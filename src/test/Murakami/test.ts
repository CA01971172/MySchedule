import {AppUser} from "./../../utils/AppUser"
import {UserDbController} from "./../../utils/DbController/UserDbController"
import { ApiDbController } from "../../utils/DbController/ApiDbController"
import { SendGrid } from "../../utils/SendGrid"
import { SendGridSettings,EmailData } from "./../../utils/types"
import axios from 'axios';
import { Button } from './../../components/Ui/Button';
import { rootDiv } from './../../utils/constants';
export function test(){
    const testButton:Button = new Button("テスト", testProcess2)
    const testButtonElm = testButton.render()
    rootDiv.appendChild(testButtonElm)
}

async function testProcess(){
        /* メール送信のテストコード */
/*     const sendGrid: SendGrid = new SendGrid()
    await sendGrid.setAPIKey()
    sendGrid.sendEmail({
        to: "sorera620@gmail.com",
        bcc:"",
        subject:"hoge",
        text:"This is hoge."
    }) */

    const dbController: ApiDbController = new ApiDbController("SendGrid")
    const sendGridSettings: SendGridSettings = await dbController.readData() as SendGridSettings
    const APIKey = sendGridSettings.APIKey
    const fromEmail = sendGridSettings.fromEmail
    const sendEmail = async (data:any) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${APIKey}`,
            'Access-Control-Allow-Origin': '*'
        };
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const sendGridUrl = 'https://api.sendgrid.com/v3/mail/send';
        const url = proxyUrl + sendGridUrl;
        const response = await axios.post(url, data, { headers });
        console.log(response.data);
    }

    const data = {
        personalizations: [
            {
                to: [{ email: 'hoge@gmail.com' }]
            }
        ],
        from: {
            email: fromEmail,
            name: 'Example'
        },
        subject: 'Hello, world!',
        content: [
            {
                type: 'text/plain',
                value: 'Hello, world!'
            }
        ]
    };

    await sendEmail(data);
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