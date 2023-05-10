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
    const url = `https://myschedule-c0a49-default-rtdb.firebaseio.com/users/hogeUser012/event/eventSchedules.json?orderBy="id"&equalTo="abcd"`
    let data
    fetch(url).then(response=>response.json()).then(respondedData=>{
        data = respondedData
        console.log(data)
    })
}