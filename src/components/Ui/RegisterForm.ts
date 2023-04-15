import { LabeledInput } from './LabeledInput';
import { Form } from './Form';

export class RegisterForm extends Form {//アカウント登録用のform要素を作成するクラス
    private emailInput: LabeledInput;
    private passwordInput: LabeledInput;
    private passwordCheckInput: LabeledInput;

    constructor(onSubmit: (data: any) => void) {
        super('register-form', 'アカウント登録', onSubmit);
        this.emailInput = new LabeledInput({
            label: 'メールアドレス',
            name: 'email',
            type: 'email',
            readonly: false,
            required: true
        });

        this.passwordInput = new LabeledInput({
            label: 'パスワード',
            name: 'password',
            type: 'password',
            readonly: false,
            required: true
        });

        this.passwordCheckInput = new LabeledInput({
            label: 'パスワード確認',
            name: 'password-check',
            type: 'password',
            readonly: false,
            required: true
        });

        this.addInputs([this.emailInput, this.passwordInput, this.passwordCheckInput]);
    }
}