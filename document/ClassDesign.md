# 「MySchedule」設計書
## 型設計
[types.ts](../src/utils/types.ts)を参照。

## クラス設計
### Class: Application
`Application` クラスは、アプリケーションの動作を管理するためのクラスです。

#### Properties
* `private appUser: AppUser`
`AppUser` インスタンスを格納するためのプライベートフィールドです。

#### Constructor
* `Application` クラスは、コンストラクターで引数を受け取る必要はありません。

#### Methods
* `public run(): void`
アプリケーションを起動するためのパブリックメソッドです。
`initializeFirebase()`、`redirect()`、`createPage()` の各メソッドを順番に呼び出します。

* `private initializeFirebase(): void`
Firebase を初期化するためのプライベートメソッドです。
`FirebaseInitializer` インスタンスを生成して、initialize() メソッドを呼び出します。

* `private redirect(): void`
ユーザーの認証状態に応じて、正しいページにリダイレクトするためのプライベートメソッドです。
`AppUser` インスタンスを生成して、`redirect()` メソッドを呼び出します。

* `private createPage(): void`
ページを作成するためのプライベートメソッドです。
`PageUtils` インスタンスを生成して、`createPage()` メソッドを呼び出します。

### Class: FirebaseInitializer
`FirebaseInitializer` クラスは、Firebase を初期化するためのクラスです。

#### Properties
* `private readonly defaultConfig: object`
Firebase のデフォルト設定を格納するためのプライベートフィールドです。

* `private firebaseConfig: object`
Firebase の設定を格納するためのプライベートフィールドです。

* `private app: FirebaseApp`
`FirebaseApp` オブジェクトを格納するためのプライベートフィールドです。

* `private analytics: Analytics`
`Analytics` オブジェクトを格納するためのプライベートフィールドです。

#### Constructor
* `constructor(config?: object)`
Firebase の設定を引数で受け取り、初期化するためのコンストラクタです。
引数が指定されなかった場合は、デフォルト設定 `defaultConfig` を使用します。

#### Methods
* `public initialize(): void`
Firebase を初期化するためのパブリックメソッドです。
`initializeApp()`、`getAnalytics()` の各メソッドを呼び出し、`FirebaseApp` インスタンスと `Analytics` インスタンスを生成します。

### Class: AppUser
`AppUser` クラスは、Firebaseのユーザー認証などを行うためのクラスです。

#### Properties
* `private uid: string`
Firebaseによる一意なユーザーIDを格納するプライベートフィールドです。
* `private userInfo: UserInfo`
string型の `email` と `password` プロパティを保有するオブジェクト型である `UserInfo` 型のプライベートフィールドです。
ユーザー認証に必要な、ユーザー情報のデータを格納します。

#### Constructor
* `AppUser` クラスは、コンストラクターで引数を受け取る必要はありません。

#### Methods
* `public setUserInfo(email: string, password: string): void`
`userInfo` フィールドにプロパティを代入するメソッドです。
引数に `email` と `password` を受け取り、 `userInfo` フィールドに格納されたオブジェクトのプロパティにそれぞれ代入します。

* `public async assignUserInfo():Promise<void>`
ユーザーの認証情報を取得して `uid` と `userInfo.email` をフィールドに代入するメソッドです。
キャッシュに保存されたログイン状態を読み込んでログインした場合、 `email` などがユーザー側から入力されないため、認証情報から取得する必要があります。

* `public async getAuthState():Promise<User | null>`
ユーザーの認証情報を取得するメソッドです。主に条件分岐に使用するメソッドです。
ユーザーが認証状態でない場合はnull値が返ります。
ユーザーが認証状態の場合は、Firebaseで設定された、uidやemailなどが格納されたUserオブジェクトが返ります。

* `public async redirect():Promise<void>`
認証状態に合わせて正しいページにリダイレクトするメソッドです。
認証状態でないならログインページに、認証状態ならカレンダーページに遷移させます。

* `public async signUp(redirectLink?: string):Promise<void>`
`userInfo` フィールドのプロパティを元に、ユーザー登録するメソッドです。
`setUserInfo` メソッドを実行する前に、初期値のまま `signUp` メソッドを実行した場合、エラーを返します。
`redirectLink` プロパティを受け取っている場合は、サインアップ後に、`redirectLink` プロパティで指定されたURLに遷移します。

* `public async signIn(redirectLink?: string):Promise<void>`
`userInfo` フィールドのプロパティを元に、ログインするメソッドです。
`setUserInfo` メソッドを実行する前に、初期値のまま `signUp` メソッドを実行した場合、エラーを返します。
`redirectLink` プロパティを受け取っている場合は、サインアップ後に、`redirectLink` プロパティで指定されたURLに遷移します。

* `public async signOut(redirectLink?: string):Promise<void>`
ログアウトするメソッドです。
`redirectLink` プロパティを受け取っている場合は、ログアウト後に、`redirectLink` プロパティで指定されたURLに遷移します。

* `public resetEmail(email: string): void`
パスワードをリセットするメソッドです。
ユーザーがログイン時にパスワードを忘れてログインできない場合に使用します。
ユーザーにはアカウントのメールアドレスを要求し、受け取ったメールアドレス宛にパスワードリセットのメールを送信します。

### Class: DbController
`DbController` クラスは、Firebaseからのデータを扱うためのクラスです。

#### Properties
* `protected readonly baseDbUrl: string`
Firebase Realtime DatabaseのベースとなるURLを表すフィールドです。
"https://myapp-rtdb.firebaseio.com" のような文字列が代入されます。

#### Constructor
* `DbController` クラスは、コンストラクターで引数を受け取る必要はありません。

#### Methods
* `protected buildUrl(uid: string, resource: string, id?: string): string`
ベースURL、ユーザーID、リソース名、データのIDを組み合わせて、クエリパラメータを除いた完全なURLを生成するパブリックメソッドです。
引数のresourceにはリソース名(taskやeventなど)を指定し、idにはデータの一意キーを指定します。
IDを指定しない場合はリソース名だけでURLを生成します。
戻り値としてデータベースへの完全なURLを返します。

* `protected async createData(url: string, data: object): Promise<void>`
データベースにデータを作成するパブリックメソッドです。
`url` パラメータには、クエリパラメータを除いたデータベースの完全なURLを指定します。
object型の `data` パラメータを受け取り、受け取ったデータをデータベースに作成します。
ただし、firebaseが自動で一意キーとなるidを作成し、その子ノードにデータが格納されることに注意してください。

* `protected async readData(url: string): Promise<object>`
データベースからデータを読み出すパブリックメソッドです。
`url` パラメータには、クエリパラメータを除いたデータベースの完全なURLを指定します。
object型のデータを返します。

* `protected async readDataByTag(url: string, tag: string, value: string): Promise<object>`
指定された一致条件でデータを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
`url` パラメータには、クエリパラメータを除いたデータベースの完全なURLを指定します。
指定された `tag` パラメータと一致する `value` の値を持つ、object型のデータを返します。

* `protected async readDataByRange(url: string, tag: string, startAt: string, endAt: string): Promise<object>`
指定された範囲条件でデータを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
`url` パラメータには、クエリパラメータを除いたデータベースの完全なURLを指定します。
指定された `tag` パラメータが `startAt` パラメータと `endAt` パラメータの間に収まる、object型のデータを返します。
`startAt`や`endAt`に空文字列を受け取った場合は、その部分のクエリ文字列を作成しません。

* `protected async overrideData(url: string, data: object): Promise<void>`
データベースのデータを上書きするパブリックメソッドです。
`url` パラメータには、クエリパラメータを除いたデータベースの完全なURLを指定します。
object型の `data` パラメータを受け取り、データベース上のデータを、受け取った`data`で上書きします。

* `protected async updateData(url: string, data: object): Promise<void>`
データベースのデータを部分的に更新するパブリックメソッドです。
`url` パラメータには、クエリパラメータを除いたデータベースの完全なURLを指定します。
object型の `data` パラメータを受け取り、データベース上のデータの`data`と一致する部分のみを、受け取った`data`で部分的に上書きします。

* `protected async deleteData(url: string): Promise<void>`
データベースからデータを削除するパブリックメソッドです。
`url` パラメータには、クエリパラメータを除いたデータベースの完全なURLを指定します。
URLで指定されたデータベース上のデータを削除します。

### Class: TimetableDbController
`TimetableDbController` クラスは、Firebaseからの時間割データを扱うためのクラスです。
`DbController` クラスを継承して作成されます。

#### Properties
* `protected readonly baseDbUrl: string`
親クラスのフィールドです。

* `private uid: string`
データベースのユーザーの一意キーを表す文字列型のプライベートフィールドです。
コンストラクターで初期化されます。

* `private readonly resource: string`
このクラスが扱うリソース名を表すフィールドです。
"timetable/timetables" のような文字列が代入されます。

#### Constructor
* `constructor(uid: string)`
ユーザーIDを表す `uid` パラメータを引数で受け取り、`uid` フィールドを初期化するためのコンストラクタです。

#### Methods
* `protected buildUrl(uid: string, resource: string, id?: string): string`
親クラスのメソッドです。オーバーライドはありません。

* `public async createTimetable(data: Timetable): Promise<void>`
データベースに時間割データを作成するパブリックメソッドです。
`createData()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を渡して、データベースへのURLを作成します。
そして、`createData()`メソッドの引数である、`url`パラメータに作成したURLを渡します。
`data`パラメータについては、このメソッドで受け取った`data`引数をそのまま`createData()`に渡します。

* `public async readTimetable(id?: string): Promise<Timetables|Timetable>`
データベースから時間割データを読み出すパブリックメソッドです。
`readData()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を渡して、データベースへのURLを作成します。引数`id`を受け取っているならそれも`buildUrl()`に渡してURLを作成します。
そして、`readData()`メソッドの引数である、`url`パラメータに作成したURLを渡します。
引数`id`を受け取っていない場合の戻り値は、`Timetables`型ではなく`Timetable`型になります。

* `public async readTimetableByTag(tag: string, value: string): Promise<Timetables>`
指定された一致条件で時間割データを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
`readDataByTag()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を渡して、データベースへのURLを作成します。
そして、`readDataByTag()`メソッドの引数`url`に作成したURLを渡します。
`tag`,`value`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま`readDataByTag()`に渡します。

* `public async readTimetableByRange(tag: string, startAt: string, endAt: string): Promise<Timetables>`
指定された範囲条件で時間割データを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
`readDataByRange()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を渡して、データベースへのURLを作成します。
そして、`readDataByRange()`メソッドの引数`url`に作成したURLを渡します。
`tag`,`startAt`,`endAt`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま`readDataByRange()`に渡します。

* `public async updateTimetable(data: Timetable, id: string): Promise<void>`
データベースの時間割データを更新するパブリックメソッドです。
`updateData()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を、`id`に引数で受け取った`id`を渡して、データベースへのURLを作成します。
そして、`updateData()`メソッドの引数`url`に作成したURLを渡します。引数`data`には、このメソッドで受け取った`data`を渡します。

* `public async deleteTimetable(id: string): Promise<void>`
データベースから時間割データを削除するパブリックメソッドです。
`deleteData()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を、`id`に引数で受け取った`id`を渡して、データベースへのURLを作成します。
そして、`deleteData()`メソッドの引数`url`に作成したURLを渡します。

### Class: TaskDbController
`TaskDbController` クラスは、Firebaseからの課題データを扱うためのクラスです。
`DbController` クラスを継承して作成されます。

#### Properties
* `protected readonly baseDbUrl: string`
親クラスのフィールドです。

* `private uid: string`
データベースのユーザーの一意キーを表す文字列型のプライベートフィールドです。
コンストラクターで初期化されます。

* `private readonly resource: string`
このクラスが扱うリソース名を表すフィールドです。
"task/tasks" のような文字列が代入されます。

#### Constructor
* `constructor(uid: string)`
ユーザーIDを表す `uid` パラメータを引数で受け取り、`uid` フィールドを初期化するためのコンストラクタです。

#### Methods
* `protected buildUrl(uid: string, resource: string, id?: string): string`
親クラスのメソッドです。オーバーライドはありません。

* `public async createTask(data: Task): Promise<void>`
データベースに課題データを作成するパブリックメソッドです。
`createData()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を渡して、データベースへのURLを作成します。
そして、`createData()`メソッドの引数である、`url`パラメータに作成したURLを渡します。
`data`パラメータについては、このメソッドで受け取った`data`引数をそのまま`createData()`に渡します。

* `public async readTask(id?: string): Promise<Tasks|Task>`
データベースから課題データを読み出すパブリックメソッドです。
`readData()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を渡して、データベースへのURLを作成します。引数`id`を受け取っているならそれも`buildUrl()`に渡してURLを作成します。
そして、`readData()`メソッドの引数である、`url`パラメータに作成したURLを渡します。
引数`id`を受け取っていない場合の戻り値は、`Tasks`型ではなく`Task`型になります。

* `public async readTaskByTag(tag: string, value: string): Promise<Tasks>`
指定された一致条件で課題データを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
`readDataByTag()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を渡して、データベースへのURLを作成します。
そして、`readDataByTag()`メソッドの引数`url`に作成したURLを渡します。
`tag`,`value`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま`readDataByTag()`に渡します。

* `public async readTaskByRange(tag: string, startAt: string, endAt: string): Promise<Tasks>`
指定された範囲条件で課題データを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
`readDataByRange()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を渡して、データベースへのURLを作成します。
そして、`readDataByRange()`メソッドの引数`url`に作成したURLを渡します。
`tag`,`startAt`,`endAt`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま`readDataByRange()`に渡します。

* `public async updateTask(data: Task, id: string): Promise<void>`
データベースの課題データを更新するパブリックメソッドです。
`updateData()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を、`id`に引数で受け取った`id`を渡して、データベースへのURLを作成します。
そして、`updateData()`メソッドの引数`url`に作成したURLを渡します。引数`data`には、このメソッドで受け取った`data`を渡します。

* `public async deleteTask(id: string): Promise<void>`
データベースから課題データを削除するパブリックメソッドです。
`deleteData()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を、`id`に引数で受け取った`id`を渡して、データベースへのURLを作成します。
そして、`deleteData()`メソッドの引数`url`に作成したURLを渡します。



### Class: TaskSettingsDbController
`TaskSettingsDbController` クラスは、Firebaseからの課題の設定データを扱うためのクラスです。
`DbController` クラスを継承して作成されます。

#### Properties
* `protected readonly baseDbUrl: string`
親クラスのフィールドです。

* `private readonly resource: string`
このクラスが扱うリソース名を表すフィールドです。
"task/taskSettings" のような文字列が代入されます。

* `private uid: string`
データベースのユーザーの一意キーを表す文字列型のプライベートフィールドです。
コンストラクターで初期化されます。

#### Constructor
* `constructor(uid: string)`
`uid` フィールドを初期化するためのコンストラクタです。
ユーザーIDを表す `uid` パラメータを引数で受け取り、`uid`フィールドを初期化します。

#### Methods
* `public async createData(url: string, data: object): Promise<void>`
* `protected async readData(url: string): Promise<object>`
* `protected async readDataByTag(url: string, tag: string, value: string): Promise<object>`
* `protected async readDataByRange(url: string, tag: string, startAt: string, endAt: string): Promise<object>`
* `protected async overrideData(url: string, data: object): Promise<void>`
* `protected async updateData(url: string, data: object): Promise<void>`
* `protected async deleteData(url: string): Promise<void>`
親クラスのメソッドです。オーバーライドはありません。

* `public async getEnabledAlert(): Promise<boolean>`
課題の期限が迫ったらメールで通知するかどうかを表すプロパティ`enabledAlert`の値を、データベースの`taskSettings`から取得するメソッドです。
まず、このクラスのプライベートフィールド`resource`に`"/enabledAlert"`という文字列を結合させた文字列を作成します。
そして、作成した文字列を`buildUrl()`メソッドの`resource`引数に渡し、`uid`フィールドを`uid`引数に渡すことで、
データベースの`enabledAlert`プロパティにアクセスするための完全なURLを文字列型で作成します。"https://myapp-rtdb.firebaseio.com/user/${uid}/task/taskSettings/enabledAlert.json"のような文字列が作成されます。
そして最後に、`readData()`メソッドの`url`引数に作成したURLを渡し、
`readData()`メソッドを呼び出して取得した戻り値を、そのままこのメソッドの戻り値として返します。
ただし、データベースにデータが存在しなかった場合は、初期値として`true`を返します。

* `public async setEnabledAlert(enabledAlert: boolean): Promise<void>`
課題の期限が迫ったらメールで通知するかどうかを表すデータベース上のプロパティ`enabledAlert`の値を、引数で上書きするメソッドです。
まず、このクラスのプライベートフィールド`resource`に`"/enabledAlert"`という文字列を結合させた文字列を作成します。
そして、作成した文字列を`buildUrl()`メソッドの`resource`引数に渡し、`uid`フィールドを`uid`引数に渡すことで、
データベースの`enabledAlert`プロパティにアクセスするための完全なURLを文字列型で作成します。"https://myapp-rtdb.firebaseio.com/user/${uid}/task/taskSettings/enabledAlert.json"のような文字列が作成されます。
次に、`enableAlert`のみをキーに持つオブジェクトを作成し、`enableAlert`の値にはこのメソッドの引数で受け取った論理型の値を代入します。
そして最後に、`updateData()`メソッドの`url`引数に作成したURLを渡し、`data`引数に作成したオブジェクトを渡して呼び出します。

* `public async getDaysBeforeDeadline(): Promise<number>`
何日前に提出期限間近の課題のアラートを行うかを表すプロパティ`daysBeforeDeadline`の値を、データベースの`taskSettings`から取得するメソッドです。
まず、このクラスのプライベートフィールド`resource`に`"/daysBeforeDeadline"`という文字列を結合させた文字列を作成します。
そして、作成した文字列を`buildUrl()`メソッドの`resource`引数に渡し、`uid`フィールドを`uid`引数に渡すことで、
データベースの`daysBeforeDeadline`プロパティにアクセスするための完全なURLを文字列型で作成します。"https://myapp-rtdb.firebaseio.com/user/${uid}/task/taskSettings/daysBeforeDeadline.json"のような文字列が作成されます。
そして最後に、`readData()`メソッドの`url`引数に作成したURLを渡し、、
`readData()`メソッドを呼び出して取得した戻り値を、そのままこのメソッドの戻り値として返します。
ただし、データベースにデータが存在しなかった場合は、初期値として`3`を返します。

* `public async setDaysBeforeDeadline(daysBeforeDeadline: number): Promise<void>`
何日前に提出期限間近の課題のアラートを行うかを表すデータベース上のプロパティ`daysBeforeDeadline`の値を、引数で上書きするメソッドです。
まず、このクラスのプライベートフィールド`resource`に`"/daysBeforeDeadline"`という文字列を結合させた文字列を作成します。
そして、作成した文字列を`buildUrl()`メソッドの`resource`引数に渡し、`uid`フィールドを`uid`引数に渡すことで、
データベースの`daysBeforeDeadline`プロパティにアクセスするための完全なURLを文字列型で作成します。"https://myapp-rtdb.firebaseio.com/user/${uid}/task/taskSettings/daysBeforeDeadline.json"のような文字列が作成されます。
次に、`daysBeforeDeadline`のみをキーに持つオブジェクトを作成し、`daysBeforeDeadline`の値にはこのメソッドの引数で受け取った数値型の値を代入します。
そして最後に、`updateData()`メソッドの`url`引数に作成したURLを渡し、`data`引数に作成したオブジェクトを渡して呼び出します。

* `public async getAutoTaskDelete(): Promise<boolean>`
課題の期限が過ぎたら課題データを自動で削除するどうかを表すプロパティ`autoTaskDelete`の値を、データベースの`taskSettings`から取得するメソッドです。
まず、このクラスのプライベートフィールド`resource`に`"/autoTaskDelete"`という文字列を結合させた文字列を作成します。
そして、作成した文字列を`buildUrl()`メソッドの`resource`引数に渡し、`uid`フィールドを`uid`引数に渡すことで、
データベースの`autoTaskDelete`プロパティにアクセスするための完全なURLを文字列型で作成します。"https://myapp-rtdb.firebaseio.com/user/${uid}/task/taskSettings/autoTaskDelete.json"のような文字列が作成されます。
そして最後に、`readData()`メソッドの`url`引数に作成したURLを渡し、
`readData()`メソッドを呼び出して取得した戻り値を、そのままこのメソッドの戻り値として返します。
ただし、データベースにデータが存在しなかった場合は、初期値として`false`を返します。

* `public async setAutoTaskDelete(autoTaskDelete: boolean): Promise<void>`
課題の期限が過ぎたら課題データを自動で削除するどうかを表すデータベース上のプロパティ`autoTaskDelete`の値を、引数で上書きするメソッドです。
まず、このクラスのプライベートフィールド`resource`に`"/autoTaskDelete"`という文字列を結合させた文字列を作成します。
そして、作成した文字列を`buildUrl()`メソッドの`resource`引数に渡し、`uid`フィールドを`uid`引数に渡すことで、
データベースの`autoTaskDelete`プロパティにアクセスするための完全なURLを文字列型で作成します。"https://myapp-rtdb.firebaseio.com/user/${uid}/task/taskSettings/enabledAlert.json"のような文字列が作成されます。
次に、`autoTaskDelete`のみをキーに持つオブジェクトを作成し、`autoTaskDelete`の値にはこのメソッドの引数で受け取った論理型の値を代入します。
そして最後に、`updateData()`メソッドの`url`引数に作成したURLを渡し、`data`引数に作成したオブジェクトを渡して呼び出します。



### Class: ShiftDbController
`ShiftDbController` クラスは、Firebaseからのアルバイトシフトデータを扱うためのクラスです。
`DbController` クラスを継承して作成されます。

#### Properties
* `protected readonly baseDbUrl: string`
親クラスのフィールドです。

* `private uid: string`
データベースのユーザーの一意キーを表す文字列型のプライベートフィールドです。
コンストラクターで初期化されます。

* `private readonly resource: string`
このクラスが扱うリソース名を表すフィールドです。
"shift/shifts" のような文字列が代入されます。

#### Constructor
* `constructor(uid: string)`
ユーザーIDを表す `uid` パラメータを引数で受け取り、`uid` フィールドを初期化するためのコンストラクタです。

#### Methods
* `protected buildUrl(uid: string, resource: string, id?: string): string`
親クラスのメソッドです。オーバーライドはありません。

* `public async createShift(data: Shift): Promise<void>`
データベースにアルバイトシフトデータを作成するパブリックメソッドです。
`createData()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を渡して、データベースへのURLを作成します。
そして、`createData()`メソッドの引数である、`url`パラメータに作成したURLを渡します。
`data`パラメータについては、このメソッドで受け取った`data`引数をそのまま`createData()`に渡します。

* `public async readShift(id?: string): Promise<Shifts|Shift>`
データベースからアルバイトシフトデータを読み出すパブリックメソッドです。
`readData()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を渡して、データベースへのURLを作成します。引数`id`を受け取っているならそれも`buildUrl()`に渡してURLを作成します。
そして、`readData()`メソッドの引数である、`url`パラメータに作成したURLを渡します。
引数`id`を受け取っていない場合の戻り値は、`Shifts`型ではなく`Shift`型になります。

* `public async readShiftByTag(tag: string, value: string): Promise<Shifts>`
指定された一致条件でアルバイトシフトデータを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
`readDataByTag()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を渡して、データベースへのURLを作成します。
そして、`readDataByTag()`メソッドの引数`url`に作成したURLを渡します。
`tag`,`value`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま`readDataByTag()`に渡します。

* `public async readShiftByRange(tag: string, startAt: string, endAt: string): Promise<Shifts>`
指定された範囲条件でアルバイトシフトデータを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
`readDataByRange()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を渡して、データベースへのURLを作成します。
そして、`readDataByRange()`メソッドの引数`url`に作成したURLを渡します。
`tag`,`startAt`,`endAt`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま`readDataByRange()`に渡します。

* `public async updateShift(data: Shift, id: string): Promise<void>`
データベースのアルバイトシフトデータを更新するパブリックメソッドです。
`updateData()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を、`id`に引数で受け取った`id`を渡して、データベースへのURLを作成します。
そして、`updateData()`メソッドの引数`url`に作成したURLを渡します。引数`data`には、このメソッドで受け取った`data`を渡します。

* `public async deleteShift(id: string): Promise<void>`
データベースからアルバイトシフトデータを削除するパブリックメソッドです。
`deleteData()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を、`id`に引数で受け取った`id`を渡して、データベースへのURLを作成します。
そして、`deleteData()`メソッドの引数`url`に作成したURLを渡します。



### Class: EventDbController
`EventDbController` クラスは、Firebaseからの予定データを扱うためのクラスです。
`DbController` クラスを継承して作成されます。

#### Properties
* `protected readonly baseDbUrl: string`
親クラスのフィールドです。

* `private uid: string`
データベースのユーザーの一意キーを表す文字列型のプライベートフィールドです。
コンストラクターで初期化されます。

* `private readonly resource: string`
このクラスが扱うリソース名を表すフィールドです。
"event/events" のような文字列が代入されます。

#### Constructor
* `constructor(uid: string)`
ユーザーIDを表す `uid` パラメータを引数で受け取り、`uid` フィールドを初期化するためのコンストラクタです。

#### Methods
* `protected buildUrl(uid: string, resource: string, id?: string): string`
親クラスのメソッドです。オーバーライドはありません。

* `public async createEvent(data: Event): Promise<void>`
データベースに予定データを作成するパブリックメソッドです。
`createData()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を渡して、データベースへのURLを作成します。
そして、`createData()`メソッドの引数である、`url`パラメータに作成したURLを渡します。
`data`パラメータについては、このメソッドで受け取った`data`引数をそのまま親クラスの`createData()`に渡します。

* `public async readEvent(id?: string): Promise<Events|Event>`
データベースから予定データを読み出すパブリックメソッドです。
`readData()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を渡して、データベースへのURLを作成します。引数`id`を受け取っているならそれも`buildUrl()`に渡してURLを作成します。
そして、`readData()`メソッドの引数である、`url`パラメータに作成したURLを渡します。
引数`id`を受け取っていない場合の戻り値は、`Events`型ではなく`Event`型になります。

* `public async readEventByTag(tag: string, value: string): Promise<Events>`
指定された一致条件で予定データを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
`readDataByTag()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を渡して、データベースへのURLを作成します。
そして、`readEventByTag()`メソッドの引数`url`に作成したURLを渡します。
`tag`,`value`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま`readDataByTag()`に渡します。

* `public async readEventByRange(tag: string, startAt: string, endAt: string): Promise<Events>`
指定された範囲条件で予定データを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
`readDataByRange()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を渡して、データベースへのURLを作成します。
そして、`readDataByRange()`メソッドの引数`url`に作成したURLを渡します。
`tag`,`startAt`,`endAt`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま`readDataByRange()`に渡します。

* `public async updateEvent(data: Event, id: string): Promise<void>`
データベースの予定データを更新するパブリックメソッドです。
`updateData()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を、`id`に引数で受け取った`id`を渡して、データベースへのURLを作成します。
そして、`updateData()`メソッドの引数`url`に作成したURLを渡します。引数`data`には、このメソッドで受け取った`data`を渡します。

* `public async deleteEven(id: string): Promise<void>`
データベースから予定データを削除するパブリックメソッドです。
`deleteData()`メソッドを呼び出すことによって操作を行います。
まず、`buildUrl()`メソッドの`uid`,`resource`に自身のフィールドの`uid`,`resource`を、`id`に引数で受け取った`id`を渡して、データベースへのURLを作成します。
そして、`deleteData()`メソッドの引数`url`に作成したURLを渡します。



### Class: EventSettingsDbController
`EventSettingsDbController` クラスは、Firebaseからの予定の設定データを扱うためのクラスです。
`DbController` クラスを継承して作成されます。

#### Properties
* `protected readonly baseDbUrl: string`
親クラスのフィールドです。

* `private readonly resource: string`
このクラスが扱うリソース名を表すフィールドです。
"event/eventSettings" のような文字列が代入されます。

* `private uid: string`
データベースのユーザーの一意キーを表す文字列型のプライベートフィールドです。
コンストラクターで初期化されます。

#### Constructor
* `constructor(uid: string)`
`uid` フィールドを初期化するためのコンストラクタです。
ユーザーIDを表す `uid` パラメータを引数で受け取り、`uid`フィールドを初期化します。

#### Methods
* `public async createData(url: string, data: object): Promise<void>`
* `protected async readData(url: string): Promise<object>`
* `protected async readDataByTag(url: string, tag: string, value: string): Promise<object>`
* `protected async readDataByRange(url: string, tag: string, startAt: string, endAt: string): Promise<object>`
* `protected async updateData(url: string, data: object): Promise<void>`
* `protected async deleteData(url: string): Promise<void>`
親クラスのメソッドです。オーバーライドはありません。

* `public async getHidePassedEvent(): Promise<boolean>`
課題の期限が迫ったらメールで通知するかどうかを表すプロパティ`hidePassedEvent`の値を、データベースの`taskSettings`から取得するメソッドです。
まず、このクラスのプライベートフィールド`resource`に`"/hidePassedEvent"`という文字列を結合させた文字列を作成します。
そして、作成した文字列を`buildUrl()`メソッドの`resource`引数に渡し、`uid`フィールドを`uid`引数に渡すことで、
データベースの`hidePassedEvent`プロパティにアクセスするための完全なURLを文字列型で作成します。"https://myapp-rtdb.firebaseio.com/user/${uid}/event/eventSettings/hidePassedEvent.json"のような文字列が作成されます。
そして最後に、親クラスの`readData()`メソッドの`url`引数に作成したURLを渡し、
`readData()`メソッドを呼び出して取得した戻り値を、そのままこのメソッドの戻り値として返します。
ただし、データベースにデータが存在しなかった場合は、初期値として`false`を返します。

* `public async setHidePassedEvent(hidePassedEvent: boolean): Promise<void>`
課題の期限が迫ったらメールで通知するかどうかを表すデータベース上のプロパティ`hidePassedEvent`の値を、引数で上書きするメソッドです。
まず、このクラスのプライベートフィールド`resource`に`"/hidePassedEvent"`という文字列を結合させた文字列を作成します。
そして、作成した文字列を`buildUrl()`メソッドの`resource`引数に渡し、`uid`フィールドを`uid`引数に渡すことで、
データベースの`hidePassedEvent`プロパティにアクセスするための完全なURLを文字列型で作成します。"https://myapp-rtdb.firebaseio.com/user/${uid}/task/taskSettings/hidePassedEvent.json"のような文字列が作成されます。
次に、`hidePassedEvent`のみをキーに持つオブジェクトを作成し、`hidePassedEvent`の値にはこのメソッドの引数で受け取った論理型の値を代入します。
そして最後に、親クラスの`updateData()`メソッドの`url`引数に作成したURLを渡し、`data`引数に作成したオブジェクトを渡して呼び出します。



### Class: DomUtils
`DomUtils` クラスは、HTML要素を扱うためのクラスです。
基本的に静的メソッドのみ使用するため、このクラスをインスタンス化することはありません。

#### Properties
* `private parentElement: HTMLElement`
このクラスが扱う親要素が格納されるプライベートフィールドです。
このクラスの静的メソッド以外で使用します。

#### Constructor
* `constructor(parentElement: HTMLElement)`
コンストラクターの引数として`parentElement`プロパティを受け取り、自身の`parentElement` フィールドに代入して初期化します。

#### Methods
* `public static createElement(tagName: keyof HTMLElementTagNameMap, className?: string|string[], innerText?: string): HTMLElement`
HTML要素を作成するための静的メソッドです。
tagNameには要素のタグ名を文字列型で渡します。
classNameには要素に付与するクラス名を文字列型で渡します。文字列型配列で渡すと、作成する要素に複数のクラス名を付与できます。
クラスを付与しない場合は、空文字列あるいは空配列を代入します。ただし、innerTextを指定しない場合にクラスを付与しない場合は、classNameにプロパティを渡す必要はありません。
innerTextには要素の中に入れるテキストを指定します。
最終的に、作成した要素をHTMLElement型で返します。
```html
<p class="text-start">Start aligned text on all viewport sizes.</p>
```
のような要素を作成するには、
```js
DomUtils.createElement("p","text-start","Start aligned text on all viewport sizes.")
```
のように指定します。

* `public static createImg(src: string, alt?: string, className?: string): HTMLImageElement`

* `public static appendChild(parent: HTMLElement, child: HTMLElement): void`
親要素に子要素を追加するメソッドです。
引数のparentには、子要素を追加するHTML要素を指定します。
引数のchildには、親要素に追加するHTML要素を指定します。
最終的に、parent要素にchild要素を追加します。
~~ appendChildメソッドはそもそもHTMLElementのメソッドとして用意されてるのでそっち使ってもいいです ~~

* `public static appendChildMultiple(parent: HTMLElement, children: HTMLElement[]): void`
親要素に複数の子要素を追加するメソッドです。
引数のparentには、子要素群を追加するHTML要素を指定します。
引数のchildには、親要素に追加する複数のHTML要素を配列型で指定します。
最終的に、parent要素に全てのchild要素を追加します。

* `public appendElement(tagName: keyof HTMLElementTagNameMap, className?: string|string[], innerText?: string): void`

* `public appendImg(src: string, alt?: string, className?: string): void`


### Interface: PageContent
`PageContent` は、ページのメインコンテンツを作成するためのインターフェースです。
ハンバーガーメニューや検索バーより下の、メインコンテンツ部分を作成します。

#### Properties
`PageContent` インターフェースには、プロパティは存在しません。

#### Methods
* `render(): HTMLElement[]`
ページのメインコンテンツの要素群を作成するメソッドです。
曜日欄やカレンダー欄などのHTML要素をまとめて配列に格納し、戻り値として出力します。

### Class: CalendarContent
`CalendarContent` クラスは、カレンダーページのメインコンテンツを作成するためのクラスです。
`PageContent` インターフェースを実装して作成するクラスです。
ハンバーガーメニューや検索バーより下の、メインコンテンツ部分を作成します。

#### Properties
`CalendarContent` クラスには、プロパティは存在しません。

#### Constructor
* `CalendarContent` クラスは、コンストラクターで引数を受け取る必要はありません。

#### Methods
* `public render(): HTMLElement[]`
カレンダーページのメインコンテンツの要素群を作成するパブリックメソッドです。
メインコンテンツ部分となる、曜日欄とカレンダー欄の合計二つのHTML要素を作成し、それらをまとめて配列に格納し、戻り値として出力します。
曜日欄の要素は`renderWeekday()`メソッドを呼び出すことで作成します。
カレンダー欄の要素は`renderCalendar()`メソッドを呼び出すことで作成します。

* `private renderWeekday(): HTMLElement`
曜日欄のHTML要素を作成するプライベートメソッドです。
`WeekdayColumn` クラスの `render()` メソッドを呼び出すことで曜日欄のHTML要素を作成します。
インスタンス化する際、コンストラクターの引数には、 `sun` や `mon` などの全てのパラメータが `true` になった `WeekDay` 型のオブジェクトを渡します。

* `private renderCalendar(): HTMLElement`
カレンダー欄のHTML要素を作成するプライベートメソッドです。
`CalendarColumn` クラスをインスタンス化し、
インスタンスから `render()` メソッドを呼び出すことで作成します。
インスタンス化の際には、`CalendarColumn` クラスのコンストラクターの引数である `year` と `month` に、Dateオブジェクトを利用して取得した現在の年と月を渡します。`enableTask`,`enableShift`,`enableEvent`には、全て`true`を渡します。

### Class: WeekdayColumn
カレンダーページや時間割ページの、曜日欄の要素を作成するためのクラスです。

#### Properties
* `private weekday: Weekday`
どの曜日が有効であるかを保管する`Weekday`型のオブジェクトが格納されるプライベートフィールドです。
Weekday型のオブジェクトには、`sun`,`mon`,`tue`などのキーに、論理型の値が格納されます。

#### Constructor
* `constructor(weekday: Weekday)`
`Weekday`型のプロパティ`weekday`を受け取り、受け取ったプロパティで自身のフィールド`weekday`を初期化します。

#### Methods
* `public render(): HTMLElement`
曜日欄のHTML要素を作成して戻り値として返すパブリックメソッドです。
`weekday`フィールドを参照し、キーが`true`になっている曜日を含んだ曜日欄を作成します。(`mon`が`true`なら月曜日を含んだ曜日欄を作成します)
また、日曜日と土曜日の要素を作成する際は、それぞれ文字色を赤色と青色に着色します。

### Class: CalendarColumn
`CalendarColumn` クラスは、カレンダーやアルバイトシフトページのカレンダー欄を作成するためのクラスです。

#### Properties
* `private year: number`
どの年のカレンダー欄を作成するのかを指定するためのプライベートフィールドです。
`month` フィールドと合わせて、データベースからデータを取得する際の、データの範囲指定で使用します。

* `private month: number`
どの月のカレンダー欄を作成するのかを指定するためのプライベートフィールドです。
`year` フィールドと合わせて、データベースからデータを取得する際の、データの範囲指定で使用します。

* `private tasks: Tasks | undefined`
課題のデータを格納するためのプライベートフィールドです。
`getTasks()` メソッドによりデータベースから受け取った課題のデータが代入されます。

* `private shifts: Shifts | undefined`
アルバイトシフトのデータを格納するためのプライベートフィールドです。
`getShifts()` メソッドによりデータベースから受け取ったアルバイトシフトのデータが代入されます。

* `private events: Events | undefined`
予定のデータを格納するためのプライベートフィールドです。
`getEvents()` メソッドによりデータベースから受け取った予定のデータが代入されます。

* `private taskCards: HTMLElement[] | undefined`
課題カードの要素を格納するためのプライベートフィールドです。
`render()` メソッドで作成したカードの要素が格納されます。`hideCard()`メソッドで使用します。

* `private shiftCards: HTMLElement[] | undefined`
アルバイトシフトカードの要素を格納するためのプライベートフィールドです。
`render()` メソッドで作成したカードの要素が格納されます。`hideCard()`メソッドで使用します。

* `private eventCards: HTMLElement[] | undefined`
予定カードの要素を格納するためのプライベートフィールドです。
`render()` メソッドで作成したカードの要素が格納されます。`hideCard()`メソッドで使用します。

#### Constructor
* `constructor(year: number, month: number, enableTask: boolean, enableShift: boolean, enableEvent: boolean)`
`year` パラメータと `month` パラメータを受け取り、自身の`year` フィールドと `month` フィールドをそれぞれ初期化します。
また、カレンダー欄にどのデータを表示するかを指定するboolean型のパラメータを引数で受け取り、必要に応じて自身のフィールドを初期化します。
`enableTask` パラメータがtrueの場合、 `getTasks()` メソッドの戻り値で `tasks` フィールドを初期化します。
`enableShift` パラメータがtrueの場合、 `getShifts()` メソッドの戻り値で `shifts` フィールドを初期化します。
`enableEvent` パラメータがtrueの場合、 `getEvents()` メソッドの戻り値で `events` フィールドを初期化します。

#### Methods
* `public render(): HTMLElement`
カレンダー欄のHTML要素を作成して戻り値として返すパブリックメソッドです。
カレンダー欄の中に入るデータとして、自身のフィールドである`tasks` `shifts` `events` の中から、値が未定義でないものを使用します。
それらのフィールドにデータが格納されている場合は、`CalendarCard`のコンストラクターの引数`cardType`にそれぞれ `task`, `shift`,`event`という文字列を渡して、データごとに(`events`に予定データが格納されているなら予定1つごとに)`data`引数に渡してインスタンス化します。
そして、インスタンスから`render()`メソッドを呼び出して、データを表すカードの要素をそれぞれ作成します。
作成したカードの要素は、プライベートフィールド`taskCards`,`shiftCards`,`eventCards`に格納しておきます。

* `public hideCard(enableTask: boolean, enableShift: boolean, enableEvent: boolean): void`
カレンダー欄の中に入っているデータを非表示にするメソッドです。
カレンダー欄の中に入っているデータを表すカードの要素をプライベートフィールド`taskCards`,`shiftCards`,`eventCards`から取得し、
それらのカードにの要素にhtmlの属性を付与・剥奪し、ユーザーが非表示にした種類のカードの表示・非表示を切り替えます。
ただし、コンストラクターの引数で有効にされなかった種類のデータについては、表示されることはありません。これは、最初からデータベースから取得されていないためです。

* `private getTasks(): Tasks`
データベースから課題のデータを配列型で取得するプライベートメソッドです。
`TaskDbController` クラスの `readDataByRange()` メソッドを呼び出して得られた、一か月分に絞り込まれた `Tasks` 型のデータを返します。
`readDataByRange()` の引数には、 `tag` には "deadline" を、 `startAt` と `endAt` にはそれぞれ `year` フィールドと `month` フィールドから算出した適切なデータを渡します。

* `private getShifts(): Shifts`
データベースからアルバイトシフトのデータを配列型で取得するプライベートメソッドです。
`ShiftDbController` クラスの `readData()` メソッドを呼び出して得られた、一か月分に絞り込まれた `Shifts` 型のデータを返します。
`readDataByRange()` の引数には、 `tag` には "startTime" を、 `startAt` と `endAt` にはそれぞれ `year` フィールドと `month` フィールドから算出した適切なデータを渡します。

* `private getEvents(): Events`
データベースから予定のデータを配列型で取得するプライベートメソッドです。
`EventDbController` クラスの `readData()` メソッドを呼び出して得られた、一か月分に絞り込まれた `Events` 型のデータを返します。
`readDataByRange()` の引数には、 `tag` には "startTime" を、 `startAt` と `endAt` にはそれぞれ `year` フィールドと `month` フィールドから算出した適切なデータを渡します。

### Class: TimetableContent
`TimetableContent` クラスは、時間割ページのメインコンテンツを作成するためのクラスです。
`PageContent` インターフェースを実装して作成するクラスです。
ハンバーガーメニューや検索バーより下の、メインコンテンツ部分を作成します。

#### Properties
* `TimetableContent` クラスは、フィールドを持ちません。

#### Constructor
* `TimetableContent` クラスは、コンストラクターで引数を受け取る必要はありません。

#### Methods
* `public render(): HTMLElement[]`
時間割ページのメインコンテンツの要素群を作成するパブリックメソッドです。
メインコンテンツ部分となる、曜日欄と時間割欄のHTML要素をそれぞれ作成し、作成した合計2つの要素を配列に格納し、戻り値として出力します。
曜日欄の要素は`renderWeekday()`メソッドを呼び出すことで作成します。
時間割欄の要素は`renderTimetable()`メソッドを呼び出すことで作成します。

* `private renderWeekday(): HTMLElement`
曜日欄のHTML要素を作成するプライベートメソッドです。
`WeekdayColumn` クラスの `render()` メソッドを呼び出すことで曜日欄のHTML要素を作成します。
インスタンス化する際、コンストラクターの引数には`sun`プロパティと`sat`プロパティのみfalseで、それ以外の5つのプロパティがtrueとなった`WeekDay`型のオブジェクトを渡します。
これは、時間割ページの曜日欄には日曜日と月曜日が存在しないためです。

* `private renderTimetable(): HTMLElement`
時間割欄のHTML要素を作成するプライベートメソッドです。
`TimetableColumn` クラスをインスタンス化し、
インスタンスから `render()` メソッドを呼び出すことで作成します。

### Class: TimetableColumn
`TimetableColumn` クラスは、時間割ページの時間割欄を作成するためのクラスです。

#### Properties
* `private timetables: Timetables`
時間割のデータを格納するためのプライベートフィールドです。
`getTimetables()` メソッドによりデータベースから受け取った時間割のデータが代入されます。

#### Constructor
* `TimetableColumn` クラスは、コンストラクターで引数を受け取る必要はありません。
`getTimetables()` メソッドを呼び出して得られた時間割のデータを `timetables` フィールドに代入し、初期化します。

#### Methods
* `public render(): HTMLElement`
時間割欄のHTML要素を作成して戻り値として返すパブリックメソッドです。
時間割欄の中に入るデータとして、自身のフィールドである`timetables` フィールドを使用します。
`TimetableCard` クラスを、データごとに(`timetables`に格納されている時間割の配列データの中身の値1つごとに)インスタンス化します。
コンストラクターには、`timetables`フィールドに格納されている時間割の配列データの中身の`Timetable`型オブジェクトを渡します。
そして、インスタンスから`render()`メソッドを呼び出して、データを表すカードの要素をそれぞれ作成します。
最後に、それぞれ作成したカードの要素を使用して、適切に要素を構成し、、その一番上の親要素を戻り値として返します。

* `private getTimetables(): Timetables`
データベースから時間割のデータを配列型で取得するプライベートメソッドです。
`TimetableDbController` クラスの `readData()` メソッドを呼び出して得られた `Timetables` 型のデータを返します。

### Class: TaskContent
`TaskContent` クラスは、課題ページのメインコンテンツを作成するためのクラスです。
`PageContent` インターフェースを実装して作成するクラスです。
ハンバーガーメニューや検索バーより下の、メインコンテンツ部分を作成します。

#### Properties
* `TaskContent` クラスは、フィールドを持ちません。

#### Constructor
* `TaskContent` クラスは、コンストラクターで引数を受け取る必要はありません。

#### Methods
* `public render(): HTMLElement[]`
課題ページのメインコンテンツの要素群を作成するパブリックメソッドです。
メインコンテンツ部分となる、課題欄のHTML要素を作成し、作成した合計1つの要素を配列に格納し、戻り値として出力します。
課題欄の要素は`renderTask()`メソッドを呼び出すことで作成します。

* `private renderTask(): HTMLElement`
課題欄のHTML要素を作成するプライベートメソッドです。
`CardListColumn` クラスに`"task"`文字列を渡してインスタンス化し、
インスタンスから `render()` メソッドを呼び出すことでHTML要素を作成します。

### Class: CardListColumn
`CardListColumn` クラスは、データが縦並びで表示されるページのデータ欄を作成するためのクラスです。
課題欄と予定欄で使用します。

#### Properties
* `private data: Tasks|Events`
データを格納するためのプライベートフィールドです。
`getTasks()` や`getEvents()`メソッドによりデータベースから受け取ったデータで初期化されます。

* `private columnType: "task"|"event"`
データ欄の種類を表すプライベートフィールドです。
コンストラクターで初期化されます。
データを表すカードの要素を作成するのに必要です。

#### Constructor
* `constructor(columnType: "task"|"event")`
`columnType`フィールドを受け取った`columnType`引数で初期化します。
また、`data`フィールドをデータベースから受け取ったデータで初期化します。
そのために、`columnType`が`"task"`なら`getTasks()`を、`"event"`なら`getEvents()`を呼び出し、
得られたデータを `data` フィールドに代入し、初期化します。

#### Methods
* `public render(): HTMLElement`
データ欄のHTML要素を作成して戻り値として返すパブリックメソッドです。
データ欄の中に入るデータとして、自身のフィールドである`data` フィールドを使用します。
`TandemCard` クラスを、データごとに(`data`に格納されている課題の配列データの中身の値1つごとに)インスタンス化します。
`TandemCard` クラスのコンストラクターは、`data`には、`data`フィールドに格納されている配列データの中身の`Task`あるいは`Event`型オブジェクトを渡します。`cardType`には自身の`columnType`フィールドを渡します。
そして、インスタンスから`render()`メソッドを呼び出して、データを表すカードの要素をそれぞれ作成します。
最後に、それぞれ作成したカードの要素を使用して、適切に要素を構成し、その一番上の親要素を戻り値として返します。

* `private getTasks(): Tasks`
データベースから課題割のデータを配列型で取得するプライベートメソッドです。
`TaskDbController` クラスの `readData()` メソッドを呼び出して得られた `Tasks` 型のデータを返します。

* `private getEvents(): Events`
データベースから予定のデータを配列型で取得するプライベートメソッドです。
`EventDbController` クラスの `readData()` メソッドを呼び出して得られた `Events` 型のデータを返します。


### Class: ShiftContent
`ShiftContent` クラスは、アルバイトシフトページのメインコンテンツを作成するためのクラスです。
`PageContent` インターフェースを実装して作成するクラスです。
ハンバーガーメニューや検索バーより下の、メインコンテンツ部分を作成します。

#### Properties
`ShiftContent` クラスには、プロパティは存在しません。

#### Constructor
* `ShiftContent` クラスは、コンストラクターで引数を受け取る必要はありません。

#### Methods
* `public render(): HTMLElement[]`
アルバイトシフトページのメインコンテンツの要素群を作成するパブリックメソッドです。
メインコンテンツ部分となる、曜日欄とアルバイトシフト欄の合計二つのHTML要素を作成し、それらをまとめて配列に格納し、戻り値として出力します。
曜日欄の要素は`renderWeekday()`メソッドを呼び出すことで作成します。
アルバイトシフト欄の要素は`renderShift()`メソッドを呼び出すことで作成します。

* `private renderWeekday(): HTMLElement`
曜日欄のHTML要素を作成するプライベートメソッドです。
`WeekdayColumn` クラスの `render()` メソッドを呼び出すことで曜日欄のHTML要素を作成します。
インスタンス化する際、コンストラクターの引数には、 `sun` や `mon` などの全てのパラメータが `true` になった `WeekDay` 型のオブジェクトを渡します。

* `private renderShift(): HTMLElement`
アルバイトシフト欄のHTML要素を作成するプライベートメソッドです。
`CalendarColumn` クラスをインスタンス化し、
インスタンスから `render()` メソッドを呼び出すことで作成します。
インスタンス化の際には、`CalendarColumn` クラスのコンストラクターの引数である `year` と `month` に、Dateオブジェクトを利用して取得した現在の年と月を渡します。`enableTask`,`enableShift`,`enableEvent`には、`enableShift`にのみ`true`を渡し、他には`false`を渡します。

### Class: EventContent
`EventContent` クラスは、予定ページのメインコンテンツを作成するためのクラスです。
`PageContent` インターフェースを実装して作成するクラスです。
ハンバーガーメニューや検索バーより下の、メインコンテンツ部分を作成します。

#### Properties
* `EventContent` クラスは、フィールドを持ちません。

#### Constructor
* `EventContent` クラスは、コンストラクターで引数を受け取る必要はありません。

#### Methods
* `public render(): HTMLElement[]`
予定ページのメインコンテンツの要素群を作成するパブリックメソッドです。
メインコンテンツ部分となる、予定欄のHTML要素を作成し、作成した合計1つの要素を配列に格納し、戻り値として出力します。
課題欄の要素は`renderEvent()`メソッドを呼び出すことで作成します。

* `private renderEvent(): HTMLElement`
予定欄のHTML要素を作成するプライベートメソッドです。
`CardListColumn` クラスに`"event"`文字列を渡してインスタンス化し、
インスタンスから `render()` メソッドを呼び出すことでHTML要素を作成します。

### Class: Card
<!-- TODO Cardの設計 -->

### Class: CalendarCard
カレンダーページ内のデータを表すカードを作成するためのクラスです。
Cardクラスを継承して作成します。

#### Properties
* `private id: string`
データの一意キーを表す文字列型プライベートフィールドです。
カレンダー内のデータのカードをクリックするとそのデータの詳細ページに遷移するのに必要です。

* `private title: string`
カードの中に入るテキストを表す文字列型プライベートフィールドです。

* `private cardType: "task"|"shift"|"event"`
カードの種類を表すプライベートフィールドです。

* `private bgColor: string`
カードの背景色を表す文字列型プライベートフィールドです。
CSSのクラスを設定します。

* `private readonly calenderCardClass: string`
カレンダーカード用のcssのクラスを表す読み取り専用プライベートフィールドです。

#### Constructor
* `constructor(cardType: "task"|"shift"|"event", id: string, title: string)`
`id`と`title`と`cardType`フィールドをコンストラクターで受け取った引数で初期化します。
`bgColor`フィールドには、受け取った引数`cardType`の値が`"task"`なら`"bg-task"`を、`"shift"`なら`"bg-shift"`を、`"event"`なら`"bg-event"`を代入して初期化します。

#### Methods
* `render(): HTMLElement`
カレンダー用カードの要素を作成するメソッドです。
要素には、`bgColor`フィールドと`calenderCardClass`フィールドで指定されたCSSのクラスを付与します。
要素のtextContentは`title`フィールドになるように作成します。
また、カードをクリックしたときに`cardOnClickEvent()`メソッドが実行されるような処理を、要素に適用します。

* `cardOnClickEvent(): void`
カードをクリックしたときの処理を代入するメソッドです。`render()`メソッド内で、カードに`cardOnClickEvent()`メソッドの処理を適用します。
このメソッドの処理としては、以下のような処理を実行します。
`cardType`と`id`フィールドを使用してデータを取得し、カードが表すデータの詳細ページに現在のページを挿げ替えます。
データの取得方法は、例えば`cardType`フィールドが`"task"`なら、`TaskDbController`クラスの`readTask()`メソッドの`id`引数に`id`フィールドを渡して取得します。
挿げ替え方法は、`tabBar`クラスの`changeTab()`メソッドを参考にしてください。<!-- TODO タブ切り替えの実装 -->

<!-- TODO CalendarCardの設計 -->

### Class: TandemCard
<!-- TODO TandemCardの設計 -->

### Class: TimetableCard
<!-- TODO TimetableCardの設計 -->

### Class: UiBarColumn
<!-- TODO UiBarColumnの設計 -->

### Class: CalendarUiBarColumn
<!-- TODO CalendarUiBarColumnの設計 -->

### Class: CardListUiBarColumn
<!-- TODO CardListUiBarColumnの設計 -->

### Class: MenuOverlay
<!-- TODO MenuOverlayの設計 -->

### Class: CalendarMenuOverlay
<!-- TODO CalendarMenuOverlayの設計 -->

### Class: TimetableMenuOverlay
<!-- TODO TimetableMenuOverlayの設計 -->

### Class: TaskMenuOverlay
<!-- TODO TaskMenuOverlayの設計 -->

### Class: ShiftMenuOverlay
<!-- TODO ShiftMenuOverlayの設計 -->

### Class: EventMenuOverlay
<!-- TODO EventMenuOverlayの設計 -->

### Class: ViewContent
<!-- TODO ViewContentの設計 -->

### Class: EditContent
<!-- TODO EditContentの設計 -->

## 完成済みのクラス
### Class: PageUtils
<!-- TODO PageUtilsの書き起こし -->

### Class: QueryUtils
<!-- TODO QueryUtilsの書き起こし -->

### Class: Header
<!-- TODO Headerの書き起こし -->

### Class: Content
<!-- TODO Contentの書き起こし -->

### Class: Footer
<!-- TODO Footerの書き起こし -->

### Class: WebPage
<!-- TODO WebPageの書き起こし -->

### Class: LoginContent
<!-- TODO LoginContentの書き起こし -->

### Class: RegisterContent
<!-- TODO RegisterContentの書き起こし -->

### Class: TabBar
<!-- TODO TabBarの書き起こし -->

### Class: Button
<!-- TODO Buttonの書き起こし -->

### Class: AddButton
<!-- TODO AddButtonの書き起こし・設計 -->

### Class: LogoutButton
<!-- TODO LogoutButtonの書き起こし -->

### Class: SubmitButton
<!-- TODO SubmitButtonの書き起こし -->

### Class: Form
<!-- TODO Formの書き起こし -->

### Class: LoginForm
<!-- TODO LoginFormの書き起こし -->

### Class: RegisterForm
<!-- TODO RegisterFormの書き起こし -->

### Class: Label
<!-- TODO Labelの書き起こし -->

### Class: Input
<!-- TODO Inputの書き起こし -->

### Class: PasswordInput
<!-- TODO PasswordInputの書き起こし -->

### Class: LabeledInput
<!-- TODO LabeledInputの書き起こし -->
