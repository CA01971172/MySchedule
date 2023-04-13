/* firebase関連の型定義 */
export type UserInfo = {
    email:string,
    password:string
}

export type ContentType = "timetable"|"task"|"shift"|"event"

/* ページ操作関連の型定義 */
export type PageType = null|"login"|ContentType|"calendar"//nullはindexページ(メニューページ)
export type PageModeType = null|"edit"//nullはカレンダーページなどの入力フォームが存在しない画面

/* 時間割管理機能のデータモデル */
type TimeTable = {
    id: number; // new Date().getTime().toString(16) によってタイムスタンプで作成する一意キー
    name: string;
    teacher: string;
    classroom: string;
    startTime: Date;
    endTime: Date;
    dayOfWeek: number; // Date.getDay()で得られる曜日の形式
};

export type TimeTableList = {
    timeTables: TimeTable[];
};

/* 課題管理機能のデータモデル */
type Task = {
    id: number; // タイムスタンプで作成する一意キー
    title: string;
    description: string;
    deadline: Date; // 締め切り日時
};

export type TaskList = {
    tasks: Task[];
};


/* アルバイト管理機能のデータモデル */
type Shift = {
    id: number; // タイムスタンプで作成する一意キー
    startTime: Date; // シフト開始日時
    endTime: Date; // シフト終了日時
    breakTime: number; // 休憩時間（分単位）
};

export type ShiftList = {
    shifts: Shift[];
};

/* 予定追加機能のデータモデル */
type EventSchedule = {
    id: number; // タイムスタンプで作成する一意キー
    title: string;
    description: string;
    date: Date;
    startTime: Date;
    endTime: Date;
};

export type EventScheduleList = {
    eventSchedules: EventSchedule[];
};
