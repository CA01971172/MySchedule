import DbController from "./DbController"
import { Task, TaskSettings } from "../types";
import AppUser from "./../AppUser"

export default class TaskSettingsDbController extends DbController {
    private static readonly resource: string = "task/taskSettings";

    private static readonly defaultSettings: TaskSettings = {
        enabledAlert: false,
        daysBeforeDeadline: 3,
        autoTaskDelete: false
    };

    constructor() {
        super()
    }

    public static async getTaskSettings(): Promise<TaskSettings>{
        const result: TaskSettings = TaskSettingsDbController.defaultSettings;
        try{
            if(AppUser.uid){
                const fullResource: string = `${TaskSettingsDbController.resource}`
                const url: string = TaskSettingsDbController.buildUrl(AppUser.uid, fullResource)
                const fetchedData: TaskSettings = await TaskSettingsDbController.readData(url) as TaskSettings
                if(fetchedData !== undefined){
                    if(fetchedData.enabledAlert !== undefined){
                        result.enabledAlert = fetchedData.enabledAlert;
                    }
                    if(fetchedData.daysBeforeDeadline !== undefined){
                        result.daysBeforeDeadline = fetchedData.daysBeforeDeadline;
                    }
                    if(fetchedData.autoTaskDelete !== undefined){
                        result.autoTaskDelete = fetchedData.autoTaskDelete;
                    }
                }
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("課題の設定データを取得できませんでした")
        }finally{
            return result
        }
    }

    public static async setTaskSettings(taskSettings: TaskSettings): Promise<void>{
        try{
            if(AppUser.uid){
                const fullResource: string = `${TaskSettingsDbController.resource}`
                const url: string = TaskSettingsDbController.buildUrl(AppUser.uid, fullResource)
                const sendData: TaskSettings = taskSettings;
                await TaskSettingsDbController.updateData(url, sendData)
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("課題の設定データを設定できませんでした")
        }
    }

    public static async getEnabledAlert(): Promise<boolean>{
        let result: boolean = TaskSettingsDbController.defaultSettings.enabledAlert;
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
                const sendData: { enabledAlert: boolean } = {
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
        let result: number = TaskSettingsDbController.defaultSettings.daysBeforeDeadline;
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
                const sendData: { daysBeforeDeadline: number } = {
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
        let result: boolean = TaskSettingsDbController.defaultSettings.autoTaskDelete;
        try{
            if(AppUser.uid){
                const fullResource: string = `${TaskSettingsDbController.resource}/autTaskDelete`
                const url: string = TaskSettingsDbController.buildUrl(AppUser.uid, fullResource)
                const fetchedData: TaskSettings = await TaskSettingsDbController.readData(url) as TaskSettings
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
                const sendData: { autoTaskDelete: boolean } = {
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