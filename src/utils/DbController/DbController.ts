export class DbController { // Firebaseのデータを取り扱うためのクラス
    protected readonly baseDbUrl: string = "https://myschedule-c0a49-default-rtdb.firebaseio.com"

    constructor() {
    }

    public buildUrl(uid: string, resource: string, id?: string): string{ // 完全なURLを生成する
        let result: string = ""
        result = `${this.baseDbUrl}/users/${uid}/${resource}.json`
        if(id){
            result += `?orderBy="id"&equalTo="${id}"`
        }
        return result;
    }

    protected generateUniqueKey(): string{ // 一意キーを作成する
        let result: string = "";
        result = new Date().getTime().toString(16);
        return result;
    }

    public async createData(url: string, data: object): Promise<void>{
        fetch(url,{
            method:'POST',
            mode:'cors',
            headers:{
            'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }).then(res=>{
            //console.log("From update\n"+res.statusText)
        })
    }
}