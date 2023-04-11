# TypeScriptによるアプリケーション作成
## Node.jsプロジェクトで開発する
環境作成の順番は以下のようになります。
- Node.jsプロジェクトで開発する
- npmの設定ファイルを作成する
- TypeScriptの設定を行う
- Webpackの設定ファイル作成
- アプリケーションをビルドする
- 開発サーバーで実行する
### プロジェクトを作成する
まず、Webアプリを作成するフォルダを用意します。
フォルダを作成してください。
作成したら、Visual Studio Codeを起動し、作成したフォルダを開いてください。
フォルダがVisual Studio Codeで開かれた状態となります。
### ターミナルを開く 
Visual Studio Codeでは、アプリ内からコマンドを実行できるようになっています。
「Ctrl」+「`」を押してください。
これでウインドウの下部にターミナルというビュー (画面を構成する小さなツールウインドウ)が現れます。
### npmの設定ファイルを作成する(package.json)
最初に行うのは「初期化」の作業です。
開いたターミナルより、以下のコマンドを実行してください。
```
npm init -y
```
これを実行すると、npmのパッケージ情報を記述する「package.json」というファイルが生成されます。
### TypeScriptの設定を行う(Typescript)
続いて、TypeScriptをプロジェクトに組み込みます。
ターミナルから以下のコマンドを実行してください。
```
npm install typescript @types/node --save-dev
```
これでTypeScriptと、Node.jsでTypeScriptを利用する際に必要となるパッケージ@types/nodeを追加しました。
### Webpackの設定ファイルを作成する(tsconfig.json)
インストールできたら、TypeScriptの設定ファイルを作成します。
これは以下のコマンドを実行します。
```
tsc --init
```
これで、フォルダ内に「tsconfig.json」というファイルが作成されます。
これが、TypeScriptに関する設定情報のファイルです。
#### VSCode使用時のエラー
このエラーが出た場合は、ターミナルの右上に見える「+」アイコンをクリックし、現れた メニューから「Command Prompt」を選んでください。
これでコマンドプロンプトが利用されるようになり、tscコマンドが使えるようになります。

現在のVisual Studio CodeはデフォルトでPower Shell がターミナルに設定されます。
このPower Shellは、現在、署名されていないスクリプトが実行できないようになっており、そのためエラーとなってしまうのです。
### Webpackの設定ファイル作成
パッケージングのためにWebpackというソフトウェアをインストールしておきましょう。
ではターミナルから以下のコマンドを実行してください。
```
npm install webpack ts-loader @webpack-cli/generators
```
これは、Webpack本体と、TS Loaderというパッケージをインストールするものです。
これでWebpackの機能が利用できるようになります。
### Webpack-CLIで初期化する
では、Webpackの初期化を行いましょう。ターミナルから以下のコマンドを実行してください。
```
npx webpack-cli init 
```
これを実行すると、次々に質問が表示されていきます。これらを順に入力していってください。
- **? Which of the following JS solutions do you want to use?**
JavaScript関連のソリューションに対応させるためのものです。「Typescript」を選択してEnter/Returnしてください。
- **? Do you want to use webpack-dev-server? (Y/n)**
Webpackの開発サーバーを追加するかです。
デフォルトでは追加します。そのままEnter/ Returnしてください。
- **? Do you want to simplify the creation of HTML files for your bundle? (Y/n)**
簡略化したHTMLファイルを生成するかどうかを示します。
デフォルトでは簡素化したものを生成します。これもそのままEnter/Returnしましょう。
- **? Do you want to add PWA support? (Y/n)**
PWA(Progressive web apps)をサポートするか尋ねてきます。
これもデフォルトのまま Enter/Returnしましょう。
- **? Which of the following CSS solutions do you want to use? (Use arrow keys)**
CSS関連ソリューションの対応を選択します。
今回は特に使わないので「none」を選んだままEnter/Returnしましょう。
- **? Do you like to install prettier to format generated configuration? (Y/n)**
設定ファイルを見やすくフォーマットするものです。
これもそのままEnter/Returnします。
- **? Overwrite package.json? (ynaxdH)**
package.jsonを上書きするか尋ねてきます。
「y」をタイプし、Overwrite(上書き)を選択してください。
- **? Overwrite tsconfig.json? (ynaxdH)**
tsconfig.jsonを上書きするか尋ねてきます。
「y」をタイプし、Overwrite(上書き)します。

後は、しばらく待っていれば作業完了し、プロジェクトが設定されます。
## アプリケーションをビルドする
ソースコードのファイルが用意できたら、ターミナルから以下のコマンドを実行してください。
```
npm run build
```
これを実行すると、プロジェクト内に「dist」というフォルダが作成され、そこにアプリケーションのファイル類が書き出されます。

用意するファイルの内容は、基本的にそのまま書き写せばいいのですが、一点だけ変更があります。
index.htmlの`<script src=" ">`という文を探し、このsrc属性が`"main.js"`に変更してあることを確認します。
Webpackでは、デフォルトでmain.jsという名前のfileにスクリプトがまとめられます。
## 開発サーバーで実行する
作成したWebアプリは、その場で動かして動作を確認できます。ターミナルから以下のコマンドを実行してください。
```
npm run serve
```
これで開発用のサーバーが起動し、Webブラウザでindex.htmlが開かれます。