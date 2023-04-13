/* リダイレクトやクエリ文字列のテストコード */
const hogeLink="http://localhost:8080/index.html?page=timetable&mode=edit"
if(location.href !== hogeLink)location.href="./index.html?page=timetable&mode=edit"
console.log(location.href)

/* サインインなどのテストコード */
import {AppUser} from "./utils/api"
const hogeUser:AppUser = new AppUser()
hogeUser.setUserInfo("CA01971172@st.kawahara.ac.jp","hogefuga0123")
//hogeUser.signUp()
hogeUser.signIn()
//hogeUser.signOut()

/* データベース操作のテストコード */
import {DbController} from "./utils/api"
async function test(){
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
window.onload = function() {
    test()
}