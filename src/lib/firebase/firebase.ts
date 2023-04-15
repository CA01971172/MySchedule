// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBcbLVJT86gqqndMvS4rsm-Y4Mtd1waaYw",
  authDomain: "myschedule-c0a49.firebaseapp.com",
  databaseURL: "https://myschedule-c0a49-default-rtdb.firebaseio.com",
  projectId: "myschedule-c0a49",
  storageBucket: "myschedule-c0a49.appspot.com",
  messagingSenderId: "133869260530",
  appId: "1:133869260530:web:5df93f1bf99af2c5cf0a6b",
  measurementId: "G-KEHHLYCZT7"
};

// Initialize Firebase
/* const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); */

// firebaseのクラス(index.tsへの出力用)
export class FirebaseInitializer{//firebaseをinitializeするためのクラス
  private _firebaseConfig:object
  private _app:FirebaseApp
  private _analytics:Analytics
  
  constructor(config:object = firebaseConfig){
    this._firebaseConfig=config
  }

  public get firebaseConfig(): object {
    return this._firebaseConfig;
  }

  public set firebaseConfig(value: object) {
    this._firebaseConfig = value;
  }

  public get app(): FirebaseApp {
    return this._app;
  }

  public set app(value: FirebaseApp) {
    this._app = value;
  }

  public get analytics(): Analytics {
    return this._analytics;
  }

  public set analytics(value: Analytics) {
    this._analytics = value;
  }

  initialize():void{
    this.app = initializeApp(this.firebaseConfig);
    this.analytics = getAnalytics(this.app);
    console.log("firebase initialized")
    return
  }
}