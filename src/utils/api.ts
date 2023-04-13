import { UserInfo,ContentType } from "./types"
import { dbUrl } from "./constants"
import {
    createUserWithEmailAndPassword,
    sendEmailVerification ,
    signInWithEmailAndPassword,
    getAuth,
    signOut,
    onAuthStateChanged,
    User
} from 'firebase/auth'
import { FirebaseError } from '@firebase/util'

export class AppUser {
    private _uid: string = "";
    private _userInfo: UserInfo = {
        email:"",
        password:""
    } as UserInfo;
    //ここにはないけどgetterによって実質的なフィールドとしてisLoginプロパティを用意している

    constructor() {

    }

    get uid(): string {
        return this._uid;
    }

    set uid(uid: string) {
        this._uid = uid;
    }

    get userInfo(): UserInfo {
        return this._userInfo;
    }

    set userInfo(userInfo: UserInfo) {
        this._userInfo = userInfo;
    }

    setUserInfo(email: string, password: string){//フィールドuserInfoにプロパティを代入するメソッド
        const userInfo:UserInfo={} as UserInfo
        userInfo.email=email
        userInfo.password=password
        this.userInfo=userInfo
    }

    async signUp():Promise<void>{//サインアップするメソッド
        try {
            const auth = getAuth()
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                this.userInfo.email,
                this.userInfo.password
            )
            await sendEmailVerification(userCredential.user)
            console.log("email sended")
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.log(e)
            }
        }
    }

    async signIn():Promise<void>{//サインインするメソッド
        try {
            const auth = getAuth()
            await signInWithEmailAndPassword(
                auth,
                this.userInfo.email,
                this.userInfo.password
            )
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.log(e)
            }
        }
    }

    async signOut():Promise<void>{//サインアウトするメソッド
        try {
            const auth = getAuth()
            await signOut(auth)
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.log(e)
            }
        }
    }

    async getAuthState():Promise<User | null>{//ユーザーの認証情報を取得するメソッド
        return new Promise((resolve, reject) => {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    const uid = user.uid;
                    resolve(user);
                } else {
                    // User is signed out
                    resolve(null);
                }
            });
        });
    }

    async setUserProperty():Promise<void>{//ユーザーの認証情報を取得してid等をフィールドに代入するメソッド
        const authState=await this.getAuthState()
        if(authState){
            this.uid=authState.uid
            if(authState.email){
                this.userInfo.email=authState.email
            }
            
        }
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