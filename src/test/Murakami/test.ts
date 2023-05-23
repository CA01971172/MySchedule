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

    const createButton:Button = new Button("Create", createData)
    const createButtonElm = createButton.render()
    rootDiv.appendChild(createButtonElm)

    const readButton:Button = new Button("Read", readData)
    const readButtonElm = readButton.render()
    rootDiv.appendChild(readButtonElm)

    const read2Button:Button = new Button("Read2", readDataByTag)
    const read2ButtonElm = read2Button.render()
    rootDiv.appendChild(read2ButtonElm)

    const read3Button:Button = new Button("Read3", readDataByRange)
    const read3ButtonElm = read3Button.render()
    rootDiv.appendChild(read3ButtonElm)

    const overrideButton:Button = new Button("Override", overrideData)
    const overrideButtonElm = overrideButton.render()
    rootDiv.appendChild(overrideButtonElm)

    const updateButton:Button = new Button("Update", updateData)
    const updateButtonElm = updateButton.render()
    rootDiv.appendChild(updateButtonElm)

    const deleteButton:Button = new Button("Delete", deleteData)
    const deleteButtonElm = deleteButton.render()
    rootDiv.appendChild(deleteButtonElm)
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

async function createData() {
    const appUser: AppUser = new AppUser()
    await appUser.assignUserInfo()
    const uid: string = appUser.uid
    const dbController: DbController = new DbController()
    const url: string =  dbController.buildUrl(uid, "event/events")
    const data: Event = {
        "description": "これは説明",
        "endTime": 1,
        "isAllDay": false,
        "startTime": 0,
        "title": "hoge"+Math.floor(Math.random()*5)
    }
    await dbController.createData(url, data)
}

async function readData() {
    const appUser: AppUser = new AppUser()
    await appUser.assignUserInfo()
    const uid: string = appUser.uid
    const dbController: DbController = new DbController()
    const url: string =  dbController.buildUrl(uid, "event/events")
    const result: object = await dbController.readData(url)
    console.log(result)
}

async function readDataByTag() {
    const appUser: AppUser = new AppUser()
    await appUser.assignUserInfo()
    const uid: string = appUser.uid
    const dbController: DbController = new DbController()
    const url: string =  dbController.buildUrl(uid, "event/events")
    const tag: string = window.prompt("tagを入力してください")
    const value: string = window.prompt("valueを入力してください")
    const result: object = await dbController.readDataByTag(url, tag, value)
    console.log(result)
}

async function readDataByRange() {
    const appUser: AppUser = new AppUser()
    await appUser.assignUserInfo()
    const uid: string = appUser.uid
    const dbController: DbController = new DbController()
    const url: string =  dbController.buildUrl(uid, "event/events")
    const tag: string = window.prompt("tagを入力してください")
    const startAt: string = window.prompt("startAtを入力してください")
    const endAt: string = window.prompt("endAtを入力してください")
    const result: object = await dbController.readDataByRange(url, tag, startAt, endAt)
    console.log(result)
}

async function overrideData() {
    const appUser: AppUser = new AppUser()
    await appUser.assignUserInfo()
    const uid: string = appUser.uid
    const dbController: DbController = new DbController()
    const id: string = window.prompt("idを入力してください")
    if(id === "") return
    const url: string =  dbController.buildUrl(uid, "event/events", id)
    const data: object = {
        "description": "これは説明"+Math.floor(Math.random()*100),
        "endTime": 1,
        "isAllDay": false,
        "startTime": 0,
    }
    await dbController.overrideData(url, data)
}

async function updateData() {
    const appUser: AppUser = new AppUser()
    await appUser.assignUserInfo()
    const uid: string = appUser.uid
    const dbController: DbController = new DbController()
    const id: string = window.prompt("idを入力してください")
    if(id === "") return
    const url: string =  dbController.buildUrl(uid, "event/events", id)
    const data: object = {
        "title": "hoge"+Math.floor(Math.random()*5)
    }
    await dbController.updateData(url, data)
}

async function deleteData() {
    const appUser: AppUser = new AppUser()
    await appUser.assignUserInfo()
    const uid: string = appUser.uid
    const dbController: DbController = new DbController()
    const id: string = window.prompt("idを入力してください")
    if(id === "") return
    const url: string =  dbController.buildUrl(uid, "event/events", id)
    await dbController.deleteData(url)
}