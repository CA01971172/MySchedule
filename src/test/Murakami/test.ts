import {AppUser} from "./../../utils/AppUser"
import {DbController} from "./../../utils/DbController"
export async function test(){
    /* リダイレクトやクエリ文字列のテストコード */
    const hogeLink="http://localhost:8080/index.html?page=timetable&mode=edit"
    if(location.href !== hogeLink)location.href="./index.html?page=timetable&mode=edit"
    console.log(location.href)

    /* サインインなどのテストコード */
    const hogeUser:AppUser = new AppUser()
    hogeUser.setUserInfo("CA01971172@st.kawahara.ac.jp","hogefuga0123")
    //hogeUser.signUp()
    //hogeUser.signIn()
    hogeUser.signOut()

    /* データベース操作のテストコード */
    var x = await hogeUser.getAuthState()
    console.log(x)
    const userId=x?.uid
    if(userId){
        const hogeController:DbController=new DbController(userId,"event")
        await hogeController.updateData({name:"hoge"})
        await hogeController.readData()
        console.log(hogeController.data)
    }
}