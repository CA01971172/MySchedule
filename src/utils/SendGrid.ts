import sendgrid from '@sendgrid/mail'
import { EmailData, SendGridSettings } from './types';
import { ApiDbController } from "./DbController/ApiDbController"

export class SendGrid { // SendGridでメール送信を行うためのクラス
    private APIKey: string | null = null;
    private fromEmail: string | null = null;
    private toEmail: string;

    constructor(toEmail: string){
        this.toEmail = toEmail
    }

    private async setAPIKey(){ // APIキー等を取得してフィールドに代入するメソッド
        const dbController: ApiDbController = new ApiDbController("SendGrid")
        const sendGridSettings: SendGridSettings = await dbController.readData() as SendGridSettings
        this.APIKey = sendGridSettings.APIKey
        this.fromEmail = sendGridSettings.fromEmail
    }

    async sendEmail(subject: string, text: string){ // メール送信を行うメソッド
        if(this.APIKey && this.fromEmail){
            const emailData: EmailData = {
                to: this.toEmail,
                bcc: "",
                from: this.fromEmail,
                subject: subject,
                text: text
            }
            sendgrid.setApiKey(this.APIKey);
            try {
                    const [response] = await sendgrid.send(emailData) // メールを送信する
                    console.info(response)
                } catch(error) {
                    console.error(error)
            }
        }else{
            throw new Error("SendGridクラスはsetAPIKey()で初期化してください");
        }
    }
}