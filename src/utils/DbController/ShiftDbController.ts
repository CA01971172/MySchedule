import { DbController } from "./DbController"
import { Shift, Shifts } from "./../../utils/types"

export class ShiftDbController extends DbController {
    private uid: string;
    private readonly resource: string = 'shift/shifts';
  
    constructor(uid: string) {
      super();
      this.uid = uid;
    }
  
    public async createShift(data: Shift): Promise<void> {
      const url = this.buildUrl(this.uid, this.resource);
      await this.createData(url, data);
    }

    public async readShift(id?: string): Promise<Shift|Shifts>{
        const url: string = this.buildUrl(this.uid, this.resource, id)
        let result: Shift|Shifts
        if(id){
            result = await this.readData(url) as Shift
        }else{
            result = await this.readData(url) as Shifts
        }
        return result
    }
    
    public async readShiftByTag(tag: string, value: string): Promise<Shifts >{
        const url: string = this.buildUrl(this.uid, this.resource)
        const result: Shifts = await this.readDataByTag(url, tag, value) as Shifts
        return result
    }
    
    public async readShiftByRange(tag: string, startAt: string, endAt: string): Promise<Shifts>{
        const url: string = this.buildUrl(this.uid, this.resource)
        const result: Shifts = await this.readDataByRange(url, tag, startAt, endAt) as Shifts
        return result
    }
   
    public async updateShift(data: Shift, id: string): Promise<void> {
      const url = this.buildUrl(this.uid, this.resource, id);
      await this.updateData(url, data);
    }
  
    public async deleteShift(id: string): Promise<void> {
      const url = this.buildUrl(this.uid, this.resource, id);
      await this.deleteData(url);
    }
  }