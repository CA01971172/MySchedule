import { DbController } from "./DbController"
import { EventSettings } from "./../types"

export class EventSettingsDbController extends DbController {
    private uid: string;
    private readonly resource: string = "event/eventSettings";

    constructor(uid: string) {
        super()
        this.uid = uid
    }

    public async getHidePassedEvent(): Promise<any>{
        const defaultData: boolean = false
        const fullResource: string = `${this.resource}/hidePassedEvent`
        const url: string = this.buildUrl(this.uid, fullResource)
        const fetchedData: any = await this.readData(url)
        const result: any = fetchedData?.hidePassedEvent
        if(result){
            return result
        }else{
            return defaultData
        }
    }

    public async setHidePassedEvent(hidePassedEvent: boolean): Promise<void>{
        const fullResource: string = `${this.resource}/hidePassedEvent`
        const url: string = this.buildUrl(this.uid, fullResource)
        // 引数hidePassedEventをsendData.hidePassedEventに代入したEventSettingsオブジェクトを作成する
        const sendData: EventSettings = {
            hidePassedEvent
        }
        await this.updateData(url, sendData)
    }
}