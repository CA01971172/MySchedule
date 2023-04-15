export class DomUtils {//DOM操作用のクラス
    private parentElement: HTMLElement | null;
    private childElement: HTMLElement | null;
  
    constructor(parentId: string,childElement: HTMLElement | null) {
      this.parentElement = document.getElementById(parentId);
      this.childElement = childElement
      //後で this.appendChild(this.parentElement,this.childElement) のように実行してやると、作成した要素群をまとめたchildElementがparentElementに追加される。
    }
  
    /* ここから下はAIで用意した要るかどうかわからんメソッド共 */
    createElement(tagName: keyof HTMLElementTagNameMap, className?: string, innerText?: string): HTMLElement {
      const element = document.createElement(tagName);
      if (className) {
        element.classList.add(className);
      }
      if (innerText) {
        element.innerText = innerText;
      }
      return element;
    }
  
    createImg(src: string, alt?: string, className?: string): HTMLImageElement {
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
  
    appendChild(parent: HTMLElement, child: HTMLElement) {
      parent.appendChild(child);
    }
  
    appendElement(tagName: keyof HTMLElementTagNameMap, className?: string, innerText?: string): void {
      const element = this.createElement(tagName, className, innerText);
      if(this.parentElement)this.appendChild(this.parentElement, element);
    }
  
    appendImg(src: string, alt?: string, className?: string): void {
      const img = this.createImg(src, alt, className);
      if(this.parentElement)this.appendChild(this.parentElement, img);
    }
}