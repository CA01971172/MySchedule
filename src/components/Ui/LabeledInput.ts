import { Input } from "./Input"
import { Label } from "./Label"

interface LabeledInputOptions {//LabeledInputクラスのコンストラクターに渡すオブジェク
    label: string;
    name: string;
    type: string;
    readonly?: boolean;
    required?: boolean;
}

export class LabeledInput {//label要素とinput要素をまとめたものを作成するクラス
    protected label: Label;
    protected input: Input;

    constructor(options: LabeledInputOptions) {
        const { label, name, type, readonly = false, required = false } = options;

        this.label = new Label({ label, name });
        this.input = new Input({ name, type, readonly, required });
    }

    render(): HTMLDivElement {//label要素とinput要素をまとめたものを作成するメソッド
        const div = document.createElement('div');
        div.classList.add('labeled-input');
        div.appendChild(this.label.render());
        div.appendChild(document.createElement("br"));
        div.appendChild(this.input.render());
        return div;
    }
}