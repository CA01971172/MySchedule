import { CardListColumn } from "./CardListColumn";
import { PageContent } from "./PageContent"
import { rootDiv } from "./../../utils/constants"
import { DomUtils } from "./../../utils/domUtils"

export class EventContent implements PageContent {
  constructor() {}

  public render(): HTMLElement[] {
    const eventElement = this.renderEvent();
    return [eventElement];
  }

  private renderEvent(): HTMLElement {
    const column = new CardListColumn( "event"); 
    const eventElement = column.render();
    return eventElement;
  }
}
