export class Button {//button要素を作成するクラス
  protected text: string; //button要素に書かれる文字

  constructor(text: string) {
    this.text = text;
  }

  render(): HTMLElement {//button要素を作成するメソッド
    const button = document.createElement('button');
    button.textContent = this.text;
    return button;
  }
}