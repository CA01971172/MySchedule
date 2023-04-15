export interface LabelOptions {//Labelクラスのコンストラクターに渡すオブジェクト
    label: string;
    name: string;
}

export class Label {//label要素を作成するクラス
        private label: string;
        private name: string;
    
        constructor(options: LabelOptions) {
            const { label, name } = options;

            this.label = label;
            this.name = name;
        }

    render(): HTMLLabelElement {//label要素を作成するメソッド
        const label = document.createElement('label');
        label.htmlFor = this.name;
        label.textContent = this.label;
        return label;
    }
}