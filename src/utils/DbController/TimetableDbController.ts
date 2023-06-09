import DbController from "./DbController"
import { Timetable, Timetables } from "./../types"
import AppUser from "./../AppUser"

export default class TimetableDbController extends DbController {
    private static readonly resource: string = "timetable/timetables";

    constructor() {
        super()
    }

    public static async createTimetable(data: Timetable, needReturn: boolean = false): Promise<string>{
        try{
            if(AppUser.uid){
                const url = TimetableDbController.buildUrl(AppUser.uid, TimetableDbController.resource);
                return await TimetableDbController.createData(url, data, needReturn);
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("時間割のデータを作成できませんでした")
        }
    }

    public static async readTimetable(id?: string): Promise<Timetable|Timetables>{
        let result: Timetable|Timetables = {}
        try{
            if(AppUser.uid){
                const url: string = TimetableDbController.buildUrl(AppUser.uid, TimetableDbController.resource, id)
                if(id){
                    result = await TimetableDbController.readData(url) as Timetable
                }else{
                    result = await TimetableDbController.readData(url) as Timetables
                }
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("時間割のデータを読み込めませんでした")
        }finally{
            return result
        }
    }

    public static async readTimetableByTag(tag: string, value: string): Promise<Timetables>{
        let result: Timetables = {}
        try{
            if(AppUser.uid){
                const url: string = TimetableDbController.buildUrl(AppUser.uid, TimetableDbController.resource)
                result = await TimetableDbController.readDataByTag(url, tag, value) as Timetables
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("時間割のデータを読み込めませんでした")
        }finally{
            return result
        }
    }

    public static async readTimetableByRange(tag: string, startAt: number|string, endAt: number|string): Promise<Timetables>{
        let result: Timetables = {}
        try{
            if(AppUser.uid){
                const url: string = TimetableDbController.buildUrl(AppUser.uid, TimetableDbController.resource)
                result = await TimetableDbController.readDataByRange(url, tag, startAt, endAt) as Timetables
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("時間割のデータを読み込めませんでした")
        }finally{
            return result
        }
    }

    public static async updateTimetable(data: Timetable, id: string): Promise<void>{
        try{
            if(AppUser.uid){
                const url = TimetableDbController.buildUrl(AppUser.uid, TimetableDbController.resource, id);
                await TimetableDbController.updateData(url, data);
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("時間割のデータを更新できませんでした")
        }
    }

    public static async deleteTimetable(id: string): Promise<void>{
        try{
            if(AppUser.uid){
                const url = TimetableDbController.buildUrl(AppUser.uid, TimetableDbController.resource, id);
                await TimetableDbController.deleteData(url);
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("時間割のデータを削除できませんでした")
        }
    }
}