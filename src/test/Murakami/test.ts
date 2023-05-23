import {AppUser} from "./../../utils/AppUser"
import { SendGrid } from "../../utils/SendGrid"
import { Event,EmailData } from "./../../utils/types"
import axios from 'axios';
import { Button } from './../../components/Ui/Button';
import { rootDiv } from './../../utils/constants';
import { DbController } from "../../utils/DbController/DbController"

export function test(){
    const testButton:Button = new Button("テスト", testProcess)
    const testButtonElm = testButton.render()
    rootDiv.appendChild(testButtonElm)

    const createButton:Button = new Button("Create", create)
    const createButtonElm = createButton.render()
    rootDiv.appendChild(createButtonElm)
}

async function testProcess(){
    const url = `https://myschedule-c0a49-default-rtdb.firebaseio.com/users/hogeUser012/event/eventSchedules.json?orderBy="id"&equalTo="abcd"`
    let data
    fetch(url).then(response=>response.json()).then(respondedData=>{
        data = respondedData
        console.log(data)
    })
    const url2 = "https://myschedule-c0a49-default-rtdb.firebaseio.com/users/hogeUser012/event/eventSchedules/0/description.json"
    let data2
    fetch(url2).then(response=>response.json()).then(respondedData=>{
        data2 = respondedData
        console.log(typeof data2,data2)
    })
}

async function create() {
    const appUser: AppUser = new AppUser()
    await appUser.assignUserInfo()
    const uid: string = appUser.uid
    const dbController: DbController = new DbController()
    const url: string =  dbController.buildUrl(uid, "event/events")
    const data: Event = {
        "description": "これは説明",
        "endTime": 1,
        "id": "abcd",
        "isAllDay": false,
        "startTime": 0,
        "title": "hoge"
    }
    await dbController.createData(url, data)
    console.log({
        uid,
        url,
        data
    })
}