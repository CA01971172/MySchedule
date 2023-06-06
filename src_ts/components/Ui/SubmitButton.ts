import { Button } from './Button';

export class SubmitButton extends Button {//type="submit"のbutton要素を作成するクラス
    constructor(value: string, handler: (form: HTMLFormElement) => void) {
        super(value, () => {});

        this.button.type = 'submit';
        this.button.onclick = (event) => {//フォームを送信する処理をキャンセルする
            event.preventDefault();
            //後程form要素でフォームの内容を取得する処理を適用する
            const form = this.button.closest('form');
            if (form) {
                handler(form);
            }
        };
    }
}