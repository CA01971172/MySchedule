export class Button {//button要素を作成するクラス
    protected button: HTMLButtonElement;

    //valueはbutton要素に書かれる文字
    //urlか処理のどちらかを受け取って、ボタンの処理に適用する
    constructor(value: string, handler: string | (() => void)) {
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.textContent = value;

        if (typeof handler === 'string') {//urlを受け取った際は、ボタン押下時にページ遷移する
            this.button.onclick = () => {
                window.location.href = handler;
            };
        } else {//処理を受け取った際は、ボタン押下時にその処理を実行する
            this.button.onclick = handler;
        }
    }

    render(): HTMLButtonElement {
        return this.button;
    }
}