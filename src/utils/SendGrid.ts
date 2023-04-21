import { EmailData  } from './types';

export class SendGrid { // SendGridでメール送信を行うためのクラス
    private readonly serverLink: string = "http://x-omasa.top:3000/send-email"

    async sendEmail(emailData: EmailData){
        const response = await fetch(this.serverLink, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });
        const result = await response.text();
        console.log(result);
    }
}