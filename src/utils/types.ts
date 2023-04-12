/* firebase関連の型定義 */
export type UserInfo = {
    name:string,
    email:string,
    password:string
}

export type ContentType = "timetable"|"task"|"shift"|"event"