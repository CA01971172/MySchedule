import DbController from "./DbController"
import { Event, Events } from "../types"
import AppUser from "./../AppUser"

export default class EventDbController extends DbController {
    private static readonly resource: string = 'event/events';
  
    constructor() {
      super();
    }
  
    public static async createEvent(data: Event): Promise<void> {
      try{
        if(AppUser.uid){
          const url = EventDbController.buildUrl(AppUser.uid, EventDbController.resource);
          await EventDbController.createData(url, data);
        }
      }catch(e){
        throw new Error("予定のデータを作成できませんでした")
      }
    }

    public static async readEvent(id?: string): Promise<Event|Events>{
      let result: Event|Events = {}
      try{
        if(AppUser.uid){
          const url: string = EventDbController.buildUrl(AppUser.uid, EventDbController.resource, id)
          if(id){
              result = await EventDbController.readData(url) as Event
          }else{
              result = await EventDbController.readData(url) as Events
          }
        }
      }catch(e){
        throw new Error("予定のデータを読み込めませんでした")
      }finally{
        return result
      }
    }
    
    public static async readEventByTag(tag: string, value: string): Promise<Events>{
      let result: Events = {}
      try{
        if(AppUser.uid){
          const url: string = EventDbController.buildUrl(AppUser.uid, EventDbController.resource)
          result = await EventDbController.readDataByTag(url, tag, value) as Events
        }
      }catch(e){
        throw new Error("予定のデータを読み込めませんでした")
      }finally{
        return result
      }
    }
    
    public static async readEventByRange(tag: string, startAt: string, endAt: string): Promise<Events>{
        let result: Events = {}
        try{
          if(AppUser.uid){
            const url: string = EventDbController.buildUrl(AppUser.uid, EventDbController.resource)
            result = await EventDbController.readDataByRange(url, tag, startAt, endAt) as Events
          }
        }catch(e){
          throw new Error("予定のデータを読み込めませんでした")
        }finally{
          return result
        }
    }
    
    public static async updateEvent(data: Event, id: string): Promise<void> {
      try{
        if(AppUser.uid){
          const url = EventDbController.buildUrl(AppUser.uid, EventDbController.resource, id);
          await EventDbController.updateData(url, data);
        }
      }catch(e){
        throw new Error("予定のデータを更新できませんでした")
      }
    }
  
    public static async deleteEvent(id: string): Promise<void> {
      try{
        if(AppUser.uid){
          const url = EventDbController.buildUrl(AppUser.uid, EventDbController.resource, id);
          await EventDbController.deleteData(url);
        }
      }catch(e){
        throw new Error("予定のデータを削除できませんでした")
      }
    }
  }