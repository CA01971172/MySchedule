export interface InputOptions {//Inputクラスのコンストラクターに渡すオブジェク
    name: string;
    type: string;
    readonly?: boolean;
    required?: boolean;
}

export class Input {//input要素を作成するクラス
    private name: string;
    private type: string;
    private readonly: boolean;
    private required: boolean;

    constructor(options: InputOptions) {
        const { name, type, readonly = false, required = false } = options;

        this.name = name;
        this.type = type;
        this.readonly = readonly;
        this.required = required;
    }

    render(): HTMLInputElement {//input要素を作成するメソッド
        const input = document.createElement('input');
        input.type = this.type;
        input.name = this.name;
        input.id = this.name;
        input.readOnly = this.readonly;
        input.required = this.required;
        return input;
    }
}