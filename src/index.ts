import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './scss/style.scss';
import { Application } from "./utils/application";
const app:Application = new Application();
app.run();

import { test } from './test/Murakami/test';
test()