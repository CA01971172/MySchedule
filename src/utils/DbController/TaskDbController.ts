import DbController from "./DbController"
import { Task, Tasks } from "../types"
import AppUser from "./../AppUser"

export default class TaskDbController extends DbController {
    private static readonly resource: string = "task/tasks";

    constructor() {
        super()
    }

    public static async createTask(data: Task, needReturn: boolean = false): Promise<string>{
        try{
            if(AppUser.uid){
                const url = TaskDbController.buildUrl(AppUser.uid, TaskDbController.resource);
                return await TaskDbController.createData(url, data, needReturn);
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("課題のデータを作成できませんでした")
        }
    }

    public static async readTask(id?: string): Promise<Task|Tasks>{
        let result: Task|Tasks = {}
        try{
            if(AppUser.uid){
                const url: string = TaskDbController.buildUrl(AppUser.uid, TaskDbController.resource, id)
                if(id){
                    result = await TaskDbController.readData(url) as Task
                }else{
                    result = await TaskDbController.readData(url) as Tasks
                }
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("課題のデータを読み込めませんでした")
        }finally{
            return result
        }
    }

    public static async readTaskByTag(tag: string, value: string): Promise<Tasks>{
        let result: Tasks = {}
        try{
            if(AppUser.uid){
                const url: string = TaskDbController.buildUrl(AppUser.uid, TaskDbController.resource)
                result = await TaskDbController.readDataByTag(url, tag, value) as Tasks
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("課題のデータを読み込めませんでした")
        }finally{
            return result
        }
    }

    public static async readTaskByRange(tag: string, startAt: number|string, endAt: number|string): Promise<Tasks>{
        let result: Tasks = {}
        try{
            if(AppUser.uid){
                const url: string = TaskDbController.buildUrl(AppUser.uid, TaskDbController.resource)
                result = await TaskDbController.readDataByRange(url, tag, startAt, endAt) as Tasks
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("課題のデータを読み込めませんでした")
        }finally{
            return result
        }
    }

    public static async updateTask(data: Task, id: string): Promise<void>{
        try{
            if(AppUser.uid){
                const url = TaskDbController.buildUrl(AppUser.uid, TaskDbController.resource, id);
                await TaskDbController.updateData(url, data);
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("課題のデータを更新できませんでした")
        }
    }

    public static async deleteTask(id: string): Promise<void>{
        try{
            if(AppUser.uid){
                const url = TaskDbController.buildUrl(AppUser.uid, TaskDbController.resource, id);
                await TaskDbController.deleteData(url);
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("課題のデータを削除できませんでした")
        }
    }

    public static async deleteAllTask(): Promise<void>{
        try{
            if(AppUser.uid){
                const url = TaskDbController.buildUrl(AppUser.uid, TaskDbController.resource);
                await TaskDbController.overrideData(url, {});
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("課題のデータを削除できませんでした")
        }
    }

    public static async deleteOldTask(): Promise<void>{
        try{
            if(AppUser.uid){
                const nowTime: number = new Date().getTime();
                const oldData: Tasks = await TaskDbController.readTaskByRange("deadline", "", nowTime);
                for(const key in oldData){
                    await TaskDbController.deleteTask(key);
                }
                if(Object.keys(oldData).length > 0) console.log("提出期限が過ぎた課題を削除しました", oldData);
            }else{
                throw new Error("ユーザーのidを取得できませんでした")
            }
        }catch(e){
            throw new Error("課題のデータを削除できませんでした")
        }
    }
}