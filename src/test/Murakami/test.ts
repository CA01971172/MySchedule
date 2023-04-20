import {AppUser} from "./../../utils/AppUser"
import {UserDbController} from "./../../utils/DbController/UserDbController"
import { ApiDbController } from "../../utils/DbController/ApiDbController"
import { SendGrid } from "../../utils/SendGrid"
import { SendGridSettings,EmailData } from "./../../utils/types"
import axios from 'axios';
export async function test(){
    /* リダイレクトやクエリ文字列のテストコード */
/*     const hogeLink="http://localhost:8080/index.html?page=timetable&mode=edit"
    if(location.href !== hogeLink)location.href="./index.html?page=timetable&mode=edit"
    console.log(location.href) */

    /* サインインなどのテストコード */
    //const hogeUser:AppUser = new AppUser()
    //hogeUser.setUserInfo("CA01971172@st.kawahara.ac.jp","hogefuga0123")
    //hogeUser.signUp()
    //hogeUser.signIn()
    //hogeUser.signOut()

    /* データベース操作のテストコード */
/*     var x = await hogeUser.getAuthState()
    console.log(x)
    const userId=x?.uid
    if(userId){
        const hogeController:UserDbController=new UserDbController(userId,"event")
        await hogeController.updateData({name:"hoge"})
        await hogeController.readData()
        console.log(hogeController.data)
    } */

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
        const url = 'https://cors-anywhere.herokuapp.com/https://api.sendgrid.com/v3/mail/send';
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