# 「MySchedule」データモデル設計書
## データモデル
```bash
└── https://myschedule-c0a49-default-rtdb.firebaseio.com/
    └── users/
        ├── ${uid} #ユーザーのid
        │   ├── timetable
        │   │   └── timeTables #時間割のデータ
        │   │       └── ${id} #一意キー(string)
        │   │           ├── title #授業名(string)
        │   │           ├── teacher #講師名(string)
        │   │           ├── classroom #使用教室(string)
        │   │           ├── startTime #開始時間(number)
        │   │           ├── endTime #終了時間(number)
        │   │           └── dayOfWeek #曜日(number)
        │   ├── task
        │   │   ├── tasks #課題のデータ
        │   │   │   └── ${id} #一意キー(string)
        │   │   │       ├── title #課題名(number)
        │   │   │       ├── description #課題の説明(string)
        │   │   │       └── deadline #課題の締切(number)
        │   │   └── taskSettings #課題の設定
        │   │       ├── enabledAlert #課題の提出期限が迫ったらアラートメールを送るかどうか(boolean)
        │   │       ├── daysBeforeDeadline #課題の提出期限の何日前にアラートするか(number)
        │   │       └── autoTaskDelete #提出期限の過ぎた課題データを自動で削除するかどうか(boolean)
        │   ├── shift
        │   │   └── shifts #アルバイトシフトのデータ
        │   │       └── ${id} #一意キー(string)
        │   │           ├── startTime #バイトの開始時間(number)
        │   │           ├── endTime #バイトの終了時間(number)
        │   │           └── breakTime #バイトの休憩時間(number)
        │   └── event
        │       ├── events #予定のデータ
        │       │   └── ${id} #一意キー(string)
        │       │       ├── title #予定名(string)
        │       │       ├── description #予定の説明(string)
        │       │       ├── startTime #予定の開始時間(number)
        │       │       ├── endTime #予定の終了時間(number)
        │       │       └── isAllDay #終日の予定かどうか(boolean)
        │       └── eventSettings #予定の設定
        │           └── hidePassedEvent #過去の予定を非表示にするかどうか(boolean)
        └── ${uid}
            ├── timetable
            ├── task
            ├── shift
            └── event