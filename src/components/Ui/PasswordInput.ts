import { LabeledInput, LabeledInputOptions } from "./LabeledInput"

export class PasswordInput extends LabeledInput {
    render(): HTMLDivElement {
        const passwordInput = this.input.render() as HTMLInputElement;
        const showPasswordButton = document.createElement("button");
        showPasswordButton.type = "button";
        showPasswordButton.classList.add("btn", "btn-outline-secondary", "show-password-button");
        showPasswordButton.innerHTML = "<i class='bi bi-eye'></i>";

        const togglePasswordVisibility = () => {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                showPasswordButton.innerHTML = "<i class='bi bi-eye-slash'></i>";
            } else {
                passwordInput.type = "password";
                showPasswordButton.innerHTML = "<i class='bi bi-eye'></i>";
            }
        };

        showPasswordButton.addEventListener("click", togglePasswordVisibility);

        const formPasswordDiv: HTMLDivElement = document.createElement("div");
        formPasswordDiv.classList.add("form-password");
        formPasswordDiv.appendChild(this.label.render());
        formPasswordDiv.appendChild(document.createElement("br"));
        formPasswordDiv.appendChild(passwordInput);
        formPasswordDiv.appendChild(showPasswordButton);

        return formPasswordDiv
    }
}