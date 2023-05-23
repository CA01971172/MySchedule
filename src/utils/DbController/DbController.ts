export class DbController { // Firebaseのデータを取り扱うためのクラス
    protected readonly baseDbUrl: string = "https://myschedule-c0a49-default-rtdb.firebaseio.com"

    constructor() {
    }

    public buildUrl(uid: string, resource: string, id?: string): string{
        let result: string = ""
        let idSelect: string = ""
        if (id){
            idSelect = `/${id}`
        }
        result = `${this.baseDbUrl}/users/${uid}/${resource}${idSelect}.json`
        return result;
    }

    public async createData(url: string, data: object): Promise<void>{
        await fetch(url, {
            method:'POST', 
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

    public async readData(url: string): Promise<object>{
        const response = await fetch(url)
        const result: object = await response.json()
        return result
    }

    public async readDataByTag(url: string, tag: string, value: string): Promise<object>{
        const query: string = `?orderBy="${tag}"&equalTo="${value}"`
        const completeUrl: string = url + query
        const result: object = await this.readData(completeUrl)
        return result
    }

    public async readDataByRange(url: string, tag: string, startAt: string, endAt: string): Promise<object>{
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
        const result: object = await this.readData(completeUrl)
        return result
    }

    public async overrideData(url: string, data: object): Promise<void>{
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

    public async updateData(url: string, data: object): Promise<void>{
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

    public async deleteData(url: string): Promise<void>{
        await fetch(url, {
            method:'DELETE'
        })
        // const response = await fetch(url)
        // const result = await response.json()
        // console.log(result)
    }
}