import { ContentType } from "../types"
import { DbController } from "./DbController";

export class UserDbController extends DbController { // Firebaseのユーザーデータを取り扱うためのクラス
    constructor(userId: string, content: ContentType, data: object = {}) {
        const contentLink: string = `users/${userId}/${content}`;
        super(contentLink, data)
    }
}