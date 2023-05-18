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

* `protected generateUniqueKey(): string`
タイムスタンプから一意キーを作成するメソッドです。

* `protected async createData(url: string, data: object): Promise<void>`
データベースにデータを作成するパブリックメソッドです。
`url` パラメータには、クエリパラメータを除いたデータベースの完全なURLを指定します。
object型の `data` パラメータを受け取り、受け取ったデータをデータベースに作成します。
ただし、データに `id` パラメータが付与されていない場合、タイムスタンプから一意キーを作成して `id` パラメータをデータに設定して作成します。

* `protected async readData(url: string, id?: string): Promise<object>`
データベースからデータを読み出すパブリックメソッドです。
`url` パラメータには、クエリパラメータを除いたデータベースの完全なURLを指定します。
object型のデータを返します。
`id` パラメータを受け取った場合は、 `readDataByTag()` メソッドを使用して、id(一意キー)でデータの絞り込みを行います。 `readDataByTag()` メソッドの引数には、`tag` には "id" という文字列を、 `value` には `readData()` メソッドの引数である `id` の値を渡します。
`id` パラメータを受け取らなかった場合は、全データを返します。

* `protected async readDataByTag(url: string, tag: string, value: string): Promise<object>`
指定された一致条件でデータを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
`url` パラメータには、クエリパラメータを除いたデータベースの完全なURLを指定します。
指定された `tag` パラメータと一致する `value` の値を持つ、object型のデータを返します。

* `protected async readDataByRange(url: string, tag: string, startAt: string, endAt: string): Promise<object>`
指定された範囲条件でデータを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
`url` パラメータには、クエリパラメータを除いたデータベースの完全なURLを指定します。
指定された `tag` パラメータが `startAt` パラメータと `endAt` パラメータの間に収まる、object型のデータを返します。

* `protected async updateData(url: string, data: object, id: string): Promise<void>`
データベースのデータを更新するパブリックメソッドです。
`url` パラメータには、クエリパラメータを除いたデータベースの完全なURLを指定します。
object型の `data` パラメータと、データの一意キーを表す `id` パラメータを受け取り、idが `id` と一致するデータを `data` パラメータのデータで上書きします。
idが `id` と一致するデータがない場合は `createData()` メソッドを呼び出し、データを上書きする代わりに新規作成します。
ただし、`data` パラメータに格納されたデータのidが `id` と一致しない場合は、エラーを返します。

* `protected async deleteData(url: string, id: string): Promise<void>`
データベースからデータを削除するパブリックメソッドです。
`url` パラメータには、クエリパラメータを除いたデータベースの完全なURLを指定します。
string型のidパラメータを受け取り、idが一致するデータを削除します。

### Class: TimetableDbController
`TimetableDbController` クラスは、Firebaseからの時間割データを扱うためのクラスです。
`DbController` クラスを継承して作成されます。

#### Properties
* `protected readonly baseDbUrl: string`
親クラスのフィールドです。

* `private readonly resource: string`
このクラスが扱うリソース名を表すフィールドです。
"user/${uid}/timetable/timetables" のような文字列が代入されます。

* `private dbUrl: string`
このクラスがアクセスするデータベースのURLです。
コンストラクターにより初期化され、 "https://myapp-rtdb.firebaseio.com/user/${uid}/timetable/timetables.json" のような文字列が代入されます。

#### Constructor
* `constructor(uid: string)`
ユーザーIDを表す `uid` パラメータを引数で受け取り、`dbUrl` フィールドを初期化するためのコンストラクタです。
`buildUrl()` メソッドを呼び出すことにより完全なURLを作成し、自身の `dbUrl` フィールドに代入することによって初期化します。
`buildUrl()` メソッドの引数には、`uid` にコンストラクターの引数である `uid` を、 `resource` に `resource` フィールドを渡します。

#### Methods
* `protected buildUrl(uid: string, resource: string, id?: string): string`
* `protected generateUniqueKey(): string`
親クラスのメソッドです。オーバーライドはありません。

* `public async createData(data: Timetable): Promise<void>`
データベースに時間割データを作成するパブリックメソッドです。
親クラスの`createData()`メソッドを呼び出すことによって操作を行います。
親クラスの`createData()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`data`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`createData()`に渡します。

* `public async readData(id?: string): Promise<Timetable[]>`
データベースから時間割データを読み出すパブリックメソッドです。
親クラスの`readData()`メソッドを呼び出すことによって操作を行います。
親クラスの`readData()`メソッドの引数である、`url`パラメータには`dbUrl`フィールドを渡します。
また、このメソッドの引数で`id`パラメータを受け取っている場合、親クラスの`readData()`メソッドの引数`id`には、このメソッドの引数で受け取った`id`パラメータをそのまま渡します。受け取っていない場合は渡しません。

* `public async readDataByTag(tag: string, value: string): Promise<Timetable[]>`
指定された一致条件で時間割データを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
親クラスの`readDataByTag()`メソッドを呼び出すことによって操作を行います。
親クラスの`readDataByTag()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`tag`,`value`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`readDataByTag()`に渡します。

* `public async readDataByRange(tag: string, startAt: string, endAt: string): Promise<Timetable[]>`
指定された範囲条件で時間割データを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
親クラスの`readDataByRange()`メソッドを呼び出すことによって操作を行います。
親クラスの`readDataByRange()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`tag`,`startAt`,`endAt`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`readDataByTag()`に渡します。

* `public async updateData(data: Timetable, id: string): Promise<void>`
データベースの時間割データを更新するパブリックメソッドです。
親クラスの`updateData()`メソッドを呼び出すことによって操作を行います。
親クラスの`updateData()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`data`,`id`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`updateData()`に渡します。

* `public async deleteData(id: string): Promise<void>`
データベースから時間割データを削除するパブリックメソッドです。
親クラスの`deleteData()`メソッドを呼び出すことによって操作を行います。
親クラスの`deleteData()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`id`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`deleteData()`に渡します。


### Class: TaskDbController
`TaskDbController` クラスは、Firebaseからの課題データを扱うためのクラスです。
`DbController` クラスを継承して作成されます。

#### Properties
* `protected readonly baseDbUrl: string`
親クラスのフィールドです。

* `private readonly resource: string`
このクラスが扱うリソース名を表すフィールドです。
"user/${uid}/task/task" のような文字列が代入されます。

* `private dbUrl: string`
このクラスがアクセスするデータベースのURLです。
コンストラクターにより初期化され、 "https://myapp-rtdb.firebaseio.com/user/${uid}/task/tasks.json" のような文字列が代入されます。

#### Constructor
* `constructor(uid: string)`
ユーザーIDを表す `uid` パラメータを引数で受け取り、`dbUrl` フィールドを初期化するためのコンストラクタです。
`buildUrl()` メソッドを呼び出すことにより完全なURLを作成し、自身の `dbUrl` フィールドに代入することによって初期化します。
`buildUrl()` メソッドの引数には、`uid` にコンストラクターの引数である `uid` を、 `resource` に `resource` フィールドを渡します。

#### Methods
* `protected buildUrl(uid: string, resource: string, id?: string): string`
* `protected generateUniqueKey(): string`
親クラスのメソッドです。オーバーライドはありません。

* `public async createData(data: Task): Promise<void>`
データベースに課題データを作成するパブリックメソッドです。
親クラスの`createData()`メソッドを呼び出すことによって操作を行います。
親クラスの`createData()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`data`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`createData()`に渡します。

* `public async readData(id?: string): Promise<Task[]>`
データベースから課題データを読み出すパブリックメソッドです。
親クラスの`readData()`メソッドを呼び出すことによって操作を行います。
親クラスの`readData()`メソッドの引数である、`url`パラメータには`dbUrl`フィールドを渡します。
また、このメソッドの引数で`id`パラメータを受け取っている場合、親クラスの`readData()`メソッドの引数`id`には、このメソッドの引数で受け取った`id`パラメータをそのまま渡します。受け取っていない場合は渡しません。

* `public async readDataByTag(tag: string, value: string): Promise<Task[]>`
指定された一致条件で課題データを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
親クラスの`readDataByTag()`メソッドを呼び出すことによって操作を行います。
親クラスの`readDataByTag()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`tag`,`value`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`readDataByTag()`に渡します。

* `public async readDataByRange(tag: string, startAt: string, endAt: string): Promise<Task[]>`
指定された範囲条件で課題データを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
親クラスの`readDataByRange()`メソッドを呼び出すことによって操作を行います。
親クラスの`readDataByRange()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`tag`,`startAt`,`endAt`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`readDataByTag()`に渡します。

* `public async updateData(data: Task, id: string): Promise<void>`
データベースの課題データを更新するパブリックメソッドです。
親クラスの`updateData()`メソッドを呼び出すことによって操作を行います。
親クラスの`updateData()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`data`,`id`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`updateData()`に渡します。

* `public async deleteData(id: string): Promise<void>`
データベースから課題データを削除するパブリックメソッドです。
親クラスの`deleteData()`メソッドを呼び出すことによって操作を行います。
親クラスの`deleteData()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`id`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`deleteData()`に渡します。



### Class: TaskSettingsDbController
`TaskSettingsDbController` クラスは、Firebaseからの課題の設定データを扱うためのクラスです。
`DbController` クラスを継承して作成されます。

#### Properties
* `protected readonly baseDbUrl: string`
親クラスのフィールドです。

* `private readonly resource: string`
このクラスが扱うリソース名を表すフィールドです。
"user/${uid}/task/taskSettings" のような文字列が代入されます。

* `private uid: string`
データベースのユーザーの一意キーを表す文字列型のプライベートフィールドです。
コンストラクターで初期化されます。

#### Constructor
* `constructor(uid: string)`
`uid` フィールドを初期化するためのコンストラクタです。
ユーザーIDを表す `uid` パラメータを引数で受け取り、`uid`

#### Methods
* `protected buildUrl(uid: string, resource: string, id?: string): string`
* `protected generateUniqueKey(): string`
* `public async createData(url: string, data: object): Promise<void>`
* `protected async readData(url: string, id?: string): Promise<object>`
* `protected async readDataByTag(url: string, tag: string, value: string): Promise<object>`
* `protected async readDataByRange(url: string, tag: string, startAt: string, endAt: string): Promise<object>`
* `protected async updateData(url: string, data: object, id: string): Promise<void>`
* `protected async deleteData(url: string, id: string): Promise<void>`
親クラスのメソッドです。オーバーライドはありません。

* `public async getEnabledAlert(): Promise<boolean>`
課題の期限が迫ったらメールで通知するかどうかを表すプロパティ`enabledAlert`の値を、データベースの`taskSettings`から取得するメソッドです。
まず、このクラスのプライベートフィールド`resource`に`"/enabledAlert"`という文字列を結合させた文字列を作成します。
そして、作成した文字列を`buildUrl()`メソッドの`resource`引数に渡し、`uid`フィールドを`uid`引数に渡すことで、
データベースの`enabledAlert`プロパティにアクセスするための完全なURLを文字列型で作成します。"https://myapp-rtdb.firebaseio.com/user/${uid}/task/taskSettings/enabledAlert.json"のような文字列が作成されます。
そして最後に、親クラスの`readData()`メソッドの`url`引数に作成したURLを渡し、`id`引数は無指定の状態で、
`readData()`メソッドを呼び出して取得した戻り値を、そのままこのメソッドの戻り値として返します。

* `public async setEnabledAlert(enabledAlert: boolean): Promise<boolean>`



//TODO途中
<!-- ### Class: ShiftDbController
`TimetableDbController` クラスは、Firebaseからの時間割データを扱うためのクラスです。
`DbController` クラスを継承して作成されます。

#### Properties
* `protected readonly baseDbUrl: string`
親クラスのフィールドです。
* `private readonly resource: string`
このクラスが扱うリソース名を表すフィールドです。
"user/timetable/timetables.json" のような文字列が代入されます。
* `private dbUrl: string`
このクラスがアクセスするデータベースのURLです。
コンストラクターにより初期化され、 "https://myapp-rtdb.firebaseio.com/user/${uid}/timetable/timetables.json" のような文字列が代入されます。

#### Constructor
* `constructor(uid: string)`
ユーザーIDを表す `uid` パラメータを引数で受け取り、`dbUrl` フィールドを初期化するためのコンストラクタです。
`buildUrl()` メソッドを呼び出すことにより完全なURLを作成し、自身の `dbUrl` フィールドに代入することによって初期化します。
`buildUrl()` メソッドの引数には、`uid` にコンストラクターの引数である `uid` を、 `resource` に `resource` フィールドを渡します。

#### Methods
* `protected buildUrl(uid: string, resource: string, id?: string): string`
* `protected generateUniqueKey(): string`
親クラスのメソッドです。オーバーライドはありません。

* `public async createData(data: Timetable): Promise<void>`
データベースに時間割データを作成するパブリックメソッドです。
親クラスの`createData()`メソッドを呼び出すことによって操作を行います。
親クラスの`createData()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`data`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`createData()`に渡します。

* `public async readData(id?: string): Promise<Timetable[]>`
データベースから時間割データを読み出すパブリックメソッドです。
親クラスの`readData()`メソッドを呼び出すことによって操作を行います。
親クラスの`readData()`メソッドの引数である、`url`パラメータには`dbUrl`フィールドを渡します。
また、このメソッドの引数で`id`パラメータを受け取っている場合、親クラスの`readData()`メソッドの引数`id`には、このメソッドの引数で受け取った`id`パラメータをそのまま渡します。受け取っていない場合は渡しません。

* `public async readDataByTag(tag: string, value: string): Promise<Timetable[]>`
指定された一致条件で時間割データを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
親クラスの`readDataByTag()`メソッドを呼び出すことによって操作を行います。
親クラスの`readDataByTag()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`tag`,`value`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`readDataByTag()`に渡します。

* `public async readDataByRange(tag: string, startAt: string, endAt: string): Promise<Timetable[]>`
指定された範囲条件で時間割データを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
親クラスの`readDataByRange()`メソッドを呼び出すことによって操作を行います。
親クラスの`readDataByRange()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`tag`,`startAt`,`endAt`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`readDataByTag()`に渡します。

* `public async updateData(data: Timetable, id: string): Promise<void>`
データベースの時間割データを更新するパブリックメソッドです。
親クラスの`updateData()`メソッドを呼び出すことによって操作を行います。
親クラスの`updateData()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`data`,`id`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`updateData()`に渡します。

* `public async deleteData(id: string): Promise<void>`
データベースから時間割データを削除するパブリックメソッドです。
親クラスの`deleteData()`メソッドを呼び出すことによって操作を行います。
親クラスの`deleteData()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`id`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`deleteData()`に渡します。


### Class: EventDbController
`TimetableDbController` クラスは、Firebaseからの時間割データを扱うためのクラスです。
`DbController` クラスを継承して作成されます。

#### Properties
* `protected readonly baseDbUrl: string`
親クラスのフィールドです。
* `private readonly resource: string`
このクラスが扱うリソース名を表すフィールドです。
"user/timetable/timetables.json" のような文字列が代入されます。
* `private dbUrl: string`
このクラスがアクセスするデータベースのURLです。
コンストラクターにより初期化され、 "https://myapp-rtdb.firebaseio.com/user/${uid}/timetable/timetables.json" のような文字列が代入されます。

#### Constructor
* `constructor(uid: string)`
ユーザーIDを表す `uid` パラメータを引数で受け取り、`dbUrl` フィールドを初期化するためのコンストラクタです。
`buildUrl()` メソッドを呼び出すことにより完全なURLを作成し、自身の `dbUrl` フィールドに代入することによって初期化します。
`buildUrl()` メソッドの引数には、`uid` にコンストラクターの引数である `uid` を、 `resource` に `resource` フィールドを渡します。

#### Methods
* `protected buildUrl(uid: string, resource: string, id?: string): string`
* `protected generateUniqueKey(): string`
親クラスのメソッドです。オーバーライドはありません。

* `public async createData(data: Timetable): Promise<void>`
データベースに時間割データを作成するパブリックメソッドです。
親クラスの`createData()`メソッドを呼び出すことによって操作を行います。
親クラスの`createData()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`data`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`createData()`に渡します。

* `public async readData(id?: string): Promise<Timetable[]>`
データベースから時間割データを読み出すパブリックメソッドです。
親クラスの`readData()`メソッドを呼び出すことによって操作を行います。
親クラスの`readData()`メソッドの引数である、`url`パラメータには`dbUrl`フィールドを渡します。
また、このメソッドの引数で`id`パラメータを受け取っている場合、親クラスの`readData()`メソッドの引数`id`には、このメソッドの引数で受け取った`id`パラメータをそのまま渡します。受け取っていない場合は渡しません。

* `public async readDataByTag(tag: string, value: string): Promise<Timetable[]>`
指定された一致条件で時間割データを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
親クラスの`readDataByTag()`メソッドを呼び出すことによって操作を行います。
親クラスの`readDataByTag()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`tag`,`value`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`readDataByTag()`に渡します。

* `public async readDataByRange(tag: string, startAt: string, endAt: string): Promise<Timetable[]>`
指定された範囲条件で時間割データを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
親クラスの`readDataByRange()`メソッドを呼び出すことによって操作を行います。
親クラスの`readDataByRange()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`tag`,`startAt`,`endAt`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`readDataByTag()`に渡します。

* `public async updateData(data: Timetable, id: string): Promise<void>`
データベースの時間割データを更新するパブリックメソッドです。
親クラスの`updateData()`メソッドを呼び出すことによって操作を行います。
親クラスの`updateData()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`data`,`id`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`updateData()`に渡します。

* `public async deleteData(id: string): Promise<void>`
データベースから時間割データを削除するパブリックメソッドです。
親クラスの`deleteData()`メソッドを呼び出すことによって操作を行います。
親クラスの`deleteData()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`id`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`deleteData()`に渡します。


### Class: EventSettingsDbController
`TimetableDbController` クラスは、Firebaseからの時間割データを扱うためのクラスです。
`DbController` クラスを継承して作成されます。

#### Properties
* `protected readonly baseDbUrl: string`
親クラスのフィールドです。
* `private readonly resource: string`
このクラスが扱うリソース名を表すフィールドです。
"user/timetable/timetables.json" のような文字列が代入されます。
* `private dbUrl: string`
このクラスがアクセスするデータベースのURLです。
コンストラクターにより初期化され、 "https://myapp-rtdb.firebaseio.com/user/${uid}/timetable/timetables.json" のような文字列が代入されます。

#### Constructor
* `constructor(uid: string)`
ユーザーIDを表す `uid` パラメータを引数で受け取り、`dbUrl` フィールドを初期化するためのコンストラクタです。
`buildUrl()` メソッドを呼び出すことにより完全なURLを作成し、自身の `dbUrl` フィールドに代入することによって初期化します。
`buildUrl()` メソッドの引数には、`uid` にコンストラクターの引数である `uid` を、 `resource` に `resource` フィールドを渡します。

#### Methods
* `protected buildUrl(uid: string, resource: string, id?: string): string`
* `protected generateUniqueKey(): string`
親クラスのメソッドです。オーバーライドはありません。

* `public async createData(data: Timetable): Promise<void>`
データベースに時間割データを作成するパブリックメソッドです。
親クラスの`createData()`メソッドを呼び出すことによって操作を行います。
親クラスの`createData()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`data`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`createData()`に渡します。

* `public async readData(id?: string): Promise<Timetable[]>`
データベースから時間割データを読み出すパブリックメソッドです。
親クラスの`readData()`メソッドを呼び出すことによって操作を行います。
親クラスの`readData()`メソッドの引数である、`url`パラメータには`dbUrl`フィールドを渡します。
また、このメソッドの引数で`id`パラメータを受け取っている場合、親クラスの`readData()`メソッドの引数`id`には、このメソッドの引数で受け取った`id`パラメータをそのまま渡します。受け取っていない場合は渡しません。

* `public async readDataByTag(tag: string, value: string): Promise<Timetable[]>`
指定された一致条件で時間割データを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
親クラスの`readDataByTag()`メソッドを呼び出すことによって操作を行います。
親クラスの`readDataByTag()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`tag`,`value`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`readDataByTag()`に渡します。

* `public async readDataByRange(tag: string, startAt: string, endAt: string): Promise<Timetable[]>`
指定された範囲条件で時間割データを絞り込んで、データベースからデータを読み出すパブリックメソッドです。
親クラスの`readDataByRange()`メソッドを呼び出すことによって操作を行います。
親クラスの`readDataByRange()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`tag`,`startAt`,`endAt`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`readDataByTag()`に渡します。

* `public async updateData(data: Timetable, id: string): Promise<void>`
データベースの時間割データを更新するパブリックメソッドです。
親クラスの`updateData()`メソッドを呼び出すことによって操作を行います。
親クラスの`updateData()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`data`,`id`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`updateData()`に渡します。

* `public async deleteData(id: string): Promise<void>`
データベースから時間割データを削除するパブリックメソッドです。
親クラスの`deleteData()`メソッドを呼び出すことによって操作を行います。
親クラスの`deleteData()`メソッドの引数には、`url`パラメータに`dbUrl`フィールドを渡します。
`id`パラメータなど、その他のパラメータについては、このメソッドで受け取った引数をそのまま親クラスの`deleteData()`に渡します。










 -->



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
`CalendarColumn` クラスには、プロパティは存在しません。

#### Constructor
* `CalendarContent` クラスは、コンストラクターで引数を受け取る必要はありません。

#### Methods
* `public render(): HTMLElement[]`
カレンダーページのメインコンテンツの要素群を作成するパブリックメソッドです。
メインコンテンツ部分となる、曜日欄とカレンダー欄の合計二つのHTML要素を作成し、それらをまとめて配列に格納し、戻り値として出力します。
曜日欄の要素は`renderWeekday()`メソッドを呼び出すことで作成します。
時間割欄の要素は`renderCalendar()`メソッドを呼び出すことで作成します。

* `private renderWeekday(): HTMLElement`
曜日欄のHTML要素を作成するプライベートメソッドです。
`WeekdayColumn` クラスの `render()` メソッドを呼び出すことで曜日欄のHTML要素を作成します。
インスタンス化する際、コンストラクターの引数には、 `sun` や `mon` などの全てのパラメータが `true` になった `WeekDay` 型のオブジェクトを渡します。

* `private renderCalendar(): HTMLElement`
時間割欄のHTML要素を作成するプライベートメソッドです。
`CalendarColumn` クラスをインスタンス化し、
インスタンスから `render()` メソッドを呼び出すことで作成します。
インスタンス化の際には、`CalendarColumn` クラスのコンストラクターの引数である `year` と `month` に、Dateオブジェクトを利用して取得した現在の年と月を渡します。

### Class: WeekdayColumn

#### Properties
* `private weekday: Weekday`

#### Constructor
* `constructor(weekday: Weekday)`

#### Methods
* `public render(): HTMLElement`

### Class: CalendarColumn
`CalendarColumn` クラスは、カレンダーやアルバイトシフトページのカレンダー欄を作成するためのクラスです。

#### Properties
* `private year: number`
どの年のカレンダー欄を作成するのかを指定するためのプライベートフィールドです。
`month` フィールドと合わせて、データベースからデータを取得する際の、データの範囲指定で使用します。

* `private month: number`
どの月のカレンダー欄を作成するのかを指定するためのプライベートフィールドです。
`year` フィールドと合わせて、データベースからデータを取得する際の、データの範囲指定で使用します。

* `private tasks: Task[] | undefined`
課題のデータを格納するためのプライベートフィールドです。
`getTasks()` メソッドによりデータベースから受け取った課題のデータが代入されます。

* `private shifts: Shift[] | undefined`
アルバイトシフトのデータを格納するためのプライベートフィールドです。
`getShifts()` メソッドによりデータベースから受け取ったアルバイトシフトのデータが代入されます。

* `private events: Event[] | undefined`
予定のデータを格納するためのプライベートフィールドです。
`getEvents()` メソッドによりデータベースから受け取った予定のデータが代入されます。

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
それらのフィールドにデータが格納されている場合は、それぞれ `CalendarTaskCard` クラス, `CalendarShiftCard` クラス, `CalendarEventCard` クラスを、データごとに(`events`に予定データが格納されているなら予定1つごとに)インスタンス化します。
そして、インスタンスから`render()`メソッドを呼び出して、データを表すカードの要素をそれぞれ作成します。

* `public hideCard(enableTask: boolean, enableShift: boolean, enableEvent: boolean): void`
カレンダー欄の中に入っているデータを非表示にするメソッドです。
カレンダー欄の中に入っているデータを表すカードの要素を取得し、
それらのカードにの要素にhtmlの属性を付与し、ユーザーが非表示にした種類のカードを非表示にします。
ただし、コンストラクターの引数で有効にされなかった種類のデータについては、表示されることはありません。これは、最初からデータベースから取得されていないためです。

* `private getTasks(): Task[]`
データベースから課題のデータを配列型で取得するプライベートメソッドです。
`TaskDbController` クラスの `readDataByRange()` メソッドを呼び出して得られた、一か月分に絞り込まれた `Task[]` 型のデータを返します。
`readDataByRange()` の引数には、 `tag` には "deadline" を、 `startAt` と `endAt` にはそれぞれ `year` フィールドと `month` フィールドから算出した適切なデータを渡します。

* `private getShifts(): Shift[]`
データベースからアルバイトシフトのデータを配列型で取得するプライベートメソッドです。
`ShiftDbController` クラスの `readData()` メソッドを呼び出して得られた、一か月分に絞り込まれた `Shift[]` 型のデータを返します。
`readDataByRange()` の引数には、 `tag` には "startTime" を、 `startAt` と `endAt` にはそれぞれ `year` フィールドと `month` フィールドから算出した適切なデータを渡します。

* `private getEvents(): Event[]`
データベースから予定のデータを配列型で取得するプライベートメソッドです。
`EventDbController` クラスの `readData()` メソッドを呼び出して得られた、一か月分に絞り込まれた `Event[]` 型のデータを返します。
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
* `private timetables: Timetable[]`
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

* `private getTimetables(): Timetable[]`
データベースから時間割のデータを配列型で取得するプライベートメソッドです。
`TimetableDbController` クラスの `readData()` メソッドを呼び出して得られた `Timetable[]` 型のデータを返します。

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
`TaskColumn` クラスをインスタンス化し、
インスタンスから `render()` メソッドを呼び出すことでHTML要素を作成します。

### Class: TaskColumn
`TaskColumn` クラスは、課題ページの課題欄を作成するためのクラスです。

#### Properties
* `private tasks: Task[]`
課題のデータを格納するためのプライベートフィールドです。
`getTasks()` メソッドによりデータベースから受け取った課題のデータが代入されます。

#### Constructor
* `TaskColumn` クラスは、コンストラクターで引数を受け取る必要はありません。
`getTasks()` メソッドを呼び出して得られた時間割のデータを `tasks` フィールドに代入し、初期化します。

#### Methods
* `public render(): HTMLElement`
課題欄のHTML要素を作成して戻り値として返すパブリックメソッドです。
課題欄の中に入るデータとして、自身のフィールドである`tasks` フィールドを使用します。
`TaskCard` クラスを、データごとに(`tasks`に格納されている課題の配列データの中身の値1つごとに)インスタンス化します。
コンストラクターには、`tasks`フィールドに格納されている課題割の配列データの中身の`Task`型オブジェクトを渡します。
そして、インスタンスから`render()`メソッドを呼び出して、課題データを表すカードの要素をそれぞれ作成します。
最後に、それぞれ作成したカードの要素を使用して、適切に要素を構成し、その一番上の親要素を戻り値として返します。

* `private getTasks(): Task[]`
データベースから課題割のデータを配列型で取得するプライベートメソッドです。
`TaskDbController` クラスの `readData()` メソッドを呼び出して得られた `Task[]` 型のデータを返します。