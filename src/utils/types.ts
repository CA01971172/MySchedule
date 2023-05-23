/* firebase関連の型定義 */
export type UserInfo = {
    email:string,
    password:string
}

/* SendGrid関連の型定義 */
export type EmailData = {
    to: string;
    bcc?: string;
    from?: string;
    subject: string;
    text: string;
}

/* ページ操作関連の型定義 */
export type ContentType = "timetable"|"task"|"shift"|"event"
export type PageType = null|"login"|"register"|ContentType|"calendar"//nullはindexページ(メニューページ)

/* ユーザー管理関連のデータモデル */
export type LoginData = {
    email: string;
    password: string;
}
export type RegisterData = {
    email: string;
    password: string;
    passwordCheck: string;
}

/* 時間割管理機能のデータモデル */
export type TimeTable = {
    title: string;
    teacher: string;
    classroom: string;
    startTime: number;
    endTime: number;
    dayOfWeek: number; // Date.getDay()で得られる曜日の形式
};

export interface TimeTables{
    [id: string]: TimeTable;
}

export type TimeTableList = {
    timeTables: TimeTables;
};

/* 課題管理機能のデータモデル */
export type Task = {
    title: string;
    description: string;
    deadline: number; // 締め切り日時
};

export interface Tasks{
    [id: string]: Task;
}

type TaskSettings = {
    enabledAlert: boolean; // アラートの有効/無効を管理するプロパティ
    daysBeforeDeadline: number; // 課題提出期限の何日前にアラートを送信するかを管理するプロパティ
    autoTaskDelete: boolean;
};

export type TaskList = {
    tasks: Tasks;
    taskSettings: TaskSettings;
};


/* アルバイト管理機能のデータモデル */
export type Shift = {
    startTime: number; // シフト開始日時
    endTime: number; // シフト終了日時
    breakTime: number; // 休憩時間（分単位）
};

export interface Shifts{
    [id: string]: Shift;
}

export type ShiftList = {
    shifts: Shifts;
};

/* 予定追加機能のデータモデル */
export type Event = {
    title: string;
    description: string;
    startTime: number;
    endTime: number;
    isAllDay: boolean; // 終日予定かどうか
};

export interface Events{
    [id: string]: Event;
}

type EventSettings = {
    hidePassedEvent: boolean; // 過去の予定を非表示にするかどうか
};

export type EventList = {
    events: Events;
    eventSettings: EventSettings;
};

/* その他 */
export type Weekday = { // どの曜日を含めた曜日欄を作成するか決定するための型
    sun: boolean,
    mon: boolean,
    tue: boolean,
    wed: boolean,
    thu: boolean,
    fri: boolean,
    sat: boolean
}