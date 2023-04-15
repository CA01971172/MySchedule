import { Button } from "./Button"
export class SubmitButton extends Button{//type="submit"のbutton要素を作成するクラス
    render(): HTMLElement {//button要素を作成するメソッド
        const button = document.createElement('button');
        button.textContent = this.text;
        button.type = 'submit';
        return button;
    }
}