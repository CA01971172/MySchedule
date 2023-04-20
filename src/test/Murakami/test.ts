import {AppUser} from "./../../utils/AppUser"
import {UserDbController} from "./../../utils/DbController/UserDbController"
import { SendGrid } from "../../utils/SendGrid"
import { send } from "process"
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
    const sendGrid: SendGrid = new SendGrid()
    await sendGrid.setAPIKey()
    sendGrid.sendEmail({
        to: "sorera620@gmail.com",
        bcc:"",
        subject:"hoge",
        text:"This is hoge."
    })
}