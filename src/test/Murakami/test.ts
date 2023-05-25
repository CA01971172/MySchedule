import {AppUser} from "./../../utils/AppUser"
import { SendGrid } from "../../utils/SendGrid"
import { Timetable, Timetables, Task, Tasks, Shift, Shifts, Event, Events, EmailData } from "./../../utils/types"
import axios from 'axios';
import { Button } from './../../components/Ui/Button';
import { rootDiv } from './../../utils/constants';
import { TimetableDbController } from "../../utils/DbController/TimetableDbController"
import { EventSettingsDbController } from "../../utils/DbController/EventSettingsDbController"

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

    const updateButton:Button = new Button("Update", updateData)
    const updateButtonElm = updateButton.render()
    rootDiv.appendChild(updateButtonElm)

    const deleteButton:Button = new Button("Delete", deleteData)
    const deleteButtonElm = deleteButton.render()
    rootDiv.appendChild(deleteButtonElm)

    const getButton:Button = new Button("settingGet", getData)
    const getButtonElm = getButton.render()
    rootDiv.appendChild(getButtonElm)

    const setButton:Button = new Button("settingSet", setData)
    const setButtonElm = setButton.render()
    rootDiv.appendChild(setButtonElm)
}

async function testProcess(){

}

async function createData() {
    const appUser: AppUser = new AppUser()
    await appUser.assignUserInfo()
    const uid: string = appUser.uid
    const dbController: TimetableDbController = new TimetableDbController(uid)
    const data: Timetable = {
        title: "継続開発",
        teacher: "大政",
        classroom: "501教室",
        startTime: 0,
        endTime: 10,
        dayOfWeek: 2
    }
    await dbController.createTimetable(data)
}

async function readData() {
    const appUser: AppUser = new AppUser()
    await appUser.assignUserInfo()
    const uid: string = appUser.uid
    const dbController: TimetableDbController = new TimetableDbController(uid)
    const result: Timetable|Timetables = await dbController.readTimetable()
    console.log(result)
}

async function readDataByTag() {
    const appUser: AppUser = new AppUser()
    await appUser.assignUserInfo()
    const uid: string = appUser.uid
    const dbController: TimetableDbController = new TimetableDbController(uid)
    const tag: string = window.prompt("tagを入力してください")
    const value: string = window.prompt("valueを入力してください")
    const result: Timetable|Timetables = await dbController.readTimetableByTag(tag, value)
    console.log(result)
}

async function readDataByRange() {
    const appUser: AppUser = new AppUser()
    await appUser.assignUserInfo()
    const uid: string = appUser.uid
    const dbController: TimetableDbController = new TimetableDbController(uid)
    const tag: string = window.prompt("tagを入力してください")
    const startAt: string = window.prompt("startAtを入力してください")
    const endAt: string = window.prompt("endAtを入力してください")
    const result: Timetable|Timetables = await dbController.readTimetableByRange(tag, startAt, endAt)
    console.log(result)
}

async function updateData() {
    const appUser: AppUser = new AppUser()
    await appUser.assignUserInfo()
    const uid: string = appUser.uid
    const dbController: TimetableDbController = new TimetableDbController(uid)
    const id: string = window.prompt("idを入力してください")
    if(id === "") return
    const data: Timetable = {
        title: "継続開発",
        teacher: "大政",
        classroom: `50${Math.floor(Math.random()*10)}教室`,
        startTime: 0,
        endTime: 10,
        dayOfWeek: Math.floor(Math.random()*7)
    }
    await dbController.updateTimetable(data, id)
}

async function deleteData() {
    const appUser: AppUser = new AppUser()
    await appUser.assignUserInfo()
    const uid: string = appUser.uid
    const dbController: TimetableDbController = new TimetableDbController(uid)
    const id: string = window.prompt("idを入力してください")
    if(id === "") return
    await dbController.deleteTimetable(id)
}

async function getData() {
    const appUser: AppUser = new AppUser()
    await appUser.assignUserInfo()
    const uid: string = appUser.uid
    const dbController: EventSettingsDbController = new EventSettingsDbController(uid)
    const result: boolean = await dbController.getHidePassedEvent()
    console.log(result)
}

async function setData() {
    const appUser: AppUser = new AppUser()
    await appUser.assignUserInfo()
    const uid: string = appUser.uid
    const dbController: EventSettingsDbController = new EventSettingsDbController(uid)
    const hidePassedEvent = confirm("Which is hidePassedEvent, true or false?");
    await dbController.setHidePassedEvent(hidePassedEvent)
}