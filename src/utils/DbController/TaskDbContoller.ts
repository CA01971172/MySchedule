import { DbController } from "./DbController"
import { Task, Tasks } from "./../../utils/types"

export class TaskDbController extends DbController {
    private uid: string;
    private readonly resource: string = 'task/tasks';
  
    constructor(uid: string) {
      super();
      this.uid = uid;
    }
  
    public async createTask(data: Task): Promise<void> {
      const url = this.buildUrl(this.uid, this.resource);
      await this.createData(url, data);
    }

    public async readTask(id?: string): Promise<Task|Tasks>{
        const url: string = this.buildUrl(this.uid, this.resource, id)
        let result: Task|Tasks
        if(id){
            result = await this.readData(url) as Task
        }else{
            result = await this.readData(url) as Tasks
        }
        return result
    }
    
    public async readTaskByTag(tag: string, value: string): Promise<Tasks >{
        const url: string = this.buildUrl(this.uid, this.resource)
        const result: Tasks = await this.readDataByTag(url, tag, value) as Tasks
        return result
    }
    
    public async readTaskByRange(tag: string, startAt: string, endAt: string): Promise<Tasks>{
        const url: string = this.buildUrl(this.uid, this.resource)
        const result: Tasks = await this.readDataByRange(url, tag, startAt, endAt) as Tasks
        return result
    }
   
    public async updateTask(data: Task, id: string): Promise<void> {
      const url = this.buildUrl(this.uid, this.resource, id);
      await this.updateData(url, data);
    }
  
    public async deleteTask(id: string): Promise<void> {
      const url = this.buildUrl(this.uid, this.resource, id);
      await this.deleteData(url);
    }
  }