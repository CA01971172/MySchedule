import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './scss/style.scss';
import { Application } from "./utils/application";
const app:Application = new Application();
app.run();

/* import {AppUser} from "./utils/AppUser"
const hogeUser:AppUser = new AppUser()
hogeUser.signOut() */