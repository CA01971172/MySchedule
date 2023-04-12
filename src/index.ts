console.log("Hello World!");
document.getElementById("root").innerHTML="<div>hoge</div>"

import {DbController} from "./utils/api"
async function test(){
    const hogeController:DbController=new DbController("hogeUser012","timetable")
    await hogeController.updateData({name:"hoge"})
    await hogeController.readData()
    console.log(hogeController.data)
}
test()