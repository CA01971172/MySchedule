import DbController from "./DbController"
import { TaskSettings } from "../types";
import AppUser from "./../AppUser"

export default class TaskSettingsDbController extends DbController {
    private static readonly resource: string = "task/taskSettings";

    constructor() {
        super()
    }

    public static async getEnabledAlert(): Promise<boolean>{
        let result: boolean = true;
        try{
            if(AppUser.uid){
                const fullResource: string = `${TaskSettingsDbController.resource}/enabledAlert`
                const url: string = TaskSettingsDbController.buildUrl(AppUser.uid, fullResource)
                const fetchedData: TaskSettings = await TaskSettingsDbController.readData(url) as TaskSettings
                if(fetchedData.enabledAlert !== undefined){
                    result = fetchedData.enabledAlert
                }
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("「提出期限が迫ったらアラートメールで通知する」かどうかを取得できませんでした")
        }finally{
            return result
        }
    }

    public static async setEnabledAlert(enabledAlert: boolean): Promise<void>{
        try{
            if(AppUser.uid){
                const fullResource: string = `${TaskSettingsDbController.resource}/enabledAlert`
                const url: string = TaskSettingsDbController.buildUrl(AppUser.uid, fullResource)
                const sendData: TaskSettings = {
                    enabledAlert
                }
                await TaskSettingsDbController.updateData(url, sendData)
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("「提出期限が迫ったらアラートメールで通知する」かどうかを設定できませんでした")
        }
    }
    
    public static async getDaysBeforeDeadline(): Promise<number>{
        let result: number = 3;
        try{
            if(AppUser.uid){
                const fullResource: string = `${TaskSettingsDbController.resource}/daysBeforeDeadline`
                const url: string = TaskSettingsDbController.buildUrl(AppUser.uid, fullResource)
                const fetchedData: TaskSettings = await TaskSettingsDbController.readData(url) as TaskSettings
                if(fetchedData.daysBeforeDeadline !== undefined){
                    result = fetchedData.daysBeforeDeadline
                }
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("「何日前に通知する」かを取得できませんでした")
        }finally{
            return result
        }
    }

    public static async setDaysBeforeDeadline(daysBeforeDeadline: number): Promise<void>{
        try{
            if(AppUser.uid){
                const fullResource: string = `${TaskSettingsDbController.resource}/daysBeforeDeadline`
                const url: string = TaskSettingsDbController.buildUrl(AppUser.uid, fullResource)
                const sendData: TaskSettings = {
                    daysBeforeDeadline
                }
                await TaskSettingsDbController.updateData(url, sendData)
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("「何日前に通知する」かを設定できませんでした")
        }
    }

    public static async getAutoTaskDelete(): Promise<boolean>{
        let result: boolean = false;
        try{
            if(AppUser.uid){
                const fullResource: string = `${TaskSettingsDbController.resource}/autTaskDelete`
                const url: string = TaskSettingsDbController.buildUrl(AppUser.uid, fullResource)
                const fetchedData: TaskSettings = await TaskSettingsDbController.readData(url)
                if(fetchedData.autoTaskDelete !== undefined){
                    result = fetchedData.autoTaskDelete
                }
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("「提出期限が過ぎた課題を自動で削除する」かどうかを取得できませんでした")
        }finally{
            return result
        }
    }

    public static async setAutoTaskDelete(autoTaskDelete: boolean): Promise<void>{
        try{
            if(AppUser.uid){
                const fullResource: string = `${TaskSettingsDbController.resource}/autTaskDelete`
                const url: string = TaskSettingsDbController.buildUrl(AppUser.uid, fullResource)
                const sendData: TaskSettings = {
                    autoTaskDelete
                }
                await TaskSettingsDbController.updateData(url, sendData)
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("「提出期限が過ぎた課題を自動で削除する」かどうかを設定できませんでした")
        }
    }
}