import { DbController } from "./DbController"
import { Timetable, Timetables } from "./../types"

export class TimetableDbController extends DbController {
    private uid: string;
    private readonly resource: string = "timetable/timetables";

    constructor(uid: string) {
        super()
        this.uid = uid
    }

    public async createTimetable(data: Timetable): Promise<void>{
        const url: string = this.buildUrl(this.uid, this.resource)
        await this.createData(url, data)
    }

    public async readTimetable(id?: string): Promise<Timetable|Timetables>{
        const url: string = this.buildUrl(this.uid, this.resource, id)
        let result: Timetable|Timetables
        if(id){
            result = await this.readData(url) as Timetable
        }else{
            result = await this.readData(url) as Timetables
        }
        return result
    }

    public async readTimetableByTag(tag: string, value: string): Promise<Timetables>{
        const url: string = this.buildUrl(this.uid, this.resource)
        const result: Timetables = await this.readDataByTag(url, tag, value) as Timetables
        return result
    }

    public async readTimetableByRange(tag: string, startAt: string, endAt: string): Promise<Timetables>{
        const url: string = this.buildUrl(this.uid, this.resource)
        const result: Timetables = await this.readDataByRange(url, tag, startAt, endAt) as Timetables
        return result
    }

    public async updateTimetable(data: Timetable, id: string): Promise<void>{
        const url: string = this.buildUrl(this.uid, this.resource, id)
        await this.updateData(url, data)
    }

    public async deleteTimetable(id: string): Promise<void>{
        const url: string = this.buildUrl(this.uid, this.resource, id)
        await this.deleteData(url)
    }
}