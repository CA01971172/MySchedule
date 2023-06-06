import { rootDiv } from "./../../utils/constants"
import { DomUtils } from "./../../utils/domUtils"
import { Task } from "./../../utils/types"
export class TaskColumn {

    private tasks:Task[];

    constructor(){
        this.tasks = this.getTasks()
    }


    render():HTMLElement{
        // 下記は、使わないよ。
        return document.createElement("p")
    }

    private getTasks():Task[]{
    // 下記は、使わないよ
        return [{} as Task]


    }
}