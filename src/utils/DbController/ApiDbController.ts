import { DbController } from "./DbController";

export class ApiDbController extends DbController{// FirebaseのAPIデータを取り扱うためのクラス
    constructor(service: string) {
        const contentLink: string = `API/${service}`;
        super(contentLink)
    }
}