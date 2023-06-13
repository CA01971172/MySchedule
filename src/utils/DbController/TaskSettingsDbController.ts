import { DbController } from "./DbController"

export class TaskSettingsDbController extends DbController {
    private uid: string;
    private readonly resource: string = "task/taskSettings";

    constructor(uid: string) {
        super()
        this.uid = uid
    }

    public async getEnabledAlert(): Promise<any>{
        const defaultData: boolean = true
        const fullResource: string = `${this.resource}/enabledAlert`
        const url: string = this.buildUrl(this.uid, fullResource)
        const fetchedData: any = await this.readData(url)
        const result: any = fetchedData?.enabledAlert
        if(result){
            return result
        }else{
            return defaultData
        }
    }

    public async setEnabledAlert(enabledAlert: boolean): Promise<void>{
        const fullResource: string = `${this.resource}/enabledAlert`
        const url: string = this.buildUrl(this.uid, fullResource)

        const sendData: object = {
            enabledAlert
        }
        await this.updateData(url, sendData)
    }
    
    public async getDaysBeforeDeadline(): Promise<number>{
        const defaultData: number = 3
        const fullResource: string = `${this.resource}/daysBeforeDeadline`
        const url: string = this.buildUrl(this.uid, fullResource)
        const fetchedData: any = await this.readData(url)
        const result: any = fetchedData?.daysBeforeDeadline
        if(result){
            return result
        }else{
            return defaultData
        }
    }

    public async setDaysBeforeDeadline(daysBeforeDeadline: number): Promise<void>{
        const fullResource: string = `${this.resource}/daysBeforeDeadline`
        const url: string = this.buildUrl(this.uid, fullResource)
 
        const sendData: object = {
            daysBeforeDeadline
        }
        await this.updateData(url, sendData)
    }

    public async getAutoTaskDelete(): Promise<boolean>{
        const defaultData: boolean = false
        const fullResource: string = `${this.resource}/autTaskDelete`
        const url: string = this.buildUrl(this.uid, fullResource)
        const fetchedData: any = await this.readData(url)
        const result: any = fetchedData?.autTaskDelete
        if(result){
            return result
        }else{
            return defaultData
        }
    }

    public async setAutoTaskDelete(autoTaskDelete: boolean): Promise<void>{
        const fullResource: string = `${this.resource}/autTaskDelete`
        const url: string = this.buildUrl(this.uid, fullResource)
 
        const sendData: object = {
            autoTaskDelete
        }
        await this.updateData(url, sendData)
    }
}