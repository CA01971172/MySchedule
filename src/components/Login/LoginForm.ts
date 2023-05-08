import { LabeledInput } from '../Ui/LabeledInput';
import { PasswordInput } from '../Ui/PasswordInput';
import { Form } from '../Ui/Form';

export class LoginForm extends Form {//ログイン用のform要素を作成するクラス
    private emailInput: LabeledInput;
    private passwordInput: LabeledInput;

    constructor(onSubmit: (data: any) => void) {
        super('register-form', 'ログイン', onSubmit);
        this.form.classList.add("border","rounded");
        this.emailInput = new LabeledInput({
            label: 'メールアドレス',
            name: 'email',
            type: 'email',
            readonly: false,
            required: true
        });

        this.passwordInput =  new PasswordInput({
            label: "パスワード",
            name: "password",
            type: "password",
            required: true,
        });

        this.addInputs([this.emailInput, this.passwordInput]);
    }
}