import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";

export class FirebaseInitializer{//firebaseをinitializeするためのクラス
  private readonly defaultConfig: object  = {
    apiKey: "AIzaSyBcbLVJT86gqqndMvS4rsm-Y4Mtd1waaYw",
    authDomain: "myschedule-c0a49.firebaseapp.com",
    databaseURL: "https://myschedule-c0a49-default-rtdb.firebaseio.com",
    projectId: "myschedule-c0a49",
    storageBucket: "myschedule-c0a49.appspot.com",
    messagingSenderId: "133869260530",
    appId: "1:133869260530:web:5df93f1bf99af2c5cf0a6b",
    measurementId: "G-KEHHLYCZT7"
  }
  private _firebaseConfig: object
  private _app:FirebaseApp
  private _analytics:Analytics
  
  constructor(config?: object){
    if(!config){
      config = this.defaultConfig // デフォルト値
    }
    this._firebaseConfig = config
  }

  private get firebaseConfig(): object {
    return this._firebaseConfig;
  }

  private set firebaseConfig(value: object) {
    this._firebaseConfig = value;
  }

  private get app(): FirebaseApp {
    return this._app;
  }

  private set app(value: FirebaseApp) {
    this._app = value;
  }

  private get analytics(): Analytics {
    return this._analytics;
  }

  private set analytics(value: Analytics) {
    this._analytics = value;
  }

  public initialize():void{
    this.app = initializeApp(this.firebaseConfig);
    this.analytics = getAnalytics(this.app);
    console.log("firebase initialized")
    return
  }
}