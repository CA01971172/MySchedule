import { DbController } from "./DbController"
import { Event, Events } from "../types"

export class EventDbController extends DbController {
    private uid: string;
    private readonly resource: string = 'event/events';
  
    constructor(uid: string) {
      super();
      this.uid = uid;
    }
  
    public async createEvent(data: Event): Promise<void> {
      const url = this.buildUrl(this.uid, this.resource);
      await this.createData(url, data);
    }

    public async readEvent(id?: string): Promise<Event|Events>{
        const url: string = this.buildUrl(this.uid, this.resource, id)
        let result: Event|Events
        if(id){
            result = await this.readData(url) as Event
        }else{
            result = await this.readData(url) as Events
        }
        return result
    }
    
    public async readEventByTag(tag: string, value: string): Promise<Events >{
        const url: string = this.buildUrl(this.uid, this.resource)
        const result: Events = await this.readDataByTag(url, tag, value) as Events
        return result
    }
    
    public async readEventByRange(tag: string, startAt: string, endAt: string): Promise<Events>{
        const url: string = this.buildUrl(this.uid, this.resource)
        const result: Events = await this.readDataByRange(url, tag, startAt, endAt) as Events
        return result
    }
   
    public async updateEvent(data: Event, id: string): Promise<void> {
      const url = this.buildUrl(this.uid, this.resource, id);
      await this.updateData(url, data);
    }
  
    public async deleteEvent(id: string): Promise<void> {
      const url = this.buildUrl(this.uid, this.resource, id);
      await this.deleteData(url);
    }
  }