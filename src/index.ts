import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './scss/style.scss';
import { Application } from "./utils/application";
const app:Application = new Application();
app.run();

import { test } from './test/Murakami/test';
import { Button } from './components/Ui/Button';
import { rootDiv } from './utils/constants';
const testButton:Button = new Button("テスト", test)
const testButtonElm = testButton.render()
rootDiv.appendChild(testButtonElm)