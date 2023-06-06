export class DomUtils {//DOM操作用のクラス
  private parentElement: HTMLElement | null;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement
  }

  /* ここから下はAIで用意した要るかどうかわからんメソッド共 */
  public static createElement(tagName: keyof HTMLElementTagNameMap, className?: string|string[], innerText?: string): HTMLElement {
    const element = document.createElement(tagName);
    if (className) {
      if(typeof className === "string"){
        element.classList.add(className)
      }else if(typeof className === "object"){
        for(let i in className){
          if(className[i] === "")break
          element.classList.add(className[i]);
        }
      }
    }
    if (innerText) {
      element.innerText = innerText;
    }
    return element;
  }

  public static createImg(src: string, alt?: string, className?: string): HTMLImageElement {
    const img = new Image();
    img.src = src;
    if (alt) {
      img.alt = alt;
    }
    if (className) {
      img.classList.add(className);
    }
    return img;
  }

  public static appendChild(parent: HTMLElement, child: HTMLElement): void {
    parent.appendChild(child);
  }

  public static appendChildMultiple(parent: HTMLElement, children: HTMLElement[]): void {
    children.forEach(child => {
      parent.appendChild(child);
    });
  }

  public appendElement(tagName: keyof HTMLElementTagNameMap, className?: string|string[], innerText?: string): void {
    const element = DomUtils.createElement(tagName, className, innerText);
    if(this.parentElement)DomUtils.appendChild(this.parentElement, element);
  }

  public appendImg(src: string, alt?: string, className?: string): void {
    const img = DomUtils.createImg(src, alt, className);
    if(this.parentElement)DomUtils.appendChild(this.parentElement, img);
  }
}