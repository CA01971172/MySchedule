import { LabeledInput } from './LabeledInput';
import { SubmitButton } from './SubmitButton';

export class Form {//form要素を作成するクラス
    protected form: HTMLFormElement;
    protected submitButton: SubmitButton;

    constructor(formId: string, submitButtonLabel: string, onSubmit: (data: any) => void) {
        this.form = document.createElement('form');
        this.form.id = formId;

        this.submitButton = new SubmitButton(submitButtonLabel, (form) => {
            const formData: FormData = new FormData(form);
            const entries = formData.entries();
            const data = Object.fromEntries(entries);
            onSubmit(data);
        });
    }

    protected addInput(input: LabeledInput): void {//input要素をフォームに追加するメソッド
        this.form.appendChild(input.render());
    }

    protected addInputs(inputs: LabeledInput[]): void {//input要素をまとめてフォームに追加するメソッド
        inputs.forEach(input => this.addInput(input));
    }

    render(): HTMLFormElement {//フォーム要素を作成するメソッド
        this.form.appendChild(this.submitButton.render());
        return this.form;
    }

    public static mailCheck( mail: string ): boolean {// メールアドレスをチェックするメソッド
        const mail_regex1 = new RegExp( '(?:[-!#-\'*+/-9=?A-Z^-~]+\.?(?:\.[-!#-\'*+/-9=?A-Z^-~]+)*|"(?:[!#-\[\]-~]|\\\\[\x09 -~])*")@[-!#-\'*+/-9=?A-Z^-~]+(?:\.[-!#-\'*+/-9=?A-Z^-~]+)*' );
        const mail_regex2 = new RegExp( '^[^\@]+\@[^\@]+$' );
        if( mail.match( mail_regex1 ) && mail.match( mail_regex2 ) ) {
            // 全角チェック
            if( mail.match( /[^a-zA-Z0-9\!\"\#\$\%\&\'\(\)\=\~\|\-\^\\\@\[\;\:\]\,\.\/\\\<\>\?\_\`\{\+\*\} ]/ ) ) { return false; }
            // 末尾TLDチェック（〜.co,jpなどの末尾ミスチェック用）
            if( !mail.match( /\.[a-z]+$/ ) ) { return false; }
            return true;
        } else {
            return false;
        }
    }
    
}
