import DbController from "./DbController"
import { Task, Tasks } from "../types"
import AppUser from "./../AppUser"

export default class TaskDbController extends DbController {
    private static readonly resource: string = "task/tasks";

    constructor() {
        super()
    }

    public static async createTask(data: Task, needReturn: boolean = true): Promise<string>{
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

    public static async readTaskByRange(tag: string, startAt: string, endAt: string): Promise<Tasks>{
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
}