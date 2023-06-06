import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";

export class FirebaseInitializer{//firebaseをinitializeするためのクラス
  private static readonly defaultConfig: object  = {
    apiKey: "AIzaSyBcbLVJT86gqqndMvS4rsm-Y4Mtd1waaYw",
    authDomain: "myschedule-c0a49.firebaseapp.com",
    databaseURL: "https://myschedule-c0a49-default-rtdb.firebaseio.com",
    projectId: "myschedule-c0a49",
    storageBucket: "myschedule-c0a49.appspot.com",
    messagingSenderId: "133869260530",
    appId: "1:133869260530:web:5df93f1bf99af2c5cf0a6b",
    measurementId: "G-KEHHLYCZT7"
  }
  private static firebaseConfig: object = FirebaseInitializer.defaultConfig
  private static app: FirebaseApp | null = null;
  private static analytics: Analytics | null = null;

  constructor(){};

  public static initialize():void{
    FirebaseInitializer.app = initializeApp(FirebaseInitializer.firebaseConfig);
    FirebaseInitializer.analytics = getAnalytics(FirebaseInitializer.app);
    console.log("firebase initialized")
    return
  }
}