import DbController from "./DbController"
import { Shift, Shifts } from "./../types"
import AppUser from "./../AppUser"

export default class ShiftDbController extends DbController {
    private static readonly resource: string = "shift/shifts";

    constructor() {
        super()
    }

    public static async createShift(data: Shift, needReturn: boolean = true): Promise<string>{
        try{
            if(AppUser.uid){
                const url = ShiftDbController.buildUrl(AppUser.uid, ShiftDbController.resource);
                return await ShiftDbController.createData(url, data, needReturn);
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("バイトのデータを作成できませんでした")
        }
    }

    public static async readShift(id?: string): Promise<Shift|Shifts>{
        let result: Shift|Shifts = {}
        try{
            if(AppUser.uid){
                const url: string = ShiftDbController.buildUrl(AppUser.uid, ShiftDbController.resource, id)
                if(id){
                    result = await ShiftDbController.readData(url) as Shift
                }else{
                    result = await ShiftDbController.readData(url) as Shifts
                }
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("バイトのデータを読み込めませんでした")
        }finally{
            return result
        }
    }

    public static async readShiftByTag(tag: string, value: string): Promise<Shifts>{
        let result: Shifts = {}
        try{
            if(AppUser.uid){
                const url: string = ShiftDbController.buildUrl(AppUser.uid, ShiftDbController.resource)
                result = await ShiftDbController.readDataByTag(url, tag, value) as Shifts
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("バイトのデータを読み込めませんでした")
        }finally{
            return result
        }
    }

    public static async readShiftByRange(tag: string, startAt: string, endAt: string): Promise<Shifts>{
        let result: Shifts = {}
        try{
            if(AppUser.uid){
                const url: string = ShiftDbController.buildUrl(AppUser.uid, ShiftDbController.resource)
                result = await ShiftDbController.readDataByRange(url, tag, startAt, endAt) as Shifts
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("バイトのデータを読み込めませんでした")
        }finally{
            return result
        }
    }

    public static async updateShift(data: Shift, id: string): Promise<void>{
        try{
            if(AppUser.uid){
                const url = ShiftDbController.buildUrl(AppUser.uid, ShiftDbController.resource, id);
                await ShiftDbController.updateData(url, data);
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("バイトのデータを更新できませんでした")
        }
    }

    public static async deleteShift(id: string): Promise<void>{
        try{
            if(AppUser.uid){
                const url = ShiftDbController.buildUrl(AppUser.uid, ShiftDbController.resource, id);
                await ShiftDbController.deleteData(url);
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("バイトのデータを削除できませんでした")
        }
    }
}