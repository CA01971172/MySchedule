export class DomUtils {//DOM操作用のクラス
  private parentElement: HTMLElement | null;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement
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

  appendChildMultiple(parent: HTMLElement, children: HTMLElement[]) {
    children.forEach(child => {
      parent.appendChild(child);
    });
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