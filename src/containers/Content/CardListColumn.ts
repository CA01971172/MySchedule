import { TaskDbController } from "./TaskDbController"
import { EventDbController } from "./EventDbController"
import { TandemCard } from "./TandemCard"
import { Events, Task, Tasks } from "../../utils/types"
import { Event } from "../../utils/types"

export class CardListColumn {
    private data: Tasks | Events;
    private columnType: "task" | "event";


  
    constructor(data: Tasks | Events, columnType: "task" | "event") {
      this.columnType = columnType;

      if(columnType === "task"){
        this.getTasks()
        .then(response => {
            this.data = response
        })
      }else{
        this.getEvents()
        .then(response => {
            this.data = response
        })
      }
    }
  
    private async getTasks():Promise<Tasks> {
      // TaskDbControllerのreadData()メソッドを呼び出して、Tasks型のデータを取得する処理を実装する
      // 以下は仮の実装例
      return await TaskDbController.readTask();
    }
  
    private async getEvents(): Promise<Events> {
      // EventDbControllerのreadData()メソッドを呼び出して、Events型のデータを取得する処理を実装する
      // 以下は仮の実装例
      return await EventDbController.readEvent();
    }
  
    public render(): HTMLElement {
      const columnElement = document.createElement("div");
      columnElement.classList.add("card-list-column");
  
      for(let item  in this.data)  {
        const card = new TandemCard(this.data.item, this.columnType);
        const cardElement = card.render();
        columnElement.appendChild(cardElement);
      };
  
      return columnElement;
    }
}
