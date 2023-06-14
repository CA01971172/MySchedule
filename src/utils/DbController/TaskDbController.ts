import DbController from "./DbController"
import { Task, Tasks } from "../types"
import AppUser from "./../AppUser"

export default class TaskDbController extends DbController {
    private static readonly resource: string = "task/tasks";

    constructor() {
        super()
    }

    public static async createTimetable(data: Task): Promise<void>{
        try{
            if(AppUser.uid){
                const url = TaskDbController.buildUrl(AppUser.uid, TaskDbController.resource);
                await TaskDbController.createData(url, data);
            }
        }catch(e){
            throw new Error("課題のデータを作成できませんでした")
        }
    }

    public static async readTimetable(id?: string): Promise<Task|Tasks>{
        let result: Task|Tasks = {}
        try{
            if(AppUser.uid){
                const url: string = TaskDbController.buildUrl(AppUser.uid, TaskDbController.resource, id)
                if(id){
                    result = await TaskDbController.readData(url) as Task
                }else{
                    result = await TaskDbController.readData(url) as Tasks
                }
            }
        }catch(e){
            throw new Error("課題のデータを読み込めませんでした")
        }finally{
            return result
        }
    }

    public static async readTimetableByTag(tag: string, value: string): Promise<Tasks>{
        let result: Tasks = {}
        try{
            if(AppUser.uid){
                const url: string = TaskDbController.buildUrl(AppUser.uid, TaskDbController.resource)
                result = await TaskDbController.readDataByTag(url, tag, value) as Tasks
            }
        }catch(e){
            throw new Error("課題のデータを読み込めませんでした")
        }finally{
            return result
        }
    }

    public static async readTimetableByRange(tag: string, startAt: string, endAt: string): Promise<Tasks>{
        let result: Tasks = {}
        try{
            if(AppUser.uid){
                const url: string = TaskDbController.buildUrl(AppUser.uid, TaskDbController.resource)
                result = await TaskDbController.readDataByRange(url, tag, startAt, endAt) as Tasks
            }
        }catch(e){
            throw new Error("課題のデータを読み込めませんでした")
        }finally{
            return result
        }
    }

    public static async updateTimetable(data: Task, id: string): Promise<void>{
        try{
            if(AppUser.uid){
                const url = TaskDbController.buildUrl(AppUser.uid, TaskDbController.resource, id);
                await TaskDbController.updateData(url, data);
            }
        }catch(e){
            throw new Error("課題のデータを更新できませんでした")
        }
    }

    public static async deleteTimetable(id: string): Promise<void>{
        try{
            if(AppUser.uid){
                const url = TaskDbController.buildUrl(AppUser.uid, TaskDbController.resource, id);
                await TaskDbController.deleteData(url);
            }
        }catch(e){
            throw new Error("課題のデータを削除できませんでした")
        }
    }
}