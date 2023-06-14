import DbController from "./DbController"
import { EventSettings } from "./../types"
import AppUser from "./../AppUser"

export default class EventSettingsDbController extends DbController {
    private static readonly resource: string = "event/eventSettings";

    constructor() {
        super()
    }

    public static async getHidePassedEvent(): Promise<boolean>{
        let result: boolean = false;
        try{
            if(AppUser.uid){
                const fullResource: string = `${EventSettingsDbController.resource}/hidePassedEvent`
                const url: string = EventSettingsDbController.buildUrl(AppUser.uid, fullResource)
                const fetchedData: EventSettings = await EventSettingsDbController.readData(url) as EventSettings
                if(fetchedData.hidePassedEvent !== undefined){
                    result = fetchedData.hidePassedEvent
                }
            }
        }catch(e){
            throw new Error("「過去の予定を非表示にする」かどうかを取得できませんでした")
        }finally{
            return result
        }
    }

    public static async setHidePassedEvent(hidePassedEvent: boolean): Promise<void>{
        try{
            if(AppUser.uid){
                const fullResource: string = `${EventSettingsDbController.resource}/hidePassedEvent`
                const url: string = EventSettingsDbController.buildUrl(AppUser.uid, fullResource)
                // 引数hidePassedEventをsendData.hidePassedEventに代入したEventSettingsオブジェクトを作成する
                const sendData: EventSettings = {
                    hidePassedEvent
                }
                await EventSettingsDbController.updateData(url, sendData)
            }
        }catch(e){
            throw new Error("「過去の予定を非表示にする」かどうかを設定できませんでした")
        }
    }
}