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
export type PageStructure = {
    header: HTMLElement;
    content: HTMLElement;
    footer?: HTMLElement;
}

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
type TimeTable = {
    id: number; // new Date().getTime().toString(16) によってタイムスタンプで作成する一意キー
    name: string;
    teacher: string;
    classroom: string;
    startTime: number;
    endTime: number;
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
    deadline: number; // 締め切り日時
};

type TaskSettings = {
    enabled: boolean; // アラートの有効/無効を管理するプロパティ
    daysBeforeDeadline: number; // 課題提出期限の何日前にアラートを送信するかを管理するプロパティ
    autoTaskDelete: boolean;
};

export type TaskList = {
    tasks: Task[];
    taskSettings: TaskSettings;
};


/* アルバイト管理機能のデータモデル */
type Shift = {
    id: number; // タイムスタンプで作成する一意キー
    startTime: number; // シフト開始日時
    endTime: number; // シフト終了日時
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
    date: number;
    startTime: number;
    endTime: number;
    isAllDay: boolean;
};

type EventSettings = {
    hidePassedEvent: boolean; // 過去の予定をひひょうじにするかどうか
};

export type EventScheduleList = {
    eventSchedules: EventSchedule[];
    eventSettings: EventSettings;
};
