import { LabeledInput } from './LabeledInput';
import { Form } from './Form';

export class LoginForm extends Form {//ログイン用のform要素を作成するクラス
    private emailInput: LabeledInput;
    private passwordInput: LabeledInput;

    constructor(onSubmit: (data: any) => void) {
        super('register-form', 'ログイン', onSubmit);
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

        this.addInputs([this.emailInput, this.passwordInput]);
    }
}