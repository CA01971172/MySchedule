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
### SassをCSSにコンパイルするために必要なパッケージをインストール
```
npm install css-loader sass-loader sass mini-css-extract-plugin webpack-fix-style-only-entries --save-dev
```
- **css-loader**: CSSをCommonJSに変換する
- **sass-loader**: sassやscssファイルを読み込んで、CSSにコンパイルする
- **sass**: sass-loaderではDart SassかNode Sassをインストールする必要がある（Dart Sassが強く推奨されている）
- **mini-css-extract-plugin**: CSSを別ファイルに保存するためのもの
- **webpack-fix-style-only-entries**: 不要なファイルを（jsファイル）を削除するためのもの
### webpackでSCSSをCSSにコンパイルする
scssファイルをCSSにコンパイルしてみます。  
以下のコマンドを実行しましょう。
```
npx webpack
```
するとdistフォルダが作られ、そのなかにstyle.cssファイルが出力されます。
## Firebaseをインストールする
### Firebase SDK の追加
npm とモジュール バンドラ（webpack や Rollup など）をすでに使用している場合は、次のコマンドを実行して最新の SDK をインストールできます。[詳細](https://firebase.google.com/docs/web/learn-more?hl=ja&authuser=0#modular-version)
```
npm add firebase
```
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