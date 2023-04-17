import { Button } from "./Button"

export class AddButton extends Button { // ページ編集用の追加動作用button要素を作成するクラス
    constructor(handler: (() => void)) {
        const style: string[] =["btn", "btn-primary"]
        super("", handler, style)

        // 「+」マークを追加する
        const contentValue:HTMLElement = document.createElement("i")
        contentValue.classList.add("bi");
        contentValue.classList.add("bi-plus-lg");
        this.button.appendChild(contentValue)
    }

    render(): HTMLButtonElement {
        return this.button;
    }
}