import { ContentType } from "./types"
import { dbUrl } from "./constants"

export class DbController {
    private _dbPath: string;
    private _data: object;

    constructor(userId: string, content: ContentType, data: object = {}) {
        this._dbPath = `${dbUrl}/users/${userId}/${content}.json`;
        this._data = data;
    }

    get dbPath(): string {
        return this._dbPath;
    }

    set dbPath(dbPath: string) {
        this._dbPath = dbPath;
    }

    get data(): object {
        return this._data;
    }

    set data(data: object) {
        this._data = data;
    }

    async createData(data: object): Promise<void> {//データベースにデータを作成する
        const response = await fetch(this.dbPath, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    
        if (!response.ok) {
            throw new Error(`Failed to create data (status code: ${response.status})`);
        }
    }

    async readData(): Promise<object> {//データベースからデータを読み出す
            const response = await fetch(this.dbPath);
        
            if (!response.ok) {
                throw new Error(`Failed to read data (status code: ${response.status})`);
            }
        
            const data = await response.json();
            this.data = data;
            return data;
        }

        async updateData(data: object): Promise<void> {//データベースのデータを更新する
            const response = await fetch(this.dbPath, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
            },
                body: JSON.stringify(data),
            });
        
            if (!response.ok) {
                throw new Error(`Failed to update data (status code: ${response.status})`);
            }
    }

    async deleteData(id: string): Promise<void> {//データベースのデータを削除する
        const response = await fetch(this.dbPath, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`Failed to delete data (status code: ${response.status})`);
        }
    }
}