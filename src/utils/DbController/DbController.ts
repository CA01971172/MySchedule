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
        console.log(0)
        await fetch(url, {
            method:'POST', 
            mode: 'cors', 
            headers: { 
                'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify(data)
        })
        console.log(1)
        if(needReturn){
            const response = await fetch(url)
            console.log("response",response)
            const allData = await response.json()
            console.log("allData",allData)
            const addedKeys: string[] = getAddedKeys(prevData, allData);
            console.log("addedKeys",addedKeys)
            result = addedKeys[0];
            console.log("result",result)
            return result;
        }else{
            return "";
        }
    }

    protected static async readData(url: string): Promise<object>{
        const response = await fetch(url)
        const result: object = await response.json()
        return result
    }

    protected static async readDataByTag(url: string, tag: string, value: string): Promise<object>{
        const query: string = `?orderBy="${tag}"&equalTo="${value}"`
        const completeUrl: string = url + query
        const result: object = await DbController.readData(completeUrl)
        return result
    }

    protected static async readDataByRange(url: string, tag: string, startAt: string, endAt: string): Promise<object>{
        let queryStartAt: string = "";
        if(startAt !== ""){
            queryStartAt = `&startAt="${startAt}"`
        }
        let queryEndAt: string = "";
        if(endAt !== ""){
            queryEndAt = `&endAt="${endAt}"`
        }
        const query: string = `?orderBy="${tag}"${queryStartAt}${queryEndAt}`
        const completeUrl: string = url + query
        const result: object = await DbController.readData(completeUrl)
        return result
    }

    protected static async overrideData(url: string, data: object): Promise<void>{
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

    protected static async updateData(url: string, data: object): Promise<void>{
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
}

// オブジェクトを比較して、追加されたキーを取得する関数
function getAddedKeys(originalObj: object, comparedObj: object) {
    const originalKeys = Object.keys(originalObj || {});
    const comparedKeys = Object.keys(comparedObj || {});
    console.log("originalKeys", originalKeys)
    console.log("comparedKeys", comparedKeys)
    const addedKeys = comparedKeys.filter(key => !originalKeys.includes(key));
    console.log("addedKeys", addedKeys)
    return addedKeys;
}