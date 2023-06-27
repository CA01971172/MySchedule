export default class DbController { // Firebaseのデータを取り扱うためのクラス
    protected static readonly baseDbUrl: string = "https://myschedule-c0a49-default-rtdb.firebaseio.com"

    constructor() {
    }

    protected static buildUrl(uid: string, resource: string, id?: string): string{
        let result: string = ""
        let idSelect: string = ""
        if (id){
            idSelect = `/${id}`
        }
        result = `${DbController.baseDbUrl}/users/${uid}/${resource}${idSelect}.json`
        return result;
    }

    protected static async createData(url: string, data: object, needReturn: boolean): Promise<string>{
        let result = "";
        let prevData: object = new Object();
        if(needReturn){
            // createする前のデータを取得しておく
            prevData = await DbController.readData(url);
        }
        await fetch(url, {
            method:'POST', 
            mode: 'cors', 
            headers: { 
                'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify(data)
        })
        if(needReturn){
            const response = await fetch(url)
            const allData = await response.json()
            const addedKeys: string[] = getAddedKeys(prevData, allData);
            result = addedKeys[0];
            return result;
        }else{
            return "";
        }
    }

    protected static async readData(url: string): Promise<any>{
        const response = await fetch(url)
        const result: object = await response.json()
        return result
    }

    protected static async readDataByTag(url: string, tag: string, value: string): Promise<any>{
        const query: string = `?orderBy="${tag}"&equalTo="${value}"`
        const completeUrl: string = url + query
        const result: any = await DbController.readData(completeUrl)
        return result
    }

    protected static async readDataByRange(url: string, tag: string, startAt: number|string, endAt: number|string): Promise<any>{
        let queryStartAt: string = "";
        if(startAt !== ""){
            if(typeof startAt === "string"){
                queryStartAt = `&startAt="${startAt}"`
            }else{
                queryStartAt = `&startAt=${startAt}`
            }
        }
        let queryEndAt: string = "";
        if(endAt !== ""){
            if(typeof endAt === "string"){
                queryEndAt = `&endAt="${endAt}"`
            }else{
                queryEndAt = `&endAt=${endAt}`
            }
        }
        const query: string = `?orderBy="${tag}"${queryStartAt}${queryEndAt}`
        const completeUrl: string = url + query
        const result: any = await DbController.readData(completeUrl)
        return result
    }

    protected static async overrideData(url: string, data: any): Promise<void>{
        await fetch(url, {
            method:'PUT', 
            mode: 'cors', 
            headers: { 
                'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify(data)
        })
        // const response = await fetch(url)
        // const result = await response.json()
        // console.log(result)
    }

    protected static async updateData(url: string, data: any): Promise<void>{
        await fetch(url, {
            method:'PATCH', 
            mode: 'cors', 
            headers: { 
                'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify(data)
        })
        // const response = await fetch(url)
        // const result = await response.json()
        // console.log(result)
    }

    protected static async deleteData(url: string): Promise<void>{
        await fetch(url, {
            method:'DELETE'
        })
        // const response = await fetch(url)
        // const result = await response.json()
        // console.log(result)
    }

    public static async deleteUserData(uid: string): Promise<void>{
        try{
            const url: string = `${DbController.baseDbUrl}/users/${uid}.json`;
            DbController.deleteData(url);
        }catch(e){
            console.log(e);
            window.alert("ユーザーデータの削除に失敗しました")
        }
    }
}

// オブジェクトを比較して、追加されたキーを取得する関数
function getAddedKeys(originalObj: object, comparedObj: object) {
    const originalKeys = Object.keys(originalObj || {});
    const comparedKeys = Object.keys(comparedObj || {});
    const addedKeys = comparedKeys.filter(key => !originalKeys.includes(key));
    return addedKeys;
}