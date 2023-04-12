import { UserInfo,ContentType } from "./types"
import { dbUrl } from "./constants"

export class User {
    private _uid: string;
    private _displayName: string;
    private _userInfo: UserInfo;

    constructor(uid: string = "", displayName: string = "", userInfo: UserInfo = {} as UserInfo) {
        this._uid = uid;
        this._displayName = displayName;
            this._userInfo = userInfo;
    }

    get uid(): string {
        return this._uid;
    }

    set uid(uid: string) {
        this._uid = uid;
    }

    get displayName(): string {
        return this._displayName;
    }

    set displayName(displayName: string) {
        this._displayName = displayName;
    }

    get userInfo(): UserInfo {
        return this._userInfo;
    }

    set userInfo(userInfo: UserInfo) {
        this._userInfo = userInfo;
    }
}

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

    async createData(data: object): Promise<void> {
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
    
    async readData(): Promise<object> {
        const response = await fetch(this.dbPath);
    
        if (!response.ok) {
            throw new Error(`Failed to read data (status code: ${response.status})`);
        }
    
        const data = await response.json();
        this.data = data;
        return data;
        }
    
        async updateData(data: object): Promise<void> {
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
    
    async deleteData(id: string): Promise<void> {
        const response = await fetch(this.dbPath, {
            method: "DELETE",
        });
    
        if (!response.ok) {
            throw new Error(`Failed to delete data (status code: ${response.status})`);
        }
    }
}


