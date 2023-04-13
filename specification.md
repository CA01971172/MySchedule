# MySchedule
## 要件定義
「MySchedule」というWebアプリケーションは、スケジュールの管理を行うためのアプリケーションです。

主な機能としては、以下のようなものがあります。

1. 時間割管理機能
ユーザーが履修している講義の時間割を入力することができます。また、講義が変更になった場合には、簡単にスケジュールを修正することができます。

1. 課題管理機能
ユーザーが提出期限のある課題を入力することができます。提出期限が近づいた際には、アラート機能で通知が届くため、課題の締め切りを見落とすことがありません。

1. アルバイト管理機能
ユーザーがアルバイトのシフトを入力することができます。また、シフトが変更になった場合には、簡単にスケジュールを修正することができます。

1. 予定追加機能
ユーザーが自由に予定を追加することができます。授業以外の予定や、個人的な予定などを管理することができます。

1. カレンダー表示機能
各種スケジュールをカレンダー形式で表示することができます。また、週表示や月表示に切り替えることもできます。

1. デザイン性の高いUI
学生をターゲットとしているため、デザイン性の高いUIを採用し、使いやすく、視覚的にも分かりやすいアプリケーションを目指しました。

「MySchedule」は、大学生や専門学生、高校生など、学生をターゲットにしたスケジュール管理アプリケーションです。学生生活に必要なスケジュールを一元管理し、スムーズなスケジュール管理をサポートします。
## タスク
1. 時間割管理機能
    - データモデルの設計と実装
    - 時間割の入力フォームの作成
    - 入力された時間割の表示機能の実装
    - 時間割の編集機能の実装
    - 時間割の削除機能の実装
1. 課題管理機能
    - データモデルの設計と実装
    - 課題の入力フォームの作成
    - 入力された課題の表示機能の実装
    - 課題の編集機能の実装
    - 課題の削除機能の実装
    - アラート機能の実装
1. アルバイト管理機能
    - データモデルの設計と実装
    - アルバイトのシフト入力フォームの作成
    - 入力されたシフトの表示機能の実装
    - シフトの編集機能の実装
    - シフトの削除機能の実装
1. 予定追加機能
    - データモデルの設計と実装
    - 予定入力フォームの作成
    - 入力された予定の表示機能の実装
    - 予定の編集機能の実装
    - 予定の削除機能の実装
1. カレンダー表示機能
    - カレンダー表示用のUIの作成
    - 各種スケジュールのデータの統合処理
    - カレンダー表示機能の実装
1. その他ページ作成
    - ログインページのUIの作成
    - トップページのUIの作成
1. Firebase操作
    - CRUD操作の実装
    - ログイン機能の実装
    - メール送信機能の実装
1. デザイン性の高いUI
    - デザインの設計
    - CSSを用いたUIの実装
## 開発環境
- プログラミング言語  
Typescript
- その他言語  
HTML5,SCSS
- モジュールバンドラ  
Webpack
- データベース  
Firebase  
(JSON形式でデータ管理を行う)
- 公開方法  
Github Pages
### 補足
- SCSSについて  
scss記法については[こちら](https://webst8.com/blog/sass-scss/#SCSS)
## ディレクトリ
### ディレクトリ構造
```bash
├── src/
│   ├── scss/
│   │   └── style.scss               # 全体のスタイルシートのSCSS
│   ├── components/
│   │   ├── Timetable/
│   │   │   ├── TimetableForm.ts     # 時間割入力フォームのコンポーネント
│   │   │   └── TimetableList.ts     # 時間割一覧表示のコンポーネント
│   │   ├── Task/
│   │   │   ├── TaskForm.ts          # 課題入力フォームのコンポーネント
│   │   │   └── TaskList.ts          # 課題一覧表示のコンポーネント
│   │   ├── Shift/
│   │   │   ├── ShiftForm.ts         # アルバイトシフト入力フォームのコンポーネント
│   │   │   └── ShiftList.ts         # アルバイトシフト一覧表示のコンポーネント
│   │   └── Event/
│   │       ├── EventForm.ts         # 予定入力フォームのコンポーネント
│   │       └── EventForm.ts         # 予定一覧表示のコンポーネント
│   ├── containers/
│   │   ├── TimetableContainer.ts    # 時間割管理機能のコンテナ
│   │   ├── TaskContainer.ts         # 課題管理機能のコンテナ
│   │   ├── ShiftContainer.ts        # アルバイト管理機能のコンテナ
│   │   └── EventContainer.ts        # 予定管理機能のコンテナ
│   ├── pages/
│   │   ├── CalendarPage.ts          # カレンダーページのコンポーネント
│   │   ├── LoginPage.ts             # ログインページのコンポーネント
│   │   └── IndexPage.ts             # トップページのコンポーネント
│   ├── utils/
│   │   ├── api.ts                   # APIとの通信を行うためのユーティリティ
│   │   ├── domUtils.ts              # DOM 操作用のユーティリティ
│   │   ├── types.ts                 # 型定義
│   │   └── constants.ts             # アプリ全体で使用される定数
│   └── index.ts                     # アプリのエントリーポイント
├── dist/
│   ├── index.html                   # メインページのHTML
│   └── favicon.ico                  # アプリのアイコン
├── package.json                     # アプリの依存関係やスクリプトの定義
├── tsconfig.json                    # TypeScriptのコンパイル設定
└── webpack.config.js                # Webpackの設定
```
### 用語説明
- コンポーネント  
UI（ユーザーインターフェース）を構成する最小単位の部品であり、再利用性が高く、独立した機能を持つように設計されたクラスまたは関数のことを指します。

- コンテナ  
コンポーネントをまとめ、UI全体を構成するためのもので、通常は複数のコンポーネントを組み合わせたり、またはコンポーネントとロジックを組み合わせたりすることができます。

要するに、例えば時間割管理機能に焦点を当てると、  
TimetableForm.ts(時間割管理の入力プログラム)とTimetableList.ts(時間割管理の一覧表示プログラム)を作成して、  
それらを組み合わせて、TimetableContainer.tsを動作させることによって、  
時間割管理機能を実装していく形です。

ただし、トップページ,ログインページ,カレンダーページに関しては入力プログラムを作成する必要がないため、  
直接コンポーネントを用意する形となります。
## データベースのディレクトリ構造
### ディレクトリ構造
```bash
└── https://myschedule-c0a49-default-rtdb.firebaseio.com/
    └── users/
        ├── user0Id
        │   ├── timetable.json
        │   ├── task.json
        │   ├── shift.json
        │   └── event.json
        └── user1Id
            ├── timetable.json
            ├── task.json
            ├── shift.json
            └── event.json
```
### 補足
- データベース操作について  
データベース操作については、  
firebaseのメールアドレス認証を用いてuserのuidを取得し、  
ユーザーごとに作成したディレクトリ以下のjsonファイル(timetable.json,task.json,shift.json,event.json)それぞれに、  
api.tsよりDbControllerをインスタンス化してCRUD操作を行う。  
(timetable.jsonに対してはtimetable用のインスタンスを作成するなど)
- ユーザー操作について  
ユーザー操作については、  
api.tsよりUserをインスタンス化してログイン処理やメール送信等を行う。
## データベースのディレクトリ構造
### ディレクトリ構造
```bash
└── https://myschedule-c0a49-default-rtdb.firebaseio.com/
    └── users/
        ├── user0Id
        │   ├── timetable.json
        │   ├── task.json
        │   ├── shift.json
        │   └── event.json
        └── user1Id
            ├── timetable.json
            ├── task.json
            ├── shift.json
            └── event.json
```
### 補足
- データベース操作について  
データベース操作については、  
firebaseのメールアドレス認証を用いてuserのuidを取得し、  
ユーザーごとに作成したディレクトリ以下のjsonファイル(timetable.json,task.json,shift.json,event.json)それぞれに、  
api.tsよりDbControllerをインスタンス化してCRUD操作を行う。  
(timetable.jsonに対してはtimetable用のインスタンスを作成するなど)
## 設計の補足等
実装するクラスや関数の機能についての補足を行う。
- api.ts  
    - Fetch APIを用いたFirebaseとのCRUD操作
    - Firebaseによる、メールアドレスとパスワードを用いたユーザー認証
    - ユーザーのメールアドレスを用いたメール送信
- ユーザーの認証状態について
    - appUser.signIn()をしなくても、一度サインインをすれば認証状態が保持される  
    そのため、ユーザーの認証状態を確認し、認証状態でなければログインページにリダイレクトし、  
    ログインページでappUser.signIn()やappUser.signUp()を行うことになる。
- クエリ文字列(URLパラメータ)について
    - クエリ文字列とは
    例えば、基本のURLが「https://○△×□.jp/」だとして、  
    基本のURLにクエリ文字列（URLパラメーター）を加えると  「https://○△×□.jp/?●=▲×■&○=△×□」となります。 
    - 動的なページ結果の表示(アクティブパラメーター)
    今回のWebアプリにおいては、  
    パラメーターをつけ加えて、Webサイトの表示内容を変更するためにクエリ文字列を使用します。  
    (詳しいコードはdomUtils.tsのPageUtilsクラスを参照)  
    以下は、今回使用するクエリ文字列の例です
        - トップページ
        https://CA01971172.github.io/MySchedule/dist/index.html
        - ログインページ
        https://CA01971172.github.io/MySchedule/dist/index.html?page=login
        - 時間割管理ページ(一覧表示)
        https://CA01971172.github.io/MySchedule/dist/index.html?page=timetable
        - 時間割管理ページ(入力フォーム)
        https://CA01971172.github.io/MySchedule/dist/index.html?page=timetable&mode=edit