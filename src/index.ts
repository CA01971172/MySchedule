import { FirebaseInitializer } from "./lib/firebase/firebase"
const firebaseInitializer = new FirebaseInitializer()
firebaseInitializer.initialize()

import {AppUser} from "./utils/api"
const hogeUser:AppUser = new AppUser()
hogeUser.setUserInfo("CA01971172@st.kawahara.ac.jp","hogefuga0123")
//hogeUser.signUp()
//hogeUser.signIn()
//hogeUser.signOut()

async function test() {
    console.log("test")
    var x = await hogeUser.getAuthState()
    console.log(x)
}
window.onload = function() {
    test()
}